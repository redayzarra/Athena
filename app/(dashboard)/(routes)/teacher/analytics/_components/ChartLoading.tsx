import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ChartLoading = () => {
  return (
    <Card className="p-4">
      <Skeleton className="h-[200px] w-full" />
    </Card>
  );
};

export default ChartLoading;
