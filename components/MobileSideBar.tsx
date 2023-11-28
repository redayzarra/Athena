import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";

interface Props {
  size?: number;
}

const MobileSideBar = ({ size = 60, children }: PropsWithChildren<Props>) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-75 transition-all">
        <CgMenuLeftAlt size={24} color={cn("bg-foreground")} />
      </SheetTrigger>
      <SheetContent side="left" className={`w-${size} p-0 shadow-none`}>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
