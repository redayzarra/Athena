import React from "react";
import SideBar from "./_components/SideBar/SideBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-52 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
