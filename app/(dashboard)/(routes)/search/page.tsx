import getCourses from "@/actions/getCourses";
import CoursesList from "@/components/CoursesList";
import SearchInput from "@/components/SearchInput";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Categories from "./_components/Categories";

interface Props {
  searchParams: {
    title: string;
    category: string;
  };
}

const SearchPage = async ({ searchParams }: Props) => {
  // Protecting with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Find the category ID using the label
  const category = categories.find(
    (cat) => cat.label === searchParams.category
  );
  const categoryId = category ? category.id : undefined;

  const courses = await getCourses({
    userId, 
    title: searchParams.title,
    categoryId,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-black">Browse Courses</h1>
      <div className="space-y-4">
        <div className="md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </div>
  );
};

export default SearchPage;

export const metadata: Metadata = {
  title: "Explore Courses - Athena Search",
  description:
    "Discover and explore a diverse range of courses on Athena. Whether you're deepening professional skills or pursuing personal interests, our search feature helps you find the perfect course tailored to your needs.",
};
