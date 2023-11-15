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
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaCircleHalfStroke } from "react-icons/fa6";
import * as z from "zod";

interface Props {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required." }),
});

const DescriptionForm = ({ initialData, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description ?? "",
    },
  });

  // Initialize the useToast hook
  const { toast } = useToast();

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: "Course description updated!",
        description: "The course description has been saved.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was a problem submitting your description.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        <span className="text-base font-medium text-primary flex items-center gap-x-2">
          {!initialData.description || isEditing ? (
            <FaCircleHalfStroke />
          ) : (
            <FaCircleCheck />
          )}
          <p className="text-muted-foreground">Description</p>
        </span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <p className="text-muted-foreground">Cancel</p>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-muted-foreground">Edit</p>
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
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g 'Master the basics of video editing with Premiere Pro! This guide is...'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your course
                  </FormDescription>
                  <FormMessage className="text-muted-foreground" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-md text-foreground mt-2",
            !initialData.description && "text-foreground italic"
          )}
        >
          {initialData.description || "No description"}
        </p>
      )}
    </div>
  );
};

export default DescriptionForm;
