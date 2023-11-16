import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { AiOutlineDollar } from "react-icons/ai";
import {
  FaCircleCheck,
  FaCircleHalfStroke,
  FaListCheck,
  FaRegFileImage,
} from "react-icons/fa6";
import AttachmentForm from "./_components/AttachmentForm";
import CategoryForm from "./_components/CategoryForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import PriceForm from "./_components/PriceForm";
import TitleForm from "./_components/TitleForm";
import ChapterForm from "./_components/ChapterForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;

  // Checking user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/courses");
  }

  // Checking course validation
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/courses");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Calculating the progress of form completion
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-black">Course Setup</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 mt-12">
        <div>
          <div className="flex items-center gap-x-2">
            <LayoutDashboard />
            <h2 className="text-xl font-black">Customize Course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <FaListCheck size="22" />
            <h2 className="text-xl font-black">Course Chapters</h2>
          </div>
          <div>
            <ChapterForm initialData={course} courseId={course.id} />
          </div>
          <div className="flex items-center gap-x-2">
            <div className="-ml-[2px] -mr-[3px]">
              <AiOutlineDollar size="28" />
            </div>
            <h2 className="text-xl font-black">Course Pricing</h2>
          </div>
          <PriceForm initialData={course} courseId={course.id} />
          <div className="">
            <div className="flex items-center gap-x-2">
              <FaRegFileImage size="24" />
              <h2 className="text-xl font-black">Resources</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
