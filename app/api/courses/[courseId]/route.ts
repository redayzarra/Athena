import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Protecting route through user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    const values = await request.json();

    // Parse the price string to a float
    let { price } = values;
    price = parseFloat(price);

    // Set price as null if it is not a number
    if (isNaN(price)) {
      price = null;
    } else {
      // Round the price to two decimal places if it is a number
      price = Math.round((price + Number.EPSILON) * 100) / 100;
    }

    const { courseId } = params;
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
        price, // Use the rounded price
      },
    });

    return NextResponse.json(course);

    // Error handling
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Protecting api route with user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    // Extracting for easier variable calling
    const { courseId } = params;

    // Find the owner of the course
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    // Send error if the course owner does not exist
    if (!courseOwner) {
      return NextResponse.json({}, { status: 401 });
    }

    // Find course
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    // Redirect if no course
    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Delete all the Mux data for every chapter
    for (const chapter of course.chapters) {
      if (chapter?.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);

    // Error handling
  } catch (error) {
    console.log("[COURSE_ID: DELETE]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
