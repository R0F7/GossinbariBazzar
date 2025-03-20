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
      header: "order ID",
    }),
    columnHelper.accessor((row) => row.order_owner_info.name, {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Billing Name",
    }),
    columnHelper.accessor((row) => row.contactInfo.name, {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Shipping Name",
    }),
    columnHelper.accessor((row) => row.shippingDetails, {
      cell: (info) => (
        <span>
          {info.getValue().village}, {info.getValue().union}
        </span>
      ),
      header: "Address",
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
    <section className="p-8">
      <h1 className="font-semibold text-4xl mb-8">Invoices</h1>

      <Table title="Invoice List" data={orderData} columns={columns}></Table>
    </section>
  );
};

export default Invoices;
