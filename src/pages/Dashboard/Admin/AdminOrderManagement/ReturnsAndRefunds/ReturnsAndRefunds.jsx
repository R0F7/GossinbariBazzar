import Table from "@/components/Table/Table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import ContactModal from "@/pages/Dashboard/Vendor/OrderManagement/ReturnsDisputes/ContactModal/ContactModal";
import ReviewInfoModal from "@/pages/Dashboard/Vendor/OrderManagement/ReturnsDisputes/ReviewInfoModal/ReviewInfoModal";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiContactsFill, RiContactsLine } from "react-icons/ri";

const ReturnsAndRefunds = () => {
  const axiosSecure = useAxiosSecure();
  const columnHelper = createColumnHelper();
  const [isOpen, setIsOpen] = useState(false);
  const [returnInfo, setReturnInfo] = useState({});
  const { data: order_collection, refetch } = useGetSecureData(
    "returns-order-data-for-admin",
    "/order-for-admin"
  );
  console.log(order_collection);

  const { mutateAsync: update_returns_status } = useMutation({
    mutationFn: async ({ row, newStatus }) => {
      const { data } = await axiosSecure.patch(
        `/update-return-status/${row.requestID}/${row.orderID}`,
        {
          newStatus,
        }
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Status changed!");
    },
  });

  const allReturns = order_collection.flatMap((order) =>
    (order.returns || []).map((info) => ({
      ...info,
      order_owner_info: order?.order_owner_info,
    }))
  );

  const columns = [
    columnHelper.accessor("requestID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Request ID",
    }),

    columnHelper.accessor("orderID", {
      cell: (info) => {
        const value = info.getValue() || "0000000000";

        const handleCopy = () => {
          navigator.clipboard.writeText(value);
          toast.success("Order ID number copied!");
        };

        return (
          <div className="flex items-center gap-1.5">
            <span>{value}</span>
            <span onClick={handleCopy} className="cursor-pointer">
              <IoMdCopy />
            </span>
          </div>
        );
      },
      header: "Order ID",
    }),

    columnHelper.accessor("order_owner_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Customer Name",
    }),

    columnHelper.accessor("reason", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Reason",
    }),

    columnHelper.accessor("requestedOn", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Requested On",
    }),

    columnHelper.accessor("status", {
      cell: (info) => {
        let currentStatus = info.getValue();
        const row = info.row.original;
        // console.log(row);

        const handleChange = async (e) => {
          const newStatus = e.target.value;

          try {
            await update_returns_status({ row, newStatus });
          } catch (error) {
            console.error("Failed to update status", error);
          }
        };

        return (
          <div className="relative w-f">
            <select
              defaultValue={currentStatus}
              onChange={handleChange}
              className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-[100px]"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
        );
      },
      header: "Status",
    }),

    columnHelper.accessor("", {
      cell: (info) => {
        const row = info.row.original;
        // console.log(row);

        return (
          <button
            onClick={() => {
              setIsOpen(true), setReturnInfo(row);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Review
          </button>
        );
      },
      id: "review",
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
      <h1 className="text-2xl font-semibold mb-4">
        🔄 Monitor Return & Refund Requests
      </h1>

      <Table columns={columns} data={allReturns}></Table>

      {/* review modal */}
      <ReviewInfoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={returnInfo}
      ></ReviewInfoModal>
    </section>
  );
};

export default ReturnsAndRefunds;
