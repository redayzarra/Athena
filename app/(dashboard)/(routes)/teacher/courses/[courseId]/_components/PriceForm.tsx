"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// The props for this component
interface Props {
  initialData: Course;
  courseId: string;
}

// The form schema to verify the input
const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({ initialData, courseId }: Props) => {
  // Editing variable to toggle the component
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // Initialize the useToast hook and router
  const { toast } = useToast();
  const router = useRouter();

  // Initialize form and submitting variable
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Convert the price to a string with two decimal places
    const formattedPrice = Number(values.price).toFixed(2);

    try {
      await axios.patch(`/api/courses/${courseId}`, {
        ...values,
        price: formattedPrice,
      });
      toast({
        title: "Price Updated!",
        description:
          "Your course has been successfully updated with the new price.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Unable to update the price. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4 drop-shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-muted-foreground">Pricing</p>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Dollars</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      disabled={isSubmitting}
                      placeholder="e.g. '5.00'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the price of your course.
                  </FormDescription>
                  <FormMessage className="text-muted-foreground" />
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
        <p
          className={cn(
            "text-lg font-extrabold text-foreground mt-2",
            !initialData.price && "font-bold text-foreground italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "Free"}
        </p>
      )}
    </div>
  );
};

export default PriceForm;
