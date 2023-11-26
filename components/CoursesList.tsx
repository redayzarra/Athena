import { CourseWithCatPro } from "@/actions/getCourses";
import CourseCard from "./CourseCard";

interface Props {
  items: CourseWithCatPro[];
}

const CoursesList = ({ items }: Props) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
            description={item.description!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          No courses found.
        </div>
      )}
    </div>
  );
};

export default CoursesList;
