import MobileSideBar from "../MobileSideBar";
import NavBarRoutes from "./NavBarRoutes";

const NavBar = async () => {
  return (
    <div className="space-x-4 p-4 h-full border-b shadow-md flex items-center bg-background">
      <MobileSideBar />
      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
