import { Skeleton } from "@/components/ui/skeleton";

export const CategoryItemLoading = () => {
  return (
    <div className="py-2 px-3 text-sm font-medium border border-muted-foreground/20 dark:border-muted-foreground/15 rounded-full flex items-center gap-x-1 bg-accent/30 dark:hover:bg-card transition-all hover:shadow-md dark:shadow-accent">
      <Skeleton className="rounded-full h-4 w-4" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

export default CategoryItemLoading;
