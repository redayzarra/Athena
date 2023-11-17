import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCircleCheck, FaCircleHalfStroke } from "react-icons/fa6";
import ChapterTitleForm from "./_components/ChapterTitleForm";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // Extracting values
  const { courseId, chapterId } = params;

  // Protecting the page
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Find the chapter data
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  // Redirect back to parent course if chapter is not found
  if (!chapter) {
    return redirect(`/teacher/courses/${courseId}`);
  }

  // Creating completion text
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div>
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex">
            <Link href={`/teacher/courses/${courseId}`}>
              <ArrowLeft className="-ml-1 mr-[12px] mt-2" />
            </Link>
            {/* <h1 className="text-4xl font-black">{course.title}</h1> */}
            <ChapterTitleForm initialData={chapter} chapterId={chapter.id} />
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
      </div>
    </div>
  );
};

export default ChapterIdPage;
