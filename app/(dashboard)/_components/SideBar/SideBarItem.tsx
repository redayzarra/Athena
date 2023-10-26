"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
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
        "flex items-center gap-x-2 mx-4 mb-1 rounded-xl text-primary/75 text-sm font-[500] pl-9 transition-all hover:text-primary hover:bg-primary/10",
        isActive &&
          "text-secondary bg-primary hover:bg-primary hover:text-secondary"
      )}
    >
      <div className="flex items-center gap-x-3 py-2 ">
        <Icon size={22} className={cn(isActive && "text-secondary")} />
        {label}
      </div>
    </button>
  );
};
