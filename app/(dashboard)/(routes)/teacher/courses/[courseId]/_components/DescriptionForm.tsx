"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  initialData: {
    description: string | null;
  };
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
      description: initialData.description ?? "", // Use '??' to fallback to an empty string if `null`
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
        description: "The course description has been successfully saved.",
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
        Description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
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
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g 'Master the basics of video editing with Premiere Pro! This guide is...'"
                      {...field}
                    />
                  </FormControl>
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
            "text-md mt-2",
            !initialData.description && "text-muted-foreground italic"
          )}
        >
          {initialData.description || "No description"}
        </p>
      )}
    </div>
  );
};

export default DescriptionForm;
