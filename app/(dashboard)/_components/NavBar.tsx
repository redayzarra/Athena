import React from "react";
import MobileSideBar from "./MobileSideBar";
import NavBarRoutes from "@/components/NavBarRoutes";
import Container from "@/components/Container";

const NavBar = () => {
  return (
    <div className="flex items-center">
      <MobileSideBar />
      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
