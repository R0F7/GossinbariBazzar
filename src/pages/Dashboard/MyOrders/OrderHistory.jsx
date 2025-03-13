import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sortBy, setSortBy] = useState({});
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

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total Price",
    }),

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
          <button
            onClick={() => console.log(id.getValue())}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            View Details
          </button>
        </Link>
      ),
      header: "Actions",
    }),
  ];

  const sortedData = useMemo(() => {
    if (!sortBy.columnId) {
      return orderData;
    }

    const sorted = [...orderData].sort((a, b) => {
      const aValue = a[sortBy.columnId];
      const bValue = b[sortBy.columnId];

      if (aValue === bValue) {
        return 0;
      }

      return sortBy.desc
        ? aValue > bValue
          ? -1
          : 1
        : aValue > bValue
        ? 1
        : -1;
    });

    return sorted;
  }, [orderData, sortBy]);

  const handleSort = (columnId) => {
    setSortBy((prevSortBy) => ({
      columnId,
      desc: prevSortBy.columnId === columnId ? !prevSortBy.desc : false,
    }));
  };

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="pt-4 min-h-[100vh-350px] bg-gra-900 mb-6 lg:my-12">
      <div className="p-2 w-full lg:max-w-7xl mx-auto text-white fill-gray-400">
        <table className="w-full text-left ext-sm">
          <thead className="bg-gradient-to-r from-cyan-500 to-blue-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={() => handleSort(header.id)}
                    className="capitalize px-3.5 py-2 lg:py-2.5 cursor-pointer text-base select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {sortBy.columnId === header.id &&
                      (sortBy.desc ? " 🔽" : " 🔼")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`${
                      i % 2 === 0 ? "bg-[#F7FAFC]" : "bg-[#E2E8F0]"
                    } text-[#1A202C] hover:bg-[#CBD5E0]`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3.5 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        {/* Pagination and page size controls */}
        <div className="flex items-center justify-end text-black mt-2 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="border border-gray-300 px-2.5 py-0.5 disabled:opacity-30 active:scale-90 scale-100 transition duration-300 shadow-sm"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="border border-gray-300 px-2.5 py-0.5 disabled:opacity-30 active:scale-90 scale-100 transition duration-300 shadow-sm"
          >
            {">"}
          </button>
          <span className="flex items-center gap-1 font-semibold">
            <div>Page</div>
            <strong className="font-semibold">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 font-semibold">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 pl-2 rounded w-14 bg-transparent shadow-sm"
            />
          </span>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-9 bg-transparent border px-1.5 font-semibold rounded shadow-sm"
          >
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
