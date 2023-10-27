"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout, MdOutlineCreate } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const NavBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="outline">
            <MdLogout className="mr-1" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="outline">
            <MdOutlineCreate className="mr-1" />
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
