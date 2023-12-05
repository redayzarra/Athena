"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Divide, Loader2, Lock } from "lucide-react";
import next from "next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";

interface Props {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: Props) => {
  const [isReady, setIsReady] = useState(false);

  // Setting up router and toast
  const router = useRouter();
  const { toast } = useToast();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}`, {
          isCompleted: true,
        });
      }

      router.refresh();

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      // Error handling
    } catch (error) {
      console.log("VIDEO PLAYER ERROR FOR ON END");
      // toast({
      //   title: "Something went wrong.",
      //   description:
      //     "Unable to mark as complete. Please check your connection and try again.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-card flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
