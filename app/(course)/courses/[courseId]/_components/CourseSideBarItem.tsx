"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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
        "flex items-center gap-x-2 pl-6 text-sm font-medium border border-muted-foreground/20 dark:border-muted-foreground/15 bg-accent/30 dark:hover:bg-card transition-all",
        isActive && "bg-accent hover:bg-accent dark:hover:bg-accent",
        isCompleted && "text-primary hover:text-primary",
        isCompleted && isActive && "bg-primary"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-muted-foreground",
            isActive && "text-foreground",
            isCompleted && "text-primary"
          )}
        />
        {label}
      </div>
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
