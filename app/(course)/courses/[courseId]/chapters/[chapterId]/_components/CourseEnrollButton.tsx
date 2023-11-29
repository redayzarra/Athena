"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import React from "react";

interface Props {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: Props) => {
  return <Button className="">Enroll for {formatPrice(price)}</Button>;
};

export default CourseEnrollButton;
