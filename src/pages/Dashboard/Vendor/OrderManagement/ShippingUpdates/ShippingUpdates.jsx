import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { BiCalendar } from "react-icons/bi";
import { IoMdCopy } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const ShippingUpdates = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();

  let times = {};
  if (startDate && endDate) times = { startDate, endDate };

  const { data: ordersData, refetch } = useGetSecureData(
    "order_data_for_order_received",
    `/orders-receive/${user?.email}?startDate=${times.startDate}&endDate=${times.endDate}&search=${searchTerm}`
  );
  // console.log(ordersData);

  const { mutateAsync: update_shipping_status } = useMutation({
    mutationFn: async ({ row, newStatus }) => {
      const { data } = axiosSecure.patch(`/shipping-status-update/${row._id}`, {
        newStatus,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("status update successfully");
      refetch();
    },
  });

  const columns = [
    // Shipment ID
    columnHelper.accessor("shippingDetails.shipmentID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Shipment ID",
    }),

    // Order ID (linked back to order)
    columnHelper.accessor("orderID", {
      cell: (info) => {
        const value = info.getValue() || "0000000000";

        const handleCopy = () => {
          navigator.clipboard.writeText(value);
          toast.success("Order ID number copied!");
        };

        return (
          <div className="flex items-center gap-1.5">
            <span>{value}</span>
            <span onClick={handleCopy} className="cursor-pointer">
              <IoMdCopy />
            </span>
          </div>
        );
      },
      header: "Order ID",
    }),

    //   Carrier (e.g. GB Express)
    columnHelper.accessor("shippingDetails.carrier", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Carrier",
    }),

    // Tracking Number (click to copy)
    columnHelper.accessor("shippingDetails.trackingNumber", {
      cell: (info) => {
        const value = info.getValue() || "0000000000";

        const handleCopy = () => {
          navigator.clipboard.writeText(value);
          toast.success("Tracking number copied!");
        };

        return (
          <div className="flex items-center gap-1.5">
            <span>{value}</span>
            <span onClick={handleCopy} className="cursor-pointer">
              <IoMdCopy />
            </span>
          </div>
        );
      },
      header: "Tracking Number",
    }),

    // Shipped Date
    columnHelper.accessor("shippingDetails.shippedDate", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Shipped Date",
    }),

    // Estimated Delivery
    columnHelper.accessor("shippingDetails.estimatedDelivery", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Estimated Delivery",
    }),

    columnHelper.accessor("shippingDetails.status", {
      header: "Status",
      cell: (info) => {
        let currentStatus = info.getValue();
        const row = info.row.original;
        // console.log(row);

        const handleChange = async (e) => {
          const newStatus = e.target.value;

          try {
            await update_shipping_status({ row, newStatus });
          } catch (error) {
            console.error("Failed to update status", error);
          }
        };

        return (
          <div className="relative w-fit">
            <select
              defaultValue={currentStatus}
              onChange={handleChange}
              className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
        );
      },
    }),
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <section className="px-8 pt-5">
      <h1 className="font-semibold text-4xl mb-8">Shipping Updates</h1>

      {/* query part */}
      <div className="flex justify-between mb-6 border-b pb-4">
        <div className="relative">
          <input
            type="search"
            name="search"
            id="search"
            className="peer border border-[#0DAFD8] text-[#0DAFD8] font-medium outline-[#0DAFD8] shadow-sm w-[452px] pl-9 py-2.5 rounded-full"
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => {
              if (e.target.value === "") setIsFocus(false);
            }}
            onChange={(e) => handleSearch(e)}
          />
          <IoSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-[#0DAFD8] pointer-events-none" />
          <span
            className={`absolute top-3 left-10 text-gray-600 text-xs transition-all duration-300 ${
              isFocus && "-mt-5 ml-[150px] bg-[#0DAFD8] text-white"
            } px-1.5 py-0.5 rounded-md pointer-events-none`}
          >
            Search by Order ID or Tracking Number
          </span>
        </div>

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
            <BiCalendar
              className={`absolute top-[11px] left-3.5 ${
                startDate ? "text-[#3885F4]" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      </div>

      <Table data={ordersData} columns={columns}></Table>
    </section>
  );
};

export default ShippingUpdates;