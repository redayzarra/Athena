"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaLock } from "react-icons/fa";

interface Props {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSideBarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm text-muted-foreground font-medium border border-muted-foreground/20 dark:border-muted-foreground/15 bg-accent/30 dark:hover:bg-card transition-all",
        isActive &&
          "bg-accent text-foreground hover:bg-accent dark:hover:bg-accent",
        isLocked &&
          "bg-background hover:bg-background dark:hover:bg-background cursor-auto text-muted-foreground/50",
        isCompleted && "text-primary hover:text-primary",
        isCompleted && isActive && "bg-accent"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <div className="inline-block">
          <Icon
            className={cn(
              "text-muted-foreground h-6 w-6",
              isActive && "text-foreground",
              isLocked && "text-muted-foreground/50",
              isCompleted && "text-primary"
            )}
          />
        </div>
        <div className="w-full text-left line-clamp-1">{label}</div>
      </div>
      {/* Border */}
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-foreground h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-primary"
        )}
      ></div>
    </button>
  );
};

export default CourseSideBarItem;
