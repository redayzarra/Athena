"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/formatPrice";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // Setup Toaster
  const { toast } = useToast();
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);

      // Error handling
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to enroll in the course. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <Button size="sm" onClick={onClick} disabled={isLoading} className="ml-4">
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
