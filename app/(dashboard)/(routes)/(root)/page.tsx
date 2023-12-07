import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import getDashboard from "@/actions/getDashboard";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, inProgressCourses } = await getDashboard(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>Info Card</div>
        <div>Info Card</div>
      </div>
      {/* <CoursesList items={[...inProgressCourses, ...completedCourses]} /> */}
    </div>
  );
}
