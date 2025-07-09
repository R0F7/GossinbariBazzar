import Table from "@/components/Table/Table";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";

const VendorPaymentHistory = () => {
  const columnHelper = createColumnHelper();
  const { data: vendorPayHistory } = useGetSecureData(
    "vendor-pay-history",
    "/payout"
  );
  // console.log(vendorPayHistory);

  let amount = null;

  const columns = [
    columnHelper.accessor("vendorEmail", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),

    columnHelper.accessor("bankAccount", {
      cell: (info) => {
        const value = info.getValue();
        const last4 = value?.slice(-4);
        const masked = last4 ? `•••• •••• •••• ${last4}` : "N/A";
        return <span>{masked}</span>;
      },
      header: "Bank/Payment Info",
    }),

    columnHelper.accessor("amount", {
      id: "Total Sales",
      cell: (info) => {
        const value = info.getValue();
        amount = (value + value * 0.02).toFixed(2);

        return <span>${amount}</span>;
      },
      header: "Total Sales",
    }),

    columnHelper.accessor("amount", {
      id: "Platform Commission",
      cell: () => <span>${(amount * 0.02).toFixed(2)}</span>,
      header: "Platform Commission",
    }),

    columnHelper.accessor("amount", {
      id: "Payable Amount",
      cell: () => <span>${(amount * 0.98).toFixed(2)}</span>,
      header: "Payable Amount",
    }),

    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Payment Status",
    }),

    columnHelper.accessor("payoutDate", {
      cell: (info) => {
        const formattedDate = new Date(info.getValue());
        return <span>{formattedDate.toLocaleDateString()}</span>;
      },
      header: "Payment Date",
    }),
  ];

  return (
    <section className="px-8 py-5">
      <h1 className="font-semibold text-2xl mb-4">Vendor Payment History</h1>

      <Table columns={columns} data={vendorPayHistory}></Table>
    </section>
  );
};

export default VendorPaymentHistory;
