"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { File, Loader2, PlusCircle, X } from "lucide-react";
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
  // Editing variables to toggle component
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // Initialize the useToast hook and router
  const { toast } = useToast();
  const router = useRouter();

  // Adding a new attachment
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
          "Unable to add the attachment. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  // Delete functionality
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to delete the attachment. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4 drop-shadow-lg">
      <div className="font-bold flex items-center mb-2 justify-between">
        <p className="text-base font-medium text-muted-foreground flex items-center gap-x-2">
          Attachments
        </p>
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
        <div className="rounded-md flex flex-col items-center justify-center">
          <div className="dark:bg-background dark:border dark:border-dashed rounded-md">
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url: url });
                }
              }}
            />
          </div>
          <p className="text-xs mt-2 text-muted-foreground font-bold">
            Add attachments for your course
          </p>
        </div>
      ) : (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-md mt-2 italic">No attachments</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full dark:bg-background bg-muted-foreground/5 border text-foreground rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={true}
                      className="h-6 -my-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 -my-2"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttachmentForm;
