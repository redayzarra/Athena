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
        "flex items-center gap-x-2 mx-4 mb-2 rounded-lg text-muted-foreground text-sm font-[500] pl-9 transition-all hover:text-foreground hover:bg-card",
        isActive &&
          "text-background bg-foreground hover:text-background hover:bg-foreground"
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
