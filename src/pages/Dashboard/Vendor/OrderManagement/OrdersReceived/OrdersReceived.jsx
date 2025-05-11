import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
// import { TbFileInvoice } from "react-icons/tb";
import ReceivedOrderDetails from "./ReceivedOrderDetails/ReceivedOrderDetails";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { BiCalendar } from "react-icons/bi";

const OrdersReceived = () => {
  const { user } = useAuth();
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let times = {};
  if (startDate && endDate) times = { startDate, endDate };

  const { data: ordersData, refetch } = useGetSecureData(
    "order_data_for_order_received",
    `/orders-receive/${user?.email}?startDate=${times.startDate}&endDate=${times.endDate}`
  );
  // console.log(ordersData)

  // update_vendor_status
  const { mutateAsync: update_vendor_status } = useMutation({
    mutationFn: async ({ row, vendor_status }) => {
      const { data } = await axiosSecure.patch(
        `/order_update_vendor_status/${row._id}`,
        { vendor_status }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("status updated");
      refetch();
    },
  });

  const filterOrders = (orders, statusList) => {
    return orders.filter((order) => statusList.includes(order.status));
  };

  // const filterProcessingOrder = (order,statusList)=>{
  //   return order.filter((order)=> )
  // }

  const pendingOrder = filterOrders(ordersData, [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
  ]);

  const newOrders = filterOrders(ordersData, ["Order Placed"]);
  const completedOrder = filterOrders(ordersData, ["Delivered"]);
  const cancelledOrder = filterOrders(ordersData, ["Cancelled"]);
  const processingOrder =
    ordersData?.filter((order) =>
      order.vendor_status?.some((v) => v.status === "Processing")
    )?.length || 0;

  const columns = [
    columnHelper.accessor("orderID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order ID",
    }),

    columnHelper.accessor("order_owner_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Customer Name",
    }),

    // products
    // {
    //   header: "Products",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div className="space-y-2">
    //         {products.map((p, idx) => (
    //           <div key={idx} className="flex items-center gap-2">
    //             <img src={p.image} alt={p.name} className="w-8 h-8 rounded" />
    //             <span>{p.name}</span>
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    // unit
    // {
    //   header: "Unit",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div>
    //         {products.map((p, idx) => (
    //           <h6 key={idx}>{p.unit}</h6>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    // Quantities
    // {
    //   header: "Quantities",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div>
    //         {products.map((p, idx) => (
    //           <h6 key={idx}>{p.quantity}</h6>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    // Price
    // {
    //   header: "Price",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div>
    //         {products.map((p, idx) => (
    //           <h6 key={idx}>${p.price}</h6>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total Price",
    }),

    columnHelper.accessor("paymentInfo.paymentStatus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Payment Status",
    }),

    columnHelper.accessor("shippingDetails", {
      id: "deliveryAddress",
      header: "Delivery Address",
      cell: (info) => {
        const { village, union } = info.getValue();
        return (
          <span>
            {village},<br /> {union}
          </span>
        );
      },
    }),

    // {
    //   accessorFn: (row) =>
    //     `${row.shippingDetails.village}, ${row.shippingDetails.union}`,
    //   id: "deliveryAddress",
    //   header: "Delivery Address",
    //   cell: (info) => <span>{info.getValue()}</span>,
    // },

    columnHelper.accessor("delivery.category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Delivery",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Date",
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        let currentStatus = info.getValue();
        const row = info.row.original;
        // console.log(row);

        const vendorStatusArray = row.vendor_status || [];

        const matchedVendor = vendorStatusArray.find(
          (v) => v.email === user.email
        );

        const status = matchedVendor ? matchedVendor.status : currentStatus;

        const handleChange = async (e) => {
          const newStatus = e.target.value;
          currentStatus = newStatus;

          const vendor_status = {
            email: user.email,
            status: newStatus,
          };

          try {
            await update_vendor_status({ row, vendor_status });
            // console.log("Status updated");
          } catch (error) {
            console.error("Failed to update status", error);
          }
        };

        return (
          <select
            defaultValue={status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {/* <option value="Cancelled">Cancelled</option> */}
            <option value="New">New</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Mark as Processing">Mark as Processing</option>
            <option value="Processing">Processing</option>
            {/* <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option> */}
          </select>
        );
      },
    }),

    columnHelper.accessor("_id", {
      id: "productsColumn",
      header: "Details",
      cell: (info) => {
        const products = info.row.original.products;
        return <ReceivedOrderDetails products={products} />;
      },
    }),

    // TODO:Invoice
    // columnHelper.accessor("", {
    //   cell: () => (
    //     <button>
    //       <TbFileInvoice />
    //     </button>
    //   ),
    //   header: "Invoice",
    // }),
  ];

  return (
    <section className="p-8">
      <h1 className="font-semibold text-4xl mb-8">Order Received History</h1>

      <div className="border-b pb-4 mb-6 flex items-center justify-between">
        <ul className="flex gap-16 text-lg font-semibold">
          <li>All Order({ordersData.length})</li>
          <li>Total New Orders({newOrders.length - processingOrder})</li>
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
            <BiCalendar
              className={`absolute top-[11px] left-3.5 ${
                startDate ? "text-[#3885F4]" : "text-gray-500"
              }`}
            />{" "}
          </div>
        </div>
      </div>
      <Table data={ordersData} columns={columns}></Table>
    </section>
  );
};

export default OrdersReceived;
