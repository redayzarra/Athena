import getProgress from "@/actions/getProgress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import CourseSideBar from "./_components/CourseSideBar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  // Protecting with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const courseId = params.courseId;

  const course = await db.course.findUnique({
    where: {
      userId,
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress({
    userId,
    courseId,
  });

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-60">
        <CourseSideBar course={course} progressCount={progressCount} />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CourseLayout;
