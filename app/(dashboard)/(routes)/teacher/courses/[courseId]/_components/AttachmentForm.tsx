"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

interface Props {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Initialize the useToast hook
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast({
        title: "Attachment Added!",
        description:
          "The new attachment has been successfully added to your course materials.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "There was an issue adding the attachment. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-bold flex items-center mb-2 justify-between">
        <span className="text-base font-medium text-primary flex items-center gap-x-2">
          <p className="text-muted-foreground">Attachments</p>
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
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <div className="bg-background rounded-md flex flex-col items-center justify-center">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <p className="text-xs text-muted-foreground font-bold">
            Add attachments for your course
          </p>
        </div>
      ) : (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-md mt-2 italic">No attachments</p>
          )}
        </>
      )}
    </div>
  );
};

export default AttachmentForm;
