import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { BiCalendar } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ReviewInfoModal from "./ReviewInfoModal/ReviewInfoModal";
import ContactModal from "./ContactModal/ContactModal";
import { RiContactsFill, RiContactsLine } from "react-icons/ri";
import React from "react";
import { IoMdCopy } from "react-icons/io";

const ReturnsDisputes = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [returnInfo, setReturnInfo] = useState({});
  const { user } = useAuth();
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();

  let times = {};
  if (startDate && endDate) times = { startDate, endDate };

  const { data: order_collection, refetch } = useGetSecureData(
    "returns-order-data",
    `/orders-receive/${user?.email}?startDate=${times.startDate}&endDate=${times.endDate}&search=${searchTerm}`
  );

  // console.log(data);
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
  // console.log(allReturns);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

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
            </select>
            <div className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 text-gray-500">
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
    <section className="px-8 pt-5">
      <h1 className="font-semibold text-4xl mb-8">Returns & Disputes</h1>

      {/* query part */}
      <div className="flex justify-between mb-6 border-b pb-4">
        <div className="relative">
          <input
            type="search"
            name="search"
            id="search"
            className="peer border border-[#0DAFD8] text-[#0DAFD8] font-medium outline-[#0DAFD8] shadow-sm w-[452px] pl-9 py-2.5 rounded-full"
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => {
              if (e.target.value === "") setIsFocus(false);
            }}
            onChange={(e) => handleSearch(e)}
          />
          <IoSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-[#0DAFD8] pointer-events-none" />
          <span
            className={`absolute top-3 left-10 text-gray-600 text-xs transition-all duration-300 ${
              isFocus && "-mt-5 ml-[225px] bg-[#0DAFD8] text-white"
            } px-1.5 py-0.5 rounded-md pointer-events-none`}
          >
            Search by Order ID 
            {/* or Request ID */}
          </span>
        </div>

        <div className="flex items-center mr-10 gap-3">
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(new Date(date).toISOString())}
              placeholderText="Select Start Date"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              className="border border-[#0DAFD8] text-[#0DAFD8] font-medium outline-[#0DAFD8] shadow-sm w-[152px] pl-9 py-1.5 rounded-full placeholder:text-sm placeholder:text-[#333842] placeholder:font-normal"
            />
            <BiCalendar className="absolute top-[11px] left-3.5 text-[#0DAFD8]" />{" "}
          </div>
          <span className="font-semibold text-[#333842]">To</span>
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(new Date(date).toISOString())}
              placeholderText="Select End Date"
              dateFormat="yyyy-MM-dd"
              minDate={startDate}
              disabled={!startDate}
              className="border border-[#3885F4] text-[#3885F4] font-medium disabled:border-gray-300 outline-[#3885F4] shadow-sm w-[150px] pl-9 py-1.5 rounded-full placeholder:text-sm placeholder:text-[#333842] disabled:placeholder:text-[#AAB0BA] placeholder:font-normal disabled:cursor-not-allowed"
            />
            <BiCalendar
              className={`absolute top-[11px] left-3.5 ${
                startDate ? "text-[#3885F4]" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* table */}
      <Table columns={columns} data={allReturns}></Table>

      {/* review modal */}
      <ReviewInfoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={returnInfo}
      ></ReviewInfoModal>

      {/* contact modal */}
      {/* <ContactModal isOpen={isOpenX} setIsOpen={setIsOpenX}></ContactModal> */}
    </section>
  );
};

export default ReturnsDisputes;
