import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import Table from "../../../../components/Table/Table";

const PaymentHistory = () => {
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
      header: "Date",
    }),

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Amount",
    }),

    columnHelper.accessor((row) => row.paymentInfo?.paymentMethod, {
      cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
      header: "Method",
    }),

    columnHelper.accessor((row) => row.paymentInfo?.paymentStatus, {
      cell: (info) => (
        <div className="bg-green-200 text-green-900 font-semibold px-3.5 py-0.5 text-sm rounded-full flex items-center gap-1 w-[70px]">
          <div className="h-1.5 w-1.5 bg-green-900 rounded-full"></div>
          <span>{info.getValue()}</span>
        </div>
      ),
      header: "Status",
    }),

    columnHelper.accessor((row) => row.paymentInfo?.transactionId, {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Transaction ID",
    }),

    columnHelper.accessor("_id", {
      cell: (id) => (
        <Link to={`/dashboard/my-orders/order-details/${id.getValue()}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            View Details
          </button>
        </Link>
      ),
      header: "",
    }),

    columnHelper.accessor("_id", {
      cell: (id) => (
        <Link to={`/dashboard/payment/invoice/${id.getValue()}`}>
          <button className="text-blue-500 text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            View Invoice
          </button>
        </Link>
      ),
      header: "",
    }),
  ];

  return (
    <section className="p-8">
      <h1 className="font-semibold text-4xl mb-8">Payment History</h1>

      <Table
        columns={columns}
        data={orderData}
        title={"PaymentHistory"}
      ></Table>
    </section>
  );
};

export default PaymentHistory;
