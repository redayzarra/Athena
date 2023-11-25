import React from "react";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number | null;
  progress: number | null;
  category: string;
  description: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  description,
}: Props) => {
  return <div>CourseCard</div>;
};

export default CourseCard;
