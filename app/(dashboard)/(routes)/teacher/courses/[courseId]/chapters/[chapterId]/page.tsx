import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaCircleCheck,
  FaCircleHalfStroke,
  FaGears,
  FaPhotoFilm,
} from "react-icons/fa6";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterDeleteButton from "./_components/ChapterDeleteButton";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // Protecting page with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Extracting values
  const { chapterId, courseId } = params;

  // Finding chapter in database
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  // Redirect if chapter is not found
  if (!chapter) {
    return redirect(`/teacher/courses/${courseId}`);
  }

  // Calculating completion text and canPublish variables
  const requiredFields = [chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const canPublish = completedFields === totalFields;

  // On delete

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <Link href={`/teacher/courses/${courseId}`}>
              <ArrowLeft className="-ml-1 mr-[12px] mt-2" />
            </Link>
            <ChapterTitleForm
              chapterId={chapterId}
              initialData={chapter}
              courseId={courseId}
            />
          </div>

          {/* Group completion text and post badge together */}
          <div className="flex items-center ml-8 mt-2 gap-x-3">
            {/* Completion Text */}
            <div>
              {completedFields === totalFields ? (
                <div className="font-medium text-base text-primary flex items-center gap-x-2">
                  <FaCircleCheck />
                  <p className="text-muted-foreground">
                    Completed all fields {completionText}
                  </p>
                </div>
              ) : (
                <div className="font-medium text-base text-primary flex items-center gap-x-2">
                  <FaCircleHalfStroke />
                  <p className="text-muted-foreground">
                    Complete required fields {completionText}
                  </p>
                </div>
              )}
            </div>

            <Separator orientation="vertical" />

            {/* Post badge */}
            {chapter.isPublished ? (
              <Badge>Posted</Badge>
            ) : (
              <Badge variant="secondary">Drafted</Badge>
            )}
          </div>
        </div>
        <ChapterDeleteButton chapterId={chapterId} courseId={courseId} />
      </div>

      {/* First Column */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-10">
        <div>
          <div className="flex items-center gap-x-2">
            <LayoutDashboard />
            <h2 className="text-xl font-black">Customize Chapter</h2>
          </div>
          <ChapterDescriptionForm
            initialData={chapter}
            chapterId={chapterId}
            courseId={courseId}
          />
          <div className="flex items-center gap-x-2 mt-6">
            <div className="-mr-[2px]">
              <FaPhotoFilm size="22" />
            </div>
            <h2 className="text-xl font-black">Chapter Content</h2>
          </div>
          <ChapterVideoForm
            initialData={chapter}
            chapterId={chapterId}
            courseId={courseId}
          />
        </div>

        {/* Second Column */}
        <div>
          <div className="flex items-center gap-x-2">
            <div className="-mr-[2px]">
              <FaGears size="24" />
            </div>
            <h2 className="text-xl font-black">Chapter Settings</h2>
          </div>
          <ChapterAccessForm
            initialData={chapter}
            chapterId={chapterId}
            courseId={courseId}
            canPublish={!canPublish}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
