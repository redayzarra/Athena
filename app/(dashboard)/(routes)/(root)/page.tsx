import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import getDashboard from "@/actions/getDashboard";
import { InfoCard } from "./_components/InfoCard";
import CoursesList from "@/components/CoursesList";
import { Metadata } from "next";

export default async function Dashboard() {
  // Protecting with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, inProgressCourses } = await getDashboard(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={inProgressCourses.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...inProgressCourses, ...completedCourses]} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Brainery - Portfolio Project",
  description: "Brainery, a portfolio project, showcases an online learning platform concept where users can explore and share educational courses. Designed to demonstrate web development skills, it features a range of subjects for both professional and personal learning interests.",
};