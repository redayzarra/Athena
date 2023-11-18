import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AiOutlineDollar } from "react-icons/ai";
import {
  FaCircleCheck,
  FaCircleHalfStroke,
  FaRegFileImage,
} from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import AttachmentForm from "./_components/AttachmentForm";
import CategoryForm from "./_components/CategoryForm";
import ChapterForm from "./_components/ChapterForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import PostToggle from "./_components/PostToggle";
import PriceForm from "./_components/PriceForm";
import TitleForm from "./_components/TitleForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;

  // Checking user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Fetch the course
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

  // Redirect if course is not valid
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
    // course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const canPublish = completedFields === totalFields;

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <Link href={`/teacher/courses`}>
              <ArrowLeft className="-ml-1 mr-[12px] mt-2" />
            </Link>
            <TitleForm initialData={course} courseId={course.id} />
          </div>

          {/* Group completion text and PostToggle together */}
          <div className="flex items-center ml-8 mt-2 gap-x-2">
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

            {/* PostToggle component */}
            <PostToggle
              initialData={course}
              courseId={courseId}
              canPublish={canPublish}
            />
          </div>
        </div>
      </div>

      {/* First Column */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 mt-10">
        <div>
          <div className="flex items-center gap-x-2">
            <LayoutDashboard />
            <h2 className="text-xl font-black">Customize Course</h2>
          </div>
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <ChapterForm initialData={course} courseId={course.id} />
        </div>

        {/* Second Column */}
        <div>
          <div className="flex items-center gap-x-2">
            <div className="-mr-[2px]">
              <MdOutlineCategory size="26" />
            </div>
            <h2 className="text-xl font-black">Course Category</h2>
          </div>
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <div className="flex items-center gap-x-2 mt-6">
            <div className="-ml-[2px] -mr-[3px]">
              <AiOutlineDollar size="28" />
            </div>
            <h2 className="text-xl font-black">Course Pricing</h2>
          </div>
          <PriceForm initialData={course} courseId={course.id} />
          <div className="">
            <div className="flex items-center gap-x-2 mt-6">
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
