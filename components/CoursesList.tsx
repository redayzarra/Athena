import { CourseWithCatPro } from "@/actions/getCourses";
import { Course } from "@prisma/client";
import React from "react";

interface Props {
  items: CourseWithCatPro[];
}

const CoursesList = ({ items }: Props) => {
  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found.
        </div>
      )}
    </div>
  );
};

export default CoursesList;
