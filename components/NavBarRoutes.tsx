"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout, MdOutlineCreate } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";

const NavBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="max-w-md flex-1 mx-2 md:mx-0 hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex space-x-2 ml-auto items-center">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="default" variant="outline">
              <MdLogout className="mr-1" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="default" variant="outline">
              <MdOutlineCreate className="h-4 w-4 mr-1 -ml-1" />
              Create
            </Button>
          </Link>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavBarRoutes;
