import React from "react";
import Logo from "../Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import SideBarRoutes from "./SideBarRoutes";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-background dark:bg-background shadow-lg">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <ModeToggle />
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
