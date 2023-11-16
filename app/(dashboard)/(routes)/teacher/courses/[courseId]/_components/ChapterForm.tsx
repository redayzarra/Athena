"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Props {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterForm = ({ initialData, courseId }: Props) => {
  // State variables to toggle component
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => setIsCreating((current) => !current);

  // Initialize the useToast hook and router
  const { toast } = useToast();
  const router = useRouter();

  // Form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // Submitting state variable
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast({
        title: "Chapter Created!",
        description:
          "Your course has been successfully updated with the new chapter.",
      });
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to update the chapter. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-3 border bg-card rounded-md p-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-muted-foreground flex items-center gap-x-2">
          Chapters
        </p>
        <Button
          size="sm"
          onClick={toggleCreating}
          variant="ghost"
          className="text-muted-foreground"
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {isCreating ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g 'Master the basics of video editing with Premiere Pro! This guide is...'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <p className={cn("text-md mt-2", !initialData.description && "italic")}>
          {initialData.description || "No description"}
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
