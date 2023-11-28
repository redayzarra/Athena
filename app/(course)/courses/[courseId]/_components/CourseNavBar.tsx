import MobileSideBar from "@/components/MobileSideBar";
import NavBarRoutes from "@/components/NavBarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseSideBar from "./CourseSideBar";

interface Props {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavBar = ({ course, progressCount }: Props) => {
  return (
    <div className="h-full flex items-center">
      <MobileSideBar size={72}>
        <CourseSideBar course={course} progressCount={progressCount} />
      </MobileSideBar>
      <NavBarRoutes />
    </div>
  );
};

export default CourseNavBar;
