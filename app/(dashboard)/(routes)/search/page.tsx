import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-black">Browse Courses</h1>
      <Categories items={categories} />
    </div>
  );
};

export default SearchPage;
