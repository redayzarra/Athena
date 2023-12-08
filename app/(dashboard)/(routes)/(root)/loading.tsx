import CourseListLoading from "@/components/loading/CoursesListLoading";
import React from "react";
import { InfoCardLoading } from "./_components/InfoCardLoading";
import { CheckCircle, Clock } from "lucide-react";

const LoadingDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCardLoading icon={Clock} label="In Progress" />
        <InfoCardLoading icon={CheckCircle} label="Completed" />
      </div>
      <CourseListLoading />
    </div>
  );
};

export default LoadingDashboard;
