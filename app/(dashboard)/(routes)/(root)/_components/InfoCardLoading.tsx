import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  label: string;
  icon: LucideIcon;
}

export const InfoCardLoading = ({
  icon: Icon,
  label,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <Icon />
      <div>
        <p className="font-medium mb-2">{label}</p>
        <Skeleton className="h-3 w-[100px] -mt-1" />
      </div>
    </div>
  );
};
