import { getChapter } from "@/actions/getChapter";
import CourseAlert from "@/components/CourseAlert";
import Preview from "@/components/Preview";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { File } from "lucide-react";
import { redirect } from "next/navigation";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import VideoPlayer from "./_components/VideoPlayer";
import CourseProgressButton from "./_components/CourseProgressButton";
import { Metadata } from "next";

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

  // Extracting values from params
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
    console.log("Wasn't able to get course or chapter from CourseIdPage");
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
            <div className="">
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
          ) : (
            <CourseEnrollButton courseId={courseId} price={course.price!} />
          )}
        </div>
        {!!attachments.length && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center text-sm p-3 space-x-2 w-full border rounded-md hover:underline"
                >
                  <File />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
        <div>
          <Separator />
          <Preview value={chapter.description!} />
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

export const metadata: Metadata = {
  title: "Chapter Details",
  description:
    "Dive into detailed chapter content on Athena. Access video lessons, downloadable resources, and chapter summaries. Track your progress and move seamlessly to the next chapter for a continuous learning experience.",
};
