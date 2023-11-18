import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

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
    const course = await db.course.delete({
      where: {
        id: courseId,
        userId,
      },
    });

    return NextResponse.json(course);

    // Error handling
  } catch (error) {
    console.log("[COURSE_ID: DELETE]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
