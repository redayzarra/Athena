import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Progress
        className={cn("h-2 w-56", size === "sm" && "h-2 w-32 mt-1")}
        value={value}
        variant={variant}
      />
      <p
        className={cn(
          "font-medium text-sm text-muted-foreground mt-1",
          sizeByVariant[size || "default"]
        )}
      >
        {size !== "sm" && (
          <>
            {Math.round(value)}% Complete{value === 100 && "!"}
          </>
        )}
      </p>
    </div>
  );
};

export default CourseProgress;
