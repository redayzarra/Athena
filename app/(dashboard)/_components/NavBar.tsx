import React from "react";
import MobileSideBar from "./MobileSideBar";
import NavBarRoutes from "@/components/NavBarRoutes";

const NavBar = () => {
  return (
    <div className="p-4 h-full border-b shadow-sm flex items-center bg-background">
      <MobileSideBar />
      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
