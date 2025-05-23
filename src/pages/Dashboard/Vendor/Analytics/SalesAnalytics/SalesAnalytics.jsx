import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FiDollarSign,
  FiShoppingCart,
  FiRepeat,
  FiBarChart2,
} from "react-icons/fi";
import SalesChart from "./SalesChart/SalesChart";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import TopProducts from "./TopProducts/TopProducts";
import SalesByCategoryChart from "./SalesByCategoryChart/SalesByCategoryChart";

const SalesAnalytics = () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [range, setRange] = useState([
    {
      startDate: oneMonthAgo,
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [groupBy, setGroupBy] = useState("monthly");
  const { user } = useAuth();
  const [chartType, setChartType] = useState("line");
  const [categoryChartType, setCategoryChartType] = useState("pie");
  const [topProductSortBy, setTopProductSortBy] = useState("units");

  const formattedRange = `${format(range[0].startDate, "MMM d")} - ${format(
    range[0].endDate,
    "MMM d"
  )}`;

  const { data: orders, isLoading } = useGetSecureData(
    "get-order-for-chart",
    `/orders-receive/${user?.email}?startDate=${range[0].startDate}&endDate=${range[0].endDate}`
  );

  const total_sale = orders.reduce((acc, order) => {
    return acc + Number(order.total_price);
  }, 0);

  const returned_orders = orders.filter(
    (o) => o.returns && o.returns.length > 0
  );
  const return_rate = (returned_orders.length / orders.length) * 100;

  const avg_order_value = total_sale / orders.length;

  return (
    <section className="bg-[#FAFAFC] h-full p-4 pb-0">
      {/* heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#1C1B20]">
          Sales Analytics
        </h2>

        <div className="flex gap- items-center relative">
          <div className="">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="border px-3 h-9 rounded-l-md shadow-sm text-sm"
            >
              📅 {formattedRange}
            </button>
            {showCalendar && (
              <div className="absolute z-50 right-0 top-12">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setRange([item.selection])}
                  moveRangeOnFirstSelection={true}
                  ranges={range}
                />
              </div>
            )}
          </div>

          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-[120px] border-l-0 rounded-l-none focus:ring-0">
              <SelectValue placeholder="Group By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Total Sales Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Sales Amount */}
        <div className="flex items-center gap-3.5 p-4 bg-white rounded-md shadow">
          <FiDollarSign className="text-green-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Total Sales</p>
            <p className="text-lg font-semibold">${total_sale}</p>
          </div>
        </div>

        {/* Total Number of Orders */}
        <div className="flex items-center gap-3.5 p-4 bg-white rounded-md shadow">
          <FiShoppingCart className="text-blue-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Total Orders</p>
            <p className="text-lg font-semibold">{orders.length}</p>
          </div>
        </div>

        {/* Order Return Rate */}
        <div className="flex items-center gap-3.5 p-4 bg-white rounded-md shadow">
          <FiRepeat className="text-yellow-500 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Return Rate</p>
            <p className="text-lg font-semibold">
              {return_rate ? return_rate.toFixed(2) : 0}%
            </p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="flex items-center gap-3.5 p-4 bg-white rounded-md shadow">
          <FiBarChart2 className="text-purple-600 w-6 h-6" />
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Avg Order Value</p>
            <p className="text-lg font-semibold">
              ${avg_order_value ? avg_order_value.toFixed(2) : 0}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sales Trend Chart */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Sales Over Time
              {/* Sales Trend Chart */}
            </h2>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[130px] focus:ring-0">
                <SelectValue placeholder="Chart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!isLoading && (
            <SalesChart
              orders={orders}
              groupBy={groupBy}
              dateRange={{
                startDate: range[0].startDate,
                endDate: range[0].endDate,
              }}
              chartType={chartType}
            />
          )}
        </div>
        
        {/* categories pie chart */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Sales by Category
              {/* Sales Trend Chart */}
            </h2>
            <Select
              value={categoryChartType}
              onValueChange={setCategoryChartType}
            >
              <SelectTrigger className="w-[130px] focus:ring-0">
                <SelectValue placeholder="Chart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pie">Pie Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SalesByCategoryChart
            orders={orders}
            chartType={categoryChartType}
            dateRange={{
              startDate: range[0].startDate,
              endDate: range[0].endDate,
            }}
          ></SalesByCategoryChart>
        </div>
      </div>

      {/* Top Performing Products */}
      <div className="-1/2 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Top Performing Products</h2>
          <Select value={topProductSortBy} onValueChange={setTopProductSortBy}>
            <SelectTrigger className="w-[150px] focus:ring-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="units">Units Sold</SelectItem>
              <SelectItem value="revenue">Total Revenue</SelectItem>
              <SelectItem value="score">Weighted Score</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TopProducts orders={orders} sortBy={topProductSortBy}></TopProducts>
      </div>
    </section>
  );
};

export default SalesAnalytics;
