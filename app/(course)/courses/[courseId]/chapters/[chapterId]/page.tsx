import { getChapter } from "@/actions/getChapter";
import CourseAlert from "@/components/CourseAlert";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseEnrollButton from "./_components/CourseEnrollButton";
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
      <div className="flex flex-col mx-auto space-y-4">
        <VideoPlayer
          chapterId={chapterId}
          title={chapter.title}
          courseId={courseId}
          nextChapterId={nextChapter?.id}
          playbackId={muxData?.playbackId!}
          isLocked={isLocked}
          completeOnEnd={completeOnEnd}
        />
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold line-clamp-1">
            {chapter.title}
          </h2>
          {purchase ? (
            <div className=""></div>
          ) : (
            <CourseEnrollButton price={course.price!} />
          )}
        </div>
      </div>
      <div className="mt-4">
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
