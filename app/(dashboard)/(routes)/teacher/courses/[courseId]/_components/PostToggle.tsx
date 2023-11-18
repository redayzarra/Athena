"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  initialData: Course;
  courseId: string;
  canPublish: boolean;
}

const PostToggle = ({ initialData, courseId, canPublish }: Props) => {
  const [isPublished, setIsPublished] = useState(initialData.isPublished);
  const { toast } = useToast();
  const router = useRouter();

  const handleToggle = async () => {
    try {
      // Toggle state and submit API request
      const newPublishedState = !isPublished;
      setIsPublished(newPublishedState);
      await axios.patch(`/api/courses/${courseId}`, {
        isPublished: newPublishedState,
      });

      toast({
        title: `Course ${newPublishedState ? "published" : "unpublished"}!`,
        description: `Your course has been successfully ${
          newPublishedState ? "published" : "unpublished"
        }.`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Unable to update the course. Please try again.",
        variant: "destructive",
      });
      setIsPublished(isPublished); // Reset to original state in case of error
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Switch
        id="publish-toggle"
        checked={isPublished}
        disabled={canPublish}
        onCheckedChange={handleToggle}
      />
      {isPublished ? (
        <Badge className="cursor-pointer">Published</Badge>
      ) : (
        <Badge className="cursor-pointer" variant="secondary">
          Unpublished
        </Badge>
      )}
    </div>
  );
};

export default PostToggle;
