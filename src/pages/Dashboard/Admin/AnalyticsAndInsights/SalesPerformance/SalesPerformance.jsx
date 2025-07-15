import useGetSecureData from "@/hooks/useGetSecureData";
import TopPerformanceProducts from "./TopPerformanceProducts/TopPerformanceProducts";
import TopPerformVendor from "./TopPerformVendor/TopPerformVendor";
import { FaTags } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import SalesByCategoryChart from "@/pages/Dashboard/Vendor/Analytics/SalesAnalytics/SalesByCategoryChart/SalesByCategoryChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SalesPerformance = () => {
  const [categoryChartType, setCategoryChartType] = useState("pie");
  // const oneMonthAgo = new Date();
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // const [range, setRange] = useState([
  //   {
  //     startDate: oneMonthAgo,
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  const { data: all_orders } = useGetSecureData(
    "all-orders",
    "/order-for-admin"
  );
  // console.log(all_orders);

  const productMap = {};
  const vendorMap = {};

  all_orders.forEach((order) => {
    order.products.forEach((product) => {
      const id = product.id;
      const quantity = Number(product.quantity);
      const unitPrice = product.discounted_price || product.price;
      const totalPrice = unitPrice * quantity;
      const costPrice = Number(product.cost_price) || 0;
      const revenue = (unitPrice - costPrice) * quantity;
      const email = product?.vendor_info?.email;
      const commission = Number((totalPrice * 0.02).toFixed(2));

      if (!productMap[id]) {
        productMap[id] = {
          name: product.name,
          unitSold: 0,
          price: 0,
          revenue: 0,
        };
      }

      if (!vendorMap[email]) {
        vendorMap[email] = {
          email,
          name: product?.vendor_info?.name,
          totalSale: 0,
          commission: 0,
        };
      }

      productMap[id].unitSold += quantity;
      productMap[id].price += totalPrice;
      productMap[id].revenue += revenue;
      vendorMap[email].totalSale += totalPrice;
      vendorMap[email].commission = Number(
        (vendorMap[email].commission + commission).toFixed(2)
      );
    });
  });

  const topPerformProducts = Object.values(productMap)
    .sort((a, b) => b.unitSold - a.unitSold)
    .slice(0, 5);
  // console.log(topPerformProducts);

  const vendorSalesPerform = Object.values(vendorMap)
    .sort((a, b) => b.totalSale - a.totalSale)
    .slice(0, 10);
  // console.log(vendorSalesPerform);

  return (
    <section className="p-6">
      <Tabs defaultValue="Sales by Product" className="w-full">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl font-semibold text-[#1C1B20]">
            Sales Performance
          </h2>
          <TabsList>
            <TabsTrigger value="Sales by Product">Sales by Product</TabsTrigger>
            <TabsTrigger value="Sales by Vendor">Sales by Vendor</TabsTrigger>
            <TabsTrigger value="Sales by Category">
              Sales by Category
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div>
          <TabsContent value="Sales by Product">
            <div className="w-[95%] mx-auto mt-6">
              <TopPerformanceProducts
                topPerformProducts={topPerformProducts}
              ></TopPerformanceProducts>
            </div>
          </TabsContent>

          <TabsContent value="Sales by Vendor">
            <div className="w-[95%] mx-auto mt-6">
              <TopPerformVendor
                topPerformVendors={vendorSalesPerform}
              ></TopPerformVendor>
            </div>
          </TabsContent>

          <TabsContent value="Sales by Category">
            <div className="w-full">
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
                orders={all_orders}
                chartType={categoryChartType}
                admin={true}
              ></SalesByCategoryChart>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex gap-6">
        {/* 🛍️ Sales by Product */}
        {/* <div className="w-1/2 ">
          <TopPerformanceProducts
            topPerformProducts={topPerformProducts}
          ></TopPerformanceProducts>
        </div> */}

        {/* categories pie chart */}
        {/* <div className="w-1/2">
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
            orders={all_orders}
            chartType={categoryChartType}
          ></SalesByCategoryChart>
        </div> */}
      </div>

      {/* 🧾 Sales by Vendor: */}
      {/* <div className="w-[95%] mx-auto mt-6">
        <TopPerformVendor
          topPerformVendors={vendorSalesPerform}
        ></TopPerformVendor>
      </div> */}
    </section>
  );
};

export default SalesPerformance;
