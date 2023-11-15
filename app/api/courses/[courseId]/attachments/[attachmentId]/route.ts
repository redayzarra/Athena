import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    // Protecting route through user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    // Extracting for easier variable calling
    const { courseId, attachmentId } = params;

    // Check correct course owner
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return NextResponse.json({}, { status: 401 });
    }

    // Find attachment
    const attachment = await db.attachment.delete({
      where: {
        courseId,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
