"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/hooks/useConfettiStore";
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
  const confetti = useConfettiStore();

  const handleToggle = async (newPublishedState?: boolean) => {
    const publishState =
      newPublishedState !== undefined ? newPublishedState : !isPublished;
    try {
      setIsPublished(publishState);
      await axios.patch(`/api/courses/${courseId}`, {
        isPublished: publishState,
      });

      router.refresh();
      
      // Trigger confetti only when publishing the course
      if (publishState) {
        confetti.onOpen();
      }

      // Success toast
      toast({
        title: `Course ${publishState ? "published" : "unpublished"}!`,
        description: `Your course has been successfully ${
          publishState ? "published" : "unpublished"
        }.`,
      });

      // Error handling
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
        disabled={!canPublish}
        onCheckedChange={handleToggle}
      />
      {isPublished ? (
        <Badge>Posted</Badge>
      ) : (
        <Badge variant="secondary">Drafted</Badge>
      )}
    </div>
  );
};

export default PostToggle;
