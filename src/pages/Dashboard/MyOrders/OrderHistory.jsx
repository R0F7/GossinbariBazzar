import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BiCalendar } from "react-icons/bi";

const OrderHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const columnHelper = createColumnHelper();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let times = {};
  if (startDate && endDate) times = { startDate, endDate };

  const { data: orderData = [] } = useQuery({
    queryKey: ["getOrderData", user?.email, times],
    queryFn: async () => {
      console.log();
      const { data } = await axiosSecure.get(
        `/order-data/${user?.email}?startDate=${times.startDate}&endDate=${times.endDate}`
      );
      return data;
    },
    enabled: !!user?.email,
  });
  // console.log(orderData);

  const filterOrders = (orders, statusList) => {
    return orders.filter((order) => statusList.includes(order.status));
  };

  const pendingOrder = filterOrders(orderData, [
    "Order Placed",
    "Shipped",
    "Out for Delivery",
  ]);

  const completedOrder = filterOrders(orderData, ["Delivered"]);
  const cancelledOrder = filterOrders(orderData, ["Cancelled"]);

  const columns = [
    columnHelper.accessor("orderID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order ID",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>
          {new Date(info.getValue()).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
      header: "Order Date",
    }),

    columnHelper.accessor("total_quantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Items Count",
    }),

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total Price",
    }),
    // {
    //   accessorKey: "total_price",
    //   header: "Total Price",
    //   cell: (info) => <span>${info.getValue()}</span>,
    // },

    columnHelper.accessor("status", {
      cell: (info) => {
        const text = info.getValue();

        return (
          <span
            className={`status ${
              text === "Order Placed"
                ? "status-pending"
                : text === "Processing"
                ? "status-processing"
                : text === "Shipped"
                ? "status-shipped"
                : text === "Out for Deliver"
                ? "status-out-for-delivery"
                : text === "Delivered"
                ? "status-completed"
                : ""
            }`}
          >
            {text}
          </span>
        );
      },
      header: "Status",
    }),

    columnHelper.accessor("_id", {
      cell: (id) => (
        <Link to={`/dashboard/my-orders/order-details/${id.getValue()}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            View Details
          </button>
        </Link>
      ),
      header: "Actions",
    }),
  ];

  return (
    <section className="p-8">
      <h1 className="font-semibold text-4xl mb-8">Order History</h1>

      <div className="border-b pb-4 mb-6 flex items-center  justify-between">
        <ul className="flex gap-16 text-lg font-semibold">
          <li>All Order({orderData.length})</li>
          <li>Pending({pendingOrder.length})</li>
          <li>Completed({completedOrder.length})</li>
          <li>Cancelled({cancelledOrder.length})</li>
        </ul>

        <div className="flex items-center mr-10 gap-3">
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(new Date(date).toISOString())}
              placeholderText="Select Start Date"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              className="border border-[#0DAFD8] text-[#0DAFD8] font-medium outline-[#0DAFD8] shadow-sm w-[152px] pl-9 py-1.5 rounded-full placeholder:text-sm placeholder:text-[#333842] placeholder:font-normal"
            />
            <BiCalendar className="absolute top-[11px] left-3.5 text-[#0DAFD8]" />{" "}
          </div>
          <span className="font-semibold text-[#333842]">To</span>
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(new Date(date).toISOString())}
              placeholderText="Select End Date"
              dateFormat="yyyy-MM-dd"
              minDate={startDate}
              disabled={!startDate}
              className="border border-[#3885F4] text-[#3885F4] font-medium disabled:border-gray-300 outline-[#3885F4] shadow-sm w-[150px] pl-9 py-1.5 rounded-full placeholder:text-sm placeholder:text-[#333842] disabled:placeholder:text-[#AAB0BA] placeholder:font-normal disabled:cursor-not-allowed"
            />
            <BiCalendar className={`absolute top-[11px] left-3.5 ${startDate ? "text-[#3885F4]" :"text-gray-500"}`} />{" "}
          </div>
        </div>
      </div>
      <Table title={"Order History"} data={orderData} columns={columns}></Table>
    </section>
  );
};

export default OrderHistory;
