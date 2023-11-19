"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client";
import axios from "axios";
import { PencilIcon, PlusCircle, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleCheck, FaCircleHalfStroke } from "react-icons/fa6";
import * as z from "zod";

interface Props {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({ initialData, courseId, chapterId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Initialize the useToast hook
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast({
        title: "Video Updated!",
        description:
          "Your course has been successfully updated with the new video. Please refresh the page.",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          "Unable to update the video. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-3 border bg-card rounded-md p-4 drop-shadow-md">
      <div className="font-bold flex items-center mb-2 justify-between">
        <span className="text-base font-medium text-primary flex items-center gap-x-2">
          {!initialData.videoUrl || isEditing ? (
            <FaCircleHalfStroke />
          ) : (
            <FaCircleCheck />
          )}
          <p className="text-muted-foreground">Video</p>
        </span>
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
              {initialData.videoUrl ? (
                <>
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <div className="rounded-md flex flex-col items-center justify-center">
          <div className="dark:bg-background dark:border dark:border-dashed rounded-md">
            <FileUpload
              endpoint="chapterVideo"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
          </div>
          <p className="text-xs mt-2 text-muted-foreground font-bold">
            Add your chapter's main video content here
          </p>
        </div>
      ) : !initialData.videoUrl ? (
        <div className="flex items-center justify-center h-[190px] rounded-md bg-muted-foreground/5 border border-dashed dark:bg-background">
          <VideoIcon className="h-10 w-10 text-foreground" />
        </div>
      ) : (
        <div className="relative aspect-video">
          <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
