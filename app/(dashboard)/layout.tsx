import React from "react";
import SideBar from "./_components/SideBar/SideBar";
import NavBar from "./_components/NavBar/NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[60px] md:pl-56 fixed w-full">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed z-50">
        <SideBar />
      </div>
      <main className="md:ml-56 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
