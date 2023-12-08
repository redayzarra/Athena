import LoadingCourseCard from "./CourseCardLoading";

const CourseListLoading = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <LoadingCourseCard />
      <LoadingCourseCard />
      <LoadingCourseCard />
      <LoadingCourseCard />
    </div>
  );
};

export default CourseListLoading;
