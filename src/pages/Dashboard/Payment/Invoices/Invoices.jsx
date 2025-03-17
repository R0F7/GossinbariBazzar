import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../../components/Table/Table";
import useAuth from "../../../../hooks/useAuth";
import useGetSecureData from "../../../../hooks/useGetSecureData";
import { Link } from "react-router-dom";

const Invoices = () => {
  const { user } = useAuth();
  const orderData = useGetSecureData("orderData", `/order-data/${user?.email}`);
  console.log(orderData);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("orderID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "order IDs",
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
    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "payment amounts",
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
    <section>
      <Table title="Invoice List" data={orderData} columns={columns}></Table>
    </section>
  );
};

export default Invoices;
