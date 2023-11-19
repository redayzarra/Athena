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

    // Find the chapter from the database
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Check for required fields
    const shouldUnpublish =
      !chapter.title || !chapter.description || !chapter.videoUrl;

    // Update the chapter in the database
    const updatedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...values,
        isPublished: shouldUnpublish ? false : values.isPublished,
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

    // After updating the chapter, check if any chapters are still published
    const publishedChapters = await db.chapter.count({
      where: {
        courseId,
        isPublished: true,
      },
    });

    // If no chapters are published, set the course's isPublished to false
    if (publishedChapters === 0) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(updatedChapter);

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
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    // Redirect if chapter doesn't exist
    if (!chapter) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // If the chapter had a video, delete that too.
    if (chapter.videoUrl) {
      const exisitingMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      // Delete all Mux data and assets
      if (exisitingMuxData) {
        await Video.Assets.del(exisitingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: exisitingMuxData.id,
          },
        });
      }
    }

    // Delete the target chapter
    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    // Find how the number of published chapters
    const validChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    // If there are no published chapters, unpublish the course.
    if (!validChapters.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);

    // Error handling
  } catch (error) {
    console.log("[CHAPTER_ID: DELETE]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
