"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: currentCategory,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategory, router, pathname]);

  return (
    <div className="relative flex mr-3">
      <Search className="h-5 w-5 absolute top-3 left-3 text-primary" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 rounded-full focus-visible:bg-accent/25"
        placeholder="Search for a course..."
      />
    </div>
  );
};

export default SearchInput;
