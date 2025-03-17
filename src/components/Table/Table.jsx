import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import PropTypes from "prop-types";

const Table = ({ columns, data, title }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <section className="bg-gra-900 mb-6 lg:my-12">
      <div className="p-2 w-full lg:max-w-7xl mx-auto">
        <h1 className="font-semibold text-3xl mb-4">{title}</h1>
        <table className="w-full lg:max-w-7xl mx-auto text-left ext-sm">
          <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="capitalize px-3.5 py-2 lg:py-2.5 cursor-pointer text-base select-none first:rounded-tl-md last:rounded-tr-md"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`${
                      idx % 2 === 0 ? "bg-[#F7FAFC]" : "bg-[#E2E8F0]"
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
          <tfoot className="bg-gradient-to-r from-cyan-500 to-blue-500 h-11 rounded-b-md">
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id} className="">
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="first:rounded-bl-md last:rounded-br-md"
                  >
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
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

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  title: PropTypes.string,
};

export default Table;
