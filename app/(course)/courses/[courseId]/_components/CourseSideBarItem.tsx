import React from "react";

interface Props {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSideBarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: Props) => {
  return <div>CourseSideBarItem</div>;
};

export default CourseSideBarItem;
