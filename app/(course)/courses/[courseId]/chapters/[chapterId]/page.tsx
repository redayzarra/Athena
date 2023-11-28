import getChapter from "@/actions/getChapter";
import CourseAlert from "@/components/CourseAlert";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_components/VideoPlayer";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // Protecting with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Extracting values
  const { courseId, chapterId } = params;

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId,
    courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      <div className="flex flex-col mx-auto mb-4">
        <div className="">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
      <div className="mb-10">
        {userProgress?.isCompleted && (
          <CourseAlert
            title="Heads up!"
            description="You have already completed this chapter."
          />
        )}
        {isLocked && (
          <CourseAlert
            variant="destructive"
            title="Purchase required"
            description="You need to purchase this course to watch this chapter."
          />
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
