import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import getCourses from "@/actions/getCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

interface Props {
  searchParams: {
    title: string;
    categoryLabel: string;
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
    (cat) => cat.label === searchParams.categoryLabel
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
      <div>
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
