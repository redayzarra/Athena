import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Protecting route through authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    const values = await request.json();
    const { title, description } = values;
    const { courseId } = params;

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
