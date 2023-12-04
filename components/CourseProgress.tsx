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
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sm text-muted-foreground px-16",
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete{value === 100 && "!"}
      </p>
    </div>
  );
};

export default CourseProgress;
