import Table from "@/components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import PropTypes from "prop-types";

const PayoutHistory = ({ payouts }) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("payoutDate", {
      cell: (info) => {
        const value = info.getValue();
        return <span>{format(new Date(value), "MMM dd, yyyy")}</span>;
      },
      header: "Payout Date",
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Amount",
    }),
    columnHelper.accessor("method", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Method",
    }),
    columnHelper.accessor("transactionId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Transaction Id",
    }),
    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "status",
    }),
    // columnHelper.accessor("note", {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: "Note",
    // }),
  ];

  return (
    <section>
      <Table data={payouts} columns={columns}></Table>
    </section>
  );
};

PayoutHistory.propTypes = {
  payouts: PropTypes.array,
};

export default PayoutHistory;
