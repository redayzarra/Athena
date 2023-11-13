import React from "react";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  return <div>CourseIdPage: {params.courseId}</div>;
};

export default CourseIdPage;
