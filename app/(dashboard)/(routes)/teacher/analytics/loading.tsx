import ChartLoading from "./_components/ChartLoading";
import DataCardLoading from "./_components/DataCardLoading";

const LoadingAnalyticsPage = async () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DataCardLoading label="Total Revenue" />
        <DataCardLoading label="Total Sales" />
      </div>
      <ChartLoading />
    </div>
  );
};

export default LoadingAnalyticsPage;
