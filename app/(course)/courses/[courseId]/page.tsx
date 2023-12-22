import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    console.log("Can't get course from CourseIdPage");
    return redirect("/");
  }

  return redirect(`/courses/${courseId}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
