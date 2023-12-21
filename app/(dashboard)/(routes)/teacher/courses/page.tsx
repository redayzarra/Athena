import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { Metadata } from "next";
import { DataTableLoading } from "./_components/DataTableLoading";

const CoursesPage = async () => {
  // Protecting the page with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // Find courses
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto space-y-4">
      <h1 className="text-5xl font-black">Your Courses</h1>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;

export const metadata: Metadata = {
  title: "My Courses",
  description: "Manage and view your courses on Athena. The dashboard provides a comprehensive view of your courses, organized in a user-friendly format for easy access and management.",
};