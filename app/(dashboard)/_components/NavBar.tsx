import React from "react";
import MobileSideBar from "./MobileSideBar";

const NavBar = () => {
  return (
    <div className="p-4 h-full border-b shadow-sm flex items-center bg-background">
      <MobileSideBar />
    </div>
  );
};

export default NavBar;
