import { Logo } from "../Logo";
import SideBarRoutes from "./SideBarRoutes";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-background dark:bg-background shadow-lg">
      <div className="flex justify-center items-center p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
