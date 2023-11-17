"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, PencilIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleCheck, FaCircleHalfStroke } from "react-icons/fa6";
import * as z from "zod";

interface Props {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required." }),
});

const ImageForm = ({ initialData, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Initialize the useToast hook
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: "Image Updated!",
        description:
          "Your course has been successfully updated with the new image.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {}
  };

  return (
    <div className="mt-3 border bg-card rounded-md p-4 drop-shadow-md">
      <div className="font-bold flex items-center mb-2 justify-between">
        <span className="text-base font-medium text-primary flex items-center gap-x-2">
          {!initialData.imageUrl || isEditing ? (
            <FaCircleHalfStroke />
          ) : (
            <FaCircleCheck />
          )}
          <p className="text-muted-foreground">Cover Image</p>
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
              {initialData.imageUrl ? (
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
        <div className="bg-background rounded-md flex flex-col items-center justify-center">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <p className="text-xs text-muted-foreground font-bold">
            16:9 aspect ratio recommended
          </p>
        </div>
      ) : !initialData.imageUrl ? (
        <div className="flex items-center justify-center h-[190px] rounded-md bg-background">
          <ImageIcon className="h-10 w-10 text-foreground" />
        </div>
      ) : (
        <div className="relative aspect-video mt-2">
          <Image
            alt="Course Image"
            fill
            className="object-cover rounded-md"
            src={initialData.imageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default ImageForm;
