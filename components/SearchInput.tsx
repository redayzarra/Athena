"use client";

import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="relative flex">
      <Search className="h-5 w-5 absolute top-3 left-3 text-primary" />
      <Input
        className="pl-9 rounded-full focus-visible:bg-accent"
        placeholder="Search for a course..."
      />
    </div>
  );
};

export default SearchInput;
