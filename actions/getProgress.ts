import { db } from "@/lib/db";

interface Props {
  userId: string;
  courseId: string;
}

const getProgress = async ({ userId, courseId }: Props): Promise<number> => {
  try {
    // Get the count of published chapters and completed chapters in one query
    const [totalChapters, completedChapters] = await Promise.all([
      db.chapter.count({
        where: { courseId, isPublished: true },
      }),
      db.userProgress.count({
        where: {
          userId,
          chapter: {
            is: {
              courseId,
              isPublished: true,
            },
          },
          isCompleted: true,
        },
      }),
    ]);

    // Guard against division by zero
    if (totalChapters === 0) return 0;

    const progressPercentage = (completedChapters / totalChapters) * 100;

    return progressPercentage;
  } catch (error) {
    console.error("Error in getProgress:", error);
    throw error; // or handle it as per your application's error handling strategy
  }
};

export default getProgress;
