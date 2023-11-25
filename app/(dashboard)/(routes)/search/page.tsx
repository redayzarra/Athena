import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-black">Browse Courses</h1>
      <div>
        <div className="md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <Categories items={categories} />
      </div>
    </div>
  );
};

export default SearchPage;
