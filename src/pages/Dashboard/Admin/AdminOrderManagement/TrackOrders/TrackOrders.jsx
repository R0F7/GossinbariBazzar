import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/useDebounce";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCopy } from "react-icons/io";

const TrackOrders = () => {
  const columnHelper = createColumnHelper();
  const [status, setStatus] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: orders } = useGetSecureData(
    "orders-for-admin",
    `/order-for-admin?status=${status}&&searchTerm=${searchTerm}`
  );
  // console.log(orders);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const findOrder = orders.find(
    (order) =>
      order.orderID === debouncedSearchTerm ||
      order.shippingDetails.trackingNumber === debouncedSearchTerm
  );

  const order_status = findOrder?.status;
  console.log(findOrder);

  const column = [
    columnHelper.accessor("orderID", {
      cell: (info) => {
        const orderID = info.getValue();

        const handleCopy = () => {
          navigator.clipboard.writeText(orderID);
          toast.success("Order ID copied!");
        };

        return (
          <div className="flex items-center gap-2">
            <span>{orderID}</span>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-blue-600"
            >
              <IoMdCopy />
            </button>
          </div>
        );
      },
      header: "Order ID",
    }),

    columnHelper.accessor("order_owner_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Customer Info",
    }),

    columnHelper.accessor("shippingDetails", {
      id: "delivery address",
      cell: (info) => {
        const shippingDetails = info.getValue();
        return (
          <span>
            {shippingDetails.village} <br /> {shippingDetails.union}
          </span>
        );
      },
      header: "Delivery Address",
    }),

    columnHelper.accessor("shippingDetails", {
      id: "estimated date",
      cell: (info) => {
        const { trackingNumber } = info.getValue();
        const handleCopy = () => {
          navigator.clipboard.writeText(trackingNumber);
          toast.success("Tracking Number copied!");
        };
        return (
          <div className="flex items-center gap-2">
            <span>{trackingNumber}</span>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-blue-600"
            >
              <IoMdCopy />
            </button>
          </div>
        );
      },
      header: "Estimated Delivery Date",
    }),

    columnHelper.accessor("shippingDetails", {
      cell: (info) => {
        const shippingDetails = info.getValue();
        const date = new Date(shippingDetails.estimatedDelivery);
        return <span>{date.toLocaleDateString()}</span>;
      },
      header: "Estimated Delivery Date",
    }),

    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),
  ];

  return (
    <section className="px-8 pt-5">
      <div className="flex items-center justify-between b-8">
        <h1 className="font-semibold text-2xl b-8">📍 Track Orders</h1>

        {/* query part */}
        <div className="flex items-center gap">
          <SearchBar
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setSearchTerm={setSearchTerm}
            placeholderText={"Search by Order ID or Tracking Number"}
          ></SearchBar>
        </div>

        <Select onValueChange={(val) => setStatus(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Order Placed">Order Placed</SelectItem>
              <SelectItem value="Processing">Processing Orders</SelectItem>
              <SelectItem value="Shipped">Shipped Orders</SelectItem>
              <SelectItem value="Delivered">Delivered Orders</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div
        className={`text-center mb-8 ${
          order_status
            ? "scale-y-100 h-[70px] origin-top "
            : "scale-y-0 h-0 origin-top"
        } transition-all duration-1000`}
      >
        <h4 className="font-bold text-xl text-gray-500 mb-2.5">
          Visual tracking of the order
        </h4>
        <p className="text-gray-500">
          <span
            className={`${
              order_status === "Order Placed" && "text-pink-300 font-bold"
            }`}
          >
            ✅ Order Placed
          </span>
          <span className="text-white"> → </span>{" "}
          <span
            className={`${
              order_status === "Processing" && "text-pink-300 font-bold"
            }`}
          >
            🕒 Processing
          </span>
          <span className="text-white"> → </span>{" "}
          <span
            className={`${
              order_status === "Shipped" && "text-pink-300 font-bold"
            }`}
          >
            📦 Shipped
          </span>
          <span className="text-white"> → </span>{" "}
          <span
            className={`${
              order_status === "Out for Delivery" && "text-pink-300 font-bold"
            }`}
          >
            🚚 Out for Delivery
          </span>
          <span className="text-white"> → </span>{" "}
          <span
            className={`${
              order_status === "Delivered" && "text-pink-300 font-bold"
            }`}
          >
            ✅ Delivered
          </span>
        </p>
      </div>

      <Table columns={column} data={orders}></Table>
    </section>
  );
};

export default TrackOrders;
