import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Protect this route with user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    // Extract values
    const { list } = await request.json();
    const { courseId } = params;

    // Find the owner of the course
    const courseOwner = db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    // Throw error if you can't find course
    if (!courseOwner) {
      return NextResponse.json({}, { status: 401 });
    }

    for (let { id, position } of list) {
      await db.chapter.update({
        where: { id },
        data: { position },
      });
    }

    return NextResponse.json("Success", { status: 200 });

    // Error handling
  } catch (error) {
    console.log("REORDER", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
