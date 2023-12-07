import { Category, Chapter, Course } from "@prisma/client";

import getProgress from "./getProgress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  inProgressCourses: CourseWithProgressWithCategory[];
};

export const getDashboard = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
        course: {
          is: {
            id: {
              not: undefined,
            },
          },
        },
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourses
      .map((purchase) => purchase.course)
      .filter((course) => course !== null) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress({ userId, courseId: course.id });
      course.progress = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const inProgressCourses = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      inProgressCourses,
    };

    // Error handling
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      inProgressCourses: [],
    };
  }
};

export default getDashboard;
