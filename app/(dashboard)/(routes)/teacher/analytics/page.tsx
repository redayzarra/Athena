import getAnalytics from "@/actions/getAnalytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";
import { Metadata } from "next";
import DataCardLoading from "./_components/DataCardLoading";
import ChartLoading from "./_components/ChartLoading";

const AnalyticsPage = async () => {
  // Protecting page with user authentication
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat={true}
        />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;

export const metadata: Metadata = {
  title: "User Analytics - Brainery Insights",
  description:
    "Access detailed analytics on Brainery with insights into your total revenue and sales. Track course performance and user engagement through our intuitive charts and data visualizations.",
};
