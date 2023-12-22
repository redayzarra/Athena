import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import getProgress from "./getProgress";

export type CourseWithCatPro = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId?: string;
  title?: string;
  categoryId?: string;
};

const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithCatPro[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        ...(userId && { userId }),
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithPro: CourseWithCatPro[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPercentage = userId
          ? await getProgress({
              userId,
              courseId: course.id,
            })
          : null;

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    return courseWithPro;

    // Error handling
  } catch (error) {
    console.log("GET_COURSES", error);
    return [];
  }
};

export default getCourses;
