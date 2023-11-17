import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Protecting the route through user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    // Extracting values
    const { title } = await request.json();
    const { courseId } = params;

    // Find the owner of the course
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    // Thow error if you can't find the course owner
    if (!courseOwner) {
      return NextResponse.json({}, { status: 401 });
    }

    // Find the last chapter
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    // Calculate the new position for the new chapter
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    // Add the new chapter at that position
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(chapter);

    // Error handling
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
