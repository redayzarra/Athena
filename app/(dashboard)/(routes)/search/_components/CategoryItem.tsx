"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";
import urlFriendly from "@/lib/urlFriendly";

interface Props {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({ label, value, icon: Icon }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryName = searchParams.get("category");
  const currentTitle = searchParams.get("title");

  // Convert label to a URL-friendly format
  const urlFriendlyLabel = urlFriendly(label);

  // Find the item that is selected
  const isSelected = categoryName === urlFriendlyLabel;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          category: isSelected ? null : urlFriendlyLabel,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm font-medium border border-muted-foreground/20 dark:border-muted-foreground/15 rounded-full flex items-center gap-x-1 bg-accent/30 dark:hover:bg-card transition hover:shadow-md dark:shadow-muted-foreground/20",
        isSelected && "bg-accent hover:bg-accent dark:hover:bg-accent"
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
