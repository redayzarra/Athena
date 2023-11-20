import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";

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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
