import StatCard from "@/components/StatCard/StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import {
  FaDollarSign,
  FaWallet,
  FaShoppingCart,
  FaChartLine,
  FaTags,
} from "react-icons/fa";
import { TbTax } from "react-icons/tb";
import RevenueProductTable from "./RevenueProductTable/RevenueProductTable";
import { FaMoneyBillWave } from "react-icons/fa6";
import PayoutHistory from "./PayoutHistory/PayoutHistory";
import { AiOutlineHistory } from "react-icons/ai";
import MonthlyRevenueChart from "./RevenueChart/MonthlyRevenueChart";
import { RiDiscountPercentFill } from "react-icons/ri";

const RevenueReports = () => {
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
  const { data: orders } = useGetSecureData(
    "get-order-for-revenue",
    `/orders-receive/${user?.email}?startDate=${range[0].startDate}&endDate=${
      range[0].endDate
    }&&revenueCalculation=${true}`
  );
  // console.log(orders);

  const { data: payouts } = useGetSecureData(
    "get-payout-data",
    `/payout/${user?.email}`
  );

  const { data: revenue } = useGetSecureData(
    "revenue",
    `/revenue/${user?.email}`
  );

  const formattedRange = `${format(range[0].startDate, "MMM d")} - ${format(
    range[0].endDate,
    "MMM d"
  )}`;

  const platformFeePercent = 2;
  let totalRevenue = 0;
  let total_cost_price = 0;
  let totalRevenueLoss = 0;
  let discountedOrderCount = 0;
  let discountedRevenue = 0;

  orders.forEach((order) => {
    let orderHasDiscount = false;

    order.products.forEach((product) => {
      const quantity = product.quantity;

      const price = (product.discounted_price || product.price) * quantity;
      const cost_price = Number(product.cost_price) * quantity;

      if (product.discounted_price) {
        const original_price = Number(product.price) * quantity;
        const discounted_price = Number(product.discounted_price) * quantity;
        const singleLoss = original_price - discounted_price;

        totalRevenueLoss += singleLoss;
        discountedRevenue += discounted_price;
        orderHasDiscount = true;
      }

      total_cost_price += cost_price;
      totalRevenue += price;
    });

    if (orderHasDiscount) {
      discountedOrderCount += 1;
    }
  });

  const platformFee = (totalRevenue * platformFeePercent) / 100;
  const netProfit = totalRevenue - (total_cost_price + platformFee);
  const conversionRate = (discountedOrderCount / orders.length) * 100;

  return (
    <section className="bg-[#FAFAFC] h-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#1C1B20]">
          Revenue Reports
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

      {/* Gross Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={FaDollarSign}
          iconColor="text-green-500"
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          info="All earnings before fees and product costs."
        ></StatCard>

        <StatCard
          icon={FaWallet}
          iconColor="text-blue-500"
          title="Net Profit"
          value={`$${netProfit.toFixed(2)}`}
          info="Your earnings after fees and product costs."
        ></StatCard>

        <StatCard
          icon={TbTax}
          iconColor="text-red-500"
          title="Taxes & Deductions"
          value={`$${platformFee.toFixed(2)}`}
          info="2% platform fee"
        ></StatCard>

        <StatCard
          icon={FaShoppingCart}
          iconColor="text-purple-500"
          title="Total Orders"
          value={`$${orders.length}`}
          info="Total number of orders including your products."
        ></StatCard>

        {/* <StatCard
          icon={FaClock}
          iconColor="text-yellow-500"
          title="Pending Payouts"
          value={`$${totalRevenue}`}
        ></StatCard> */}

        {/* <StatCard
          icon={TbTax}
          iconColor="text-yellow-500"
          title="Taxes & Deductions"
          value={`$${totalRevenue}`}
        ></StatCard> */}
      </div>

      <div className="flex gap-6">
        {/* Monthly Revenue Graph */}
        <div className="w-1/2">
          <MonthlyRevenueChart revenue={revenue}></MonthlyRevenueChart>
        </div>

        {/* Discount Impact Section */}
        <div className="w-1/2 space-y-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <RiDiscountPercentFill className="text-blue-500" /> Discount Impact
          </h2>

          <div className="bg-white shadow p-5 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <FaMoneyBillWave className="text-green-500 text-xl" />
              <h3 className="font-bold text-gray-700 text-sm">
                Revenue Loss from Discounts
              </h3>
            </div>
            <p className="text-lg font-semibold text-red-600">
              ${totalRevenueLoss.toFixed(2)}
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <FaChartLine className="text-blue-500 text-xl" />
              <h3 className="font-bold text-gray-700 text-sm">
                Conversion Rate (with Discount)
              </h3>
            </div>
            <p className="text-lg font-semibold text-blue-600">
              {conversionRate ? conversionRate.toFixed(2) : "0.00"}%
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <FaTags className="text-purple-500 text-xl" />
              <h3 className="font-bold text-gray-700 text-sm">
                Revenue from Discounted Sales
              </h3>
            </div>
            <p className="text-lg font-semibold text-purple-600">
              ${discountedRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-6">
        {/* Revenue by Product Table */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaMoneyBillWave className="text-blue-500" /> Revenue by Product
          </h2>

          <RevenueProductTable orders={orders}></RevenueProductTable>
        </div>

        {/* Payout History Table */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AiOutlineHistory className="text-blue-500" /> Payout History
          </h2>

          <PayoutHistory payouts={payouts}></PayoutHistory>
        </div>
      </div>
    </section>
  );
};

export default RevenueReports;
