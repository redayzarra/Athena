import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Protecting api route with user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    // Extracting values
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await request.json();

    // Find the owner of the course
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    // Redirect if the course owner is not found
    if (!courseOwner) {
      return NextResponse.json({}, { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(chapter);

    // Error handling
  } catch (error) {
    console.log("[CHAPTER_ID]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
