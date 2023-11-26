"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  name: string;
  label: string;
  icon?: IconType;
}

export const CategoryItem = ({
  name,
  label,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryLabel = searchParams.get("category");
  const currentTitle = searchParams.get("title");

  const isSelected = categoryLabel === label;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          category: isSelected ? null : label,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm font-medium border border-muted-foreground/20 dark:border-muted-foreground/15 rounded-full flex items-center gap-x-1 bg-accent/30 dark:hover:bg-card transition-all hover:shadow-md dark:shadow-muted-foreground/20",
        isSelected &&
          "bg-accent hover:bg-accent dark:hover:bg-accent shadow-md dark:shadow-muted-foreground/20"
      )}
      type="button"
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{name}</div>
    </button>
  );
};

export default CategoryItem;
