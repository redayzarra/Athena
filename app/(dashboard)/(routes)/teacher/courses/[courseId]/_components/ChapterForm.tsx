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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ChaptersList from "./ChaptersList";

interface Props {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterForm = ({ initialData, courseId }: Props) => {
  // State variables to toggle component
  const [isCreating, setIsCreating] = useState(false);
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

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to reorder the chapter. Please check your connection and try again.",
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
        <>
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
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'Introduction'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a name for your chapter.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type="submit">
                Create
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <>
          <p
            className={cn(
              "text-md mt-2",
              !initialData.chapters.length && "italic"
            )}
          >
            {!initialData.chapters.length && "No chapters"}
            <ChaptersList
              onEdit={() => {}}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder chapters
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterForm;
