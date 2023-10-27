"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const NavBarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      {isTeacherPage || isPlayerPage ? (
        <Button>
          <MdLogout />
          Exit
        </Button>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="outline">
            Create
          </Button>
        </Link>
      )}
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBarRoutes;
