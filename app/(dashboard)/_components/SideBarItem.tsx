"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SideBarItem = ({ icon: Icon, label, href }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center font-extrabold gap-x-2 mx-4 mb-2 rounded-lg text-sm pl-9 transition-all text-muted-foreground hover:text-foreground hover:bg-accent",
        isActive &&
          "text-background bg-foreground/95 hover:text-background hover:bg-foreground/95 dark:hover:bg-foreground"
      )}
    >
      <div className="flex items-center gap-x-2 py-2.5">
        <Icon size={22} className={cn(isActive && "text-background")} />
      </div>
      {label}
    </button>
  );
};

export default SideBarItem;
