"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, PencilIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl ?? "",
    },
  });

  // Initialize the useToast hook
  const { toast } = useToast();

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: "Course image updated!",
        description: "The course image has been successfully saved.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      // toast({
      //   title: "Something went wrong.",
      //   description:
      //     "There was a problem uploading your image. Make sure your image is less than 4MB.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-bold flex items-center mb-2 justify-between">
        Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
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
        <div className="bg-background rounded-md">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
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
