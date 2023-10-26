import React from "react";
import SignInButton from "../SignInButton";
import { ModeToggle } from "@/components/ui/ModeToggle";

const NavBarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto">
      <SignInButton />
      <ModeToggle />
    </div>
  );
};

export default NavBarRoutes;
