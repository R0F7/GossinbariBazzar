import Table from "@/components/Table/Table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import ReceivedOrderDetails from "@/pages/Dashboard/Vendor/OrderManagement/OrdersReceived/ReceivedOrderDetails/ReceivedOrderDetails";
import ContactModal from "@/pages/Dashboard/Vendor/OrderManagement/ReturnsDisputes/ContactModal/ContactModal";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import toast from "react-hot-toast";
import { RiContactsFill, RiContactsLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const { data: all_orders, refetch } = useGetSecureData(
    "all-orders",
    "/order-for-admin"
  );
//   console.log(all_orders);

  const { mutateAsync: update_order_status } = useMutation({
    mutationFn: async ({ row, status }) => {
      const { data } = await axiosSecure.patch(
        `/order-status-update/${row._id}`,
        { status }
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Product status updated");
    },
  });

  const columns = [
    columnHelper.accessor("orderID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order ID",
    }),

    columnHelper.accessor("order_owner_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Customer Name",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => {
        const date = info.getValue();
        return <span>{new Date(date).toLocaleDateString()}</span>;
      },
      header: "Order Date",
    }),

    columnHelper.accessor("paymentInfo.paymentMethod", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Payment Method",
    }),

    columnHelper.accessor("paymentInfo.paymentStatus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Payment Status",
    }),

    columnHelper.accessor("total_quantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Qnt",
    }),

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total Amount",
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        let currentStatus = info.getValue();
        const row = info.row.original;

        const handleChange = async (e) => {
          const newStatus = e.target.value;
          currentStatus = newStatus;

          const status = newStatus;

          try {
            await update_order_status({ row, status });
          } catch (error) {
            console.error("Failed to update status", error);
          }
        };

        return (
          <>
            <select
              defaultValue={currentStatus}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </>
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

    columnHelper.accessor("_id", {
      cell: (id) => (
        <Link to={`/dashboard/invoice/${id.getValue()}`}>
          <button className="text-blue-500 text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            Invoice
          </button>
        </Link>
      ),
      header: "",
    }),

    columnHelper.accessor("", {
      cell: (info) => {
        const row = info.row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              {isOpen ? <RiContactsFill /> : <RiContactsLine />}
            </button>
            <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} data={row} />
          </>
        );
      },
      id: "Contact Customer",
    }),
  ];

  return (
    <section className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">All Orders</h1>
      <Table columns={columns} data={all_orders}></Table>
    </section>
  );
};

export default AllOrders;
