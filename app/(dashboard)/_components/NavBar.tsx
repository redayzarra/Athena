import NavBarRoutes from "@/components/NavBarRoutes";
import MobileSideBar from "../../../components/MobileSideBar";
import SideBar from "./SideBar";

const NavBar = () => {
  return (
    <div className="flex items-center">
      <MobileSideBar>
        <SideBar />
      </MobileSideBar>
      <NavBarRoutes />
    </div>
  );
};

export default NavBar;
