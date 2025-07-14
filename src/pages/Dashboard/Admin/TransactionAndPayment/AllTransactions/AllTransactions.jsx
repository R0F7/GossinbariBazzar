import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import TxnDetailsModal from "./TxnDetailsModal/TxnDetailsModal";
import { useState } from "react";

const AllTransactions = () => {
  const columnHelper = createColumnHelper();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const { data: orders } = useGetSecureData(
    "orders-for-allTrans",
    "/order-for-admin"
  );
  //   console.log(orders);

  const columns = [
    columnHelper.accessor("paymentInfo.transactionId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Transaction ID",
    }),

    columnHelper.accessor("order_owner_info", {
      cell: (info) => (
        <span>
          {info.getValue().name} <br /> {info.getValue().email}
        </span>
      ),
      header: "Buyer Name & Email",
    }),

    columnHelper.accessor("paymentInfo.paymentMethod", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Payment Method",
    }),

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Amount Paid",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => {
        const formattedDate = new Date(info.getValue());
        return <span>{formattedDate.toLocaleDateString()}</span>;
      },
      header: "Date",
    }),

    columnHelper.accessor("paymentInfo.paymentStatus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <Button
            onClick={() => {
              setIsOpen(true), setData(row);
            }}
            className="bg-blue-500 hover:bg-blue-600 scale-100 active:scale-95 transition duration-300"
          >
            Details
          </Button>
        );
      },
      header: "",
    }),
  ];

  return (
    <section className="p-6">
      <h1 className="font-semibold text-2xl mb-4">All Transactions</h1>

      <Table columns={columns} data={orders}></Table>

      <TxnDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
      ></TxnDetailsModal>
    </section>
  );
};

export default AllTransactions;
