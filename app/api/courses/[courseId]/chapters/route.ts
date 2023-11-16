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
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
