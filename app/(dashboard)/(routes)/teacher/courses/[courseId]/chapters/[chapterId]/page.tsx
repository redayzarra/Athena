import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AiOutlineDollar } from "react-icons/ai";
import {
  FaCircleCheck,
  FaCircleHalfStroke,
  FaGears,
  FaPhotoFilm,
  FaRegFileImage,
} from "react-icons/fa6";
import AttachmentForm from "../../_components/AttachmentForm";
import PriceForm from "../../_components/PriceForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";

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

  // Fetch the course - GET RID OF THIS ==========================
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  if (!course) {
    return redirect("/");
  }
  // Don't need any of this =====================================

  const requiredFields = [chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const canPublish = completedFields === totalFields;

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

          <div className="ml-8 mt-2">
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
        </div>
        {completedFields === totalFields && (
          <Link href={`/teacher/courses/${courseId}`}>
            <Button size="sm" className="ml-2 font-bold">
              Save
            </Button>
          </Link>
        )}
      </div>

      {/* First Column */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 mt-10">
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
            <h2 className="text-xl font-black">Video</h2>
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
          <div className="flex items-center gap-x-2 mt-6">
            <div className="-ml-[2px] -mr-[3px]">
              <AiOutlineDollar size="28" />
            </div>
            <h2 className="text-xl font-black">Course Pricing</h2>
          </div>
          <PriceForm initialData={course} courseId={courseId} />
          <div className="">
            <div className="flex items-center gap-x-2 mt-6">
              <FaRegFileImage size="24" />
              <h2 className="text-xl font-black">Resources</h2>
            </div>
            <AttachmentForm initialData={course} courseId={courseId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
