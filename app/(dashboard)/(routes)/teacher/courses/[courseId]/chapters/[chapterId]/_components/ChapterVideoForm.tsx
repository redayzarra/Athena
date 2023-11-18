"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { ImageIcon, PencilIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleCheck, FaCircleHalfStroke } from "react-icons/fa6";
import * as z from "zod";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, { message: "Image is required." }),
});

const ChapterVideoForm = ({ initialData, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Initialize the useToast hook
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/`, values);
      toast({
        title: "Video Updated!",
        description:
          "Your course has been successfully updated with the new video.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {}
  };

  return (
    <div className="mt-3 border bg-card rounded-md p-4 drop-shadow-md">
      <div className="font-bold flex items-center mb-2 justify-between">
        <span className="text-base font-medium text-primary flex items-center gap-x-2">
          {!initialData.videoUrl || isEditing ? (
            <FaCircleHalfStroke />
          ) : (
            <FaCircleCheck />
          )}
          <p className="text-muted-foreground">Content</p>
        </span>
        <Button
          onClick={toggleEdit}
          size="sm"
          variant="ghost"
          className="text-muted-foreground"
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              {initialData.videoUrl ? (
                <>
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <div className="rounded-md flex flex-col items-center justify-center">
          <div className="dark:bg-background dark:border dark:border-dashed rounded-md">
            <FileUpload
              endpoint="courseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
          </div>
          <p className="text-xs mt-2 text-muted-foreground font-bold">
            16:9 aspect ratio recommended
          </p>
        </div>
      ) : !initialData.videoUrl ? (
        <div className="flex items-center justify-center h-[190px] rounded-md bg-background">
          <ImageIcon className="h-10 w-10 text-foreground" />
        </div>
      ) : (
        <div className="relative aspect-video mt-2">
          <Image
            alt="Course Image"
            fill
            className="object-cover rounded-md"
            src={initialData.videoUrl}
          />
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
