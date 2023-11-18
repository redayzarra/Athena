"use client";

import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaCircleHalfStroke } from "react-icons/fa6";
import * as z from "zod";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

// Zod form
const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required." }),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: Props) => {
  // State variables for toggling component
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // Initialize the useToast hook and router
  const { toast } = useToast();
  const router = useRouter();

  // Form and submit state variable
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description ?? "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  // Submitting state variable
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );

      // Success
      toast({
        title: "Chapter Description Updated!",
        description:
          "Your chapter has been successfully updated with the new description.",
      });
      toggleEdit();
      router.refresh();

      // Error handling
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to update the description. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-3 border bg-card rounded-md p-4 drop-shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-primary flex items-center gap-x-2">
          {!initialData.description || isEditing ? (
            <FaCircleHalfStroke />
          ) : (
            <FaCircleCheck />
          )}
          <p className="text-muted-foreground">Description</p>
        </span>
        <Button
          size="sm"
          onClick={toggleEdit}
          variant="ghost"
          className="text-muted-foreground"
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              className="font-semibold"
              size="sm"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div
          className={cn("text-md mt-2", !initialData.description && "italic")}
        >
          {!initialData.description ? (
            "No description"
          ) : (
            <Preview value={initialData.description} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
