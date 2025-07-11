import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import ReviewInfoModal from "@/pages/Dashboard/Vendor/OrderManagement/ReturnsDisputes/ReviewInfoModal/ReviewInfoModal";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";

const CustomerRefundLogs = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [returnInfo, setReturnInfo] = useState({});

  const { data: returns, refetch } = useGetSecureData(
    "return-order",
    `/return-orders`
  );
  //   console.log(returns);

  const { mutateAsync: refundPayment } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/refund", {
        info,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Refund Payment Successful");
      refetch();
    },
  });

  const columns = [
    columnHelper.accessor("requestID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Request ID",
    }),

    columnHelper.accessor("orderID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order ID",
    }),

    columnHelper.accessor("order_owner_info", {
      cell: (info) => {
        const value = info.getValue();
        return (
          <span>
            {value.name} <br /> {value.email}
          </span>
        );
      },
      header: "Customer Info",
    }),

    // columnHelper.accessor("reason", {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: "Reason",
    // }),

    columnHelper.accessor("requestedOn", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Requested On",
    }),

    columnHelper.accessor("productSummery", {
      cell: (info) => {
        const value = info.getValue();
        const amount = value.price * value.quantity;
        return <span>${amount}</span>;
      },
      header: "Amount",
    }),

    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),

    columnHelper.accessor("paymentStatus", {
      cell: (info) => <span>{info.getValue() || "Unpaid"}</span>,
      header: "Payment Status",
    }),

    columnHelper.accessor("", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <button
            onClick={() => {
              setIsOpen(true), setReturnInfo(row);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Details
          </button>
        );
      },
      id: "review",
    }),

    // columnHelper.accessor("", {
    //   cell: (info) => {
    //     const row = info.row.original;
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const [isOpen, setIsOpen] = React.useState(false);

    //     return (
    //       <>
    //         <button
    //           onClick={() => setIsOpen(!isOpen)}
    //           className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
    //         >
    //           {isOpen ? <RiContactsFill /> : <RiContactsLine />}
    //         </button>
    //         <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} data={row} />
    //       </>
    //     );
    //   },
    //   id: "Contact Customer",
    // }),

    columnHelper.accessor("orderID", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <Button
            onClick={() => handleRefundPayment(row)}
            className="bg-blue-500 hover:bg-blue-600 scale-100 active:scale-95 transition duration-300"
            disabled={row.paymentStatus === "Paid"}
          >
            Pay
          </Button>
        );
      },
      id: "payment",
      header: "",
    }),
  ];

  const handleRefundPayment = async (row) => {
    const { requestID, orderID, productSummery, paymentInfo, status } = row;
    const amount = productSummery.price * productSummery.quantity;
    const transactionId = paymentInfo.transactionId;

    const info = { requestID, orderID, amount, transactionId, status };

    await refundPayment(info);
  };

  return (
    <section className="px-8 py-5">
      <h1 className="font-semibold text-2xl mb-4">Customer Refund Logs</h1>

      <Table columns={columns} data={returns}></Table>

      {/* review modal */}
      <ReviewInfoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={returnInfo}
      ></ReviewInfoModal>
    </section>
  );
};

export default CustomerRefundLogs;