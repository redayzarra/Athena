"use client";

import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUnlock } from "react-icons/fa";
import * as z from "zod";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
  canPublish: boolean;
}

// Zod form
const formSchema = z.object({
  isFree: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
  canPublish,
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
      isFree: Boolean(initialData.isFree),
      isPublished: Boolean(initialData.isPublished),
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
        title: "Chapter access updated!",
        description:
          "Your chapter has been successfully updated with the new access settings.",
      });
      toggleEdit();
      router.refresh();

      // Error handling
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
    <div className="mt-3 border bg-card rounded-md p-4 drop-shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-muted-foreground flex items-center gap-x-2">
          Settings
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
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 -space-y-1 p-2 rounded-md border">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="open-access"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="publish-toggle">
                        {field.value ? "Open Access" : "Premium Content"}
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* New Form Field for Publish/Unpublish */}
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 -space-y-1 p-2 rounded-md border">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="publish-toggle"
                        disabled={canPublish}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="publish-toggle">
                        {field.value ? "Published" : "Unpublished"}
                      </Label>
                    </div>
                  </FormControl>
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
        <>
          <div className="text-md font-bold mt-2">
            {!initialData.isFree ? (
              <div className="flex items-center">
                <div className="text-primary mr-2">
                  <FaLock size="18" />
                </div>
                Premium Content
              </div>
            ) : (
              <div className="flex items-center">
                <div className="text-primary mr-2">
                  <FaUnlock size="18" />
                </div>
                Open Access
              </div>
            )}
          </div>
          <div className="text-md font-bold mt-3">
            {!initialData.isPublished ? (
              <div className="flex items-center">
                <div className="text-primary mr-2">
                  <FaEyeSlash size="18" />
                </div>
                Unpublished
              </div>
            ) : (
              <div className="flex items-center">
                <div className="text-primary mr-2">
                  <FaEye size="18" />
                </div>
                Published
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterAccessForm;
