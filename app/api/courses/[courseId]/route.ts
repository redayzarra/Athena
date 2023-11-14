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
