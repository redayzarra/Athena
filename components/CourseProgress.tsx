import { Progress } from "./ui/progress";

interface Props {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const sizeVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: Props) => {
  return (
    <div>
      <Progress value={value} className="h-2" variant={variant} />
    </div>
  );
};

export default CourseProgress;
