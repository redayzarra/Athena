"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbCurrencyDollar, TbCurrencyDollarOff } from "react-icons/tb";
import * as z from "zod";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

// Zod form
const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAccessForm = ({ initialData, courseId, chapterId }: Props) => {
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
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="font-medium">Mark as open access</div>
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-md font-bold mt-2">
          {!initialData.isFree ? (
            <div className="flex items-center">
              <div className="text-primary mr-2">
                <TbCurrencyDollar size="20" />
              </div>
              Premium Content
            </div>
          ) : (
            <div className="flex items-center">
              <div className="text-primary mr-2">
                <TbCurrencyDollarOff size="20" />
              </div>
              Open Access
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterAccessForm;
