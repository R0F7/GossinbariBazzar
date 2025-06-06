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
  FiTrendingUp,
} from "react-icons/fi";
import SalesChart from "./SalesChart/SalesChart";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import TopProducts from "./TopProducts/TopProducts";
import SalesByCategoryChart from "./SalesByCategoryChart/SalesByCategoryChart";
import { Input } from "@/components/ui/input";
import {
  FaMedal,
  FaTags,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import StatCard from "@/components/StatCard/StatCard";

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
  const [dataQty, setDataQty] = useState(14);

  const formattedRange = `${format(range[0].startDate, "MMM d")} - ${format(
    range[0].endDate,
    "MMM d"
  )}`;

  const { data: orders, isLoading } = useGetSecureData(
    "get-order-for-chart",
    `/orders-receive/${user?.email}?startDate=${range[0].startDate}&endDate=${range[0].endDate}`
  );

  const products = orders.flatMap((o) => o.products);
  const total_sale = products.reduce((acc, order) => {
    return acc + Number(order.discounted_price || order.price) * order.quantity;
  }, 0);

  const returned_orders = orders.filter(
    (o) => o.returns && o.returns.length > 0
  );
  const return_rate = (returned_orders.length / orders.length) * 100;
  const avg_order_value = total_sale / orders.length;

  const calculation = {};
  let repeat_customer = 0;
  let new_customer = 0;

  orders.forEach((order) => {
    const user_email = order.order_owner_info.email;
    calculation[user_email] = (calculation[user_email] || 0) + 1;
  });

  for (const email in calculation) {
    if (calculation[email] > 1) {
      repeat_customer += 1;
    } else {
      new_customer += 1;
    }
  }

  const total_customers = Object.keys(calculation).length;
  const repeat_percentage = ((repeat_customer / total_customers) * 100).toFixed(
    1
  );
  const new_percentage = ((new_customer / total_customers) * 100).toFixed(1);

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
        <StatCard
          icon={FiDollarSign}
          iconColor={"text-green-600"}
          title="Total Sales"
          value={`$${total_sale}`}
        ></StatCard>

        {/* Total Number of Orders */}
        <StatCard
          icon={FiShoppingCart}
          iconColor={"text-blue-600"}
          title="Total Orders"
          value={orders.length}
        ></StatCard>

        {/* Order Return Rate */}
        <StatCard
          icon={FiRepeat}
          iconColor={"text-yellow-500"}
          title={"Return Rate"}
          value={`${return_rate ? return_rate.toFixed(2) : 0}%`}
        ></StatCard>

        {/* Average Order Value */}
        <StatCard
          icon={FiBarChart2}
          iconColor={"text-purple-600"}
          title={"Avg Order Value"}
          value={`$${avg_order_value ? avg_order_value.toFixed(2) : 0}`}
        ></StatCard>
      </div>

      <div className="flex gap-6">
        {/* Sales Trend Chart */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FiTrendingUp className="text-green-500" />
              Sales Over Time
            </div>
            {/* Sales Trend Chart */}
            <div className="flex items-center">
              <Input
                title={`last ${dataQty} data`}
                value={dataQty}
                onChange={(e) => setDataQty(Number(e.target.value))}
                className="w-14 rounded-r-none focus:!ring-0"
              />
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[130px] focus:ring-0 rounded-l-none border-l-0">
                  <SelectValue placeholder="Chart" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isLoading && (
            <SalesChart
              orders={orders}
              groupBy={groupBy}
              dateRange={{
                startDate: range[0].startDate,
                endDate: range[0].endDate,
              }}
              dataQty={dataQty}
              chartType={chartType}
            />
          )}
        </div>

        {/* categories pie chart */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaTags className="text-blue-500" />
              Sales by Category
            </div>
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

      <div className="flex gap-6 mt-4">
        {/* Top Performing Products */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaMedal className="text-yellow-500" />
              Top Performing Products
            </div>
            <Select
              value={topProductSortBy}
              onValueChange={setTopProductSortBy}
            >
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

        {/* Customer Insights */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FaUsers className="text-blue-500" /> Customer Insights
          </h2>

          <div className="bg-white p-4 rounded-md shadow-md h-[255px] flex flex-col justify-center">
            <div>
              <p className="flex items-center gap-2 text-gray-700">
                <FaUserPlus className="text-green-500" />
                New Customers: {new_customer}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <FaUserCheck className="text-purple-500" />
                Repeat Customers: {repeat_customer}
              </p>

              <p className="flex items-center gap-2 text-gray-700 mt-2">
                <FaUsers className="text-gray-500" />
                Total Unique: {total_customers}
              </p>
            </div>

            <div className="mt-16">
              <div className="h-3 bg-[#22C55E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A855F7]"
                  style={{ width: `${repeat_percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Repeat ({repeat_percentage}%)</span>
                <span>New ({new_percentage}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesAnalytics;
