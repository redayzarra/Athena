import CourseListLoading from "@/components/loading/CoursesListLoading";
import { Skeleton } from "@/components/ui/skeleton";
import CategoriesLoading from "./_components/CategoriesLoading";

const LoadingSearchPage = async () => {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-black">Browse Courses</h1>
      <div className="space-y-4">
        <div className="md:hidden md:mb-0 block">
          <Skeleton className="h-9 rounded-full w-full" />
        </div>
        <CategoriesLoading />
        <CourseListLoading />
      </div>
    </div>
  );
};

export default LoadingSearchPage;
