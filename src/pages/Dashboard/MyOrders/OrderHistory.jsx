import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";

const OrderHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const columnHelper = createColumnHelper();

  const { data: orderData = [] } = useQuery({
    queryKey: ["getOrderData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/order-data/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  //   console.log(orderData);

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

    // columnHelper.accessor("total_price", {
    //   cell: (info) => <span>${info.getValue()}</span>,
    //   header: "Total Price",
    // }),
    {
      accessorKey: "total_price",
      header: "Total Price",
      cell: (info) => <span>${info.getValue()}</span>,
    },

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
                : text === "Completed"
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
    <section>
      <Table title={"Order History"} data={orderData} columns={columns}></Table>
    </section>
  );
};

export default OrderHistory;
