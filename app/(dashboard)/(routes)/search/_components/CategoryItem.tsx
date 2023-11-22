"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  icon?: IconType;
  value?: string;
}

const CategoryItem = ({ label, icon: Icon, value }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryName = searchParams.get("categoryName");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryName === label;

  const onClick = () => {
    const url = qs.stringify(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryName: isSelected ? null : label,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm font-medium border border-muted-foreground/20 dark:border-muted-foreground/15 rounded-full flex items-center gap-x-1 bg-muted-foreground/5 dark:hover:bg-card transition hover:shadow-md dark:shadow-muted-foreground/20"
        // Change style when active
      )}
      type="button"
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
