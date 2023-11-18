import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

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
    const { ...values } = await request.json();

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

    // Find the chapter from the database and update it
    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      // Clean up function if video is changed.
      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);

    // Error handling
  } catch (error) {
    console.log("[CHAPTER_ID]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Protecting api route with user authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({}, { status: 401 });
    }

    // Extracting for easier variable calling
    const { courseId, chapterId } = params;

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

    // Find chapter
    const chapter = await db.chapter.delete({
      where: {
        id: chapterId,
        courseId,
      },
    });

    return NextResponse.json(chapter);

    // Error handling
  } catch (error) {
    console.log("[CHAPTER_ID: DELETE]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
