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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Props {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

// Zod schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
});

const ChapterTitleForm = ({ initialData, courseId, chapterId }: Props) => {
  // State variables for toggling component
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // Initialize the useToast hook and router
  const { toast } = useToast();
  const router = useRouter();

  // Form and sumitting state variable
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;

  // Submitting functionality
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast({
        title: "Chapter Title Updated!",
        description:
          "Your chapter has been successfully updated with the new title.",
      });
      toggleEdit();
      router.refresh();

      // Error handling for submitting
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to update the title. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex-grow">
        {isEditing ? (
          <Form {...form}>
            <form
              id="ChapterTitleForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className={cn("font-black text-xl")}
                        placeholder="e.g 'Introduction'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the title for your chapter.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <span className="text-3xl font-black line-clamp-3">
            {initialData.title}
          </span>
        )}
      </div>

      {/* Edit Button */}
      <div className="flex ml-2">
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
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {isEditing && (
        <Button
          disabled={isSubmitting}
          size="sm"
          className="ml-1 drop-shadow-xl"
          variant="default"
          form="ChapterTitleForm"
          type="submit"
        >
          Save
        </Button>
      )}
    </>
  );
};

export default ChapterTitleForm;
