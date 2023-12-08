import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";

const CourseCardLoading = () => {
  return (
    <div className="group hover:shadow-md dark:shadow-accent transition overflow-hidden border rounded-lg h-full flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <Skeleton className="h-full w-full rounded-t-md rounded-none" />
      </div>

      {/* Info */}
      <div className="flex flex-col p-2 flex-grow">
        <Skeleton className="h-4 w-[250px]" />
        <div className="mt-1">
          <Skeleton className="h-2 w-10" />
        </div>

        {/* Align Chapters and Progress Bar at Bottom */}
        <div className="mt-auto">
          <div className="my-3 gap-x-2 text-sm flex items-center">
            <div className="flex items-center gap-x-2">
              <BookOpen />
              <Skeleton className="h-3 w-14" />
              <LiaGripLinesVerticalSolid
                size={25}
                className="text-muted-foreground"
              />
            </div>
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardLoading;
