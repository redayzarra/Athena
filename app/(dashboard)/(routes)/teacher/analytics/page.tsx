import getAnalytics from "@/actions/getAnalytics";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Chart from "./_components/Chart";
import DataCard from "./_components/DataCard";

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
  title: "User Analytics - Athena Insights",
  description:
    "Access detailed analytics on Athena with insights into your total revenue and sales. Track course performance and user engagement through our intuitive charts and data visualizations.",
};
