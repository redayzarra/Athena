"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const ChapterDeleteButton = ({ initialData, courseId, chapterId }: Props) => {
  // Initialize the useToast hook and router
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      router.refresh();
    } catch (error) {}
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            chapter and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChapterDeleteButton;
