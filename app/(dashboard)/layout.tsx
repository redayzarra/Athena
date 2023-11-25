import React from "react";
import NavBar from "./_components/NavBar";
import SideBar from "./_components/SideBar";
import Container from "@/components/Container";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed z-50">
        <SideBar />
      </div>
      <Container>
        <main className="md:ml-56 h-full space-y-10">
          <NavBar />
          {children}
        </main>
      </Container>
    </div>
  );
};
export default DashboardLayout;
