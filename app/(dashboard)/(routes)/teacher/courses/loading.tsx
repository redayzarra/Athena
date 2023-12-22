import { DataTableLoading } from "./_components/DataTableLoading";

const LoadingCoursesPage =  () => {

  return (
    <div className="mx-auto space-y-4">
      <h1 className="text-5xl font-black">Your Courses</h1>
      <DataTableLoading />
    </div>
  );
};

export default LoadingCoursesPage;