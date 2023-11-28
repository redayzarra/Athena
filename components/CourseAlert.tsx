import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

interface Props {
  variant?: "default" | "destructive" | null | undefined;
  title: string;
  description: string;
}

const CourseAlert = ({ variant = "default", title, description }: Props) => {
  return (
    <Alert variant={variant}>
      {variant == "destructive" ? (
        <FaTriangleExclamation  className="h-4 w-4" />
      ) : (
        <Terminal className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default CourseAlert;
