"use client";

import { Loader2, Lock } from "lucide-react";
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

  return (
    <div className="relative aspect-video">
      {isLocked ? (
        <div className="absolute inset-0 rounded-sm flex items-center justify-center bg-card flex-col gap-y-2 text-muted-foreground/50">
          <Lock className="h-8 w-8" />
        </div>
      ) : (
        <div className="absolute inset-0 text-muted-foreground/50 rounded-sm flex items-center justify-center bg-card">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
