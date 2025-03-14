import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TbFileInvoice } from "react-icons/tb";

const OrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const columnHelper = createColumnHelper();

  const { data: orderDetails = {} } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/order-details/${id}`);
      return data;
    },
  });
  //   console.log(orderDetails);

  const {
    orderID,
    status,
    total_price,
    paymentInfo,
    shippingDetails,
    createdAt,
  } = orderDetails;

  const columns = [
    columnHelper.accessor((row) => ({ name: row.name, image: row.image }), {
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex items-center gap-3">
            <img
              src={value.image}
              className="w-[50px] h-[50px] rounded-md"
              alt=""
            />
            <h4 className="font-semibold">{value.name}</h4>
          </div>
        );
      },
      header: "Product",
    }),
    columnHelper.accessor("unit", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Unit",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Price",
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Quantity",
    }),
    columnHelper.accessor((row) => row.quantity * row.price, {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total",
    }),
    columnHelper.accessor("", {
      cell: () => (
        <button>
          <TbFileInvoice />
        </button>
      ),
      header: "Invoice",
    }),
  ];

  const table = useReactTable({
    data: orderDetails.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  //   flex items-center flex-row-reverse gap-5
  return (
    <section className="g-gradient-to-r rom-[#f8f9fa] o-[#e9ecef] bg-gradient-to-r from-[#141e30] to-[#243b55] h-full px-6 pb-6">
      <div className="">
        <div className="text-center pt-8">
          <h4 className="font-bold text-xl text-gray-300 mb-2.5">
            Visual tracking of the order
          </h4>
          <p className="text-gray-500">
            <span className="">✅ Order Placed</span>
            <span className="text-white"> → </span>{" "}
            <span
              className={`${
                status === "Order Placed" && "text-[] text-pink-300 font-bold"
              }`}
            >
              🕒 Processing
            </span>
            <span className="text-white"> → </span>{" "}
            <span className={`${status === "" && "text-[] font-bold"}`}>
              📦 Shipped
            </span>
            <span className="text-white"> → </span>{" "}
            <span className={`${status === "" && "text-[] font-bold"}`}>
              🚚 Out for Delivery
            </span>
            <span className="text-white"> → </span>{" "}
            <span className={`${status === "" && "text-[] font-bold"}`}>
              ✅ Delivered
            </span>
          </p>
        </div>
        <div className="flex justify-center pt-10">
          <table className="w-full text-left border-collapse border-[#3b4a6b]">
            <thead className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="bg-[#1f2a40] text-white border-b border-[#3b4a6b] font-bold py-2.5 pl-5 first:rounded-tl-md last:rounded-tr-md"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, x) => (
                <tr
                  key={row.id}
                  className={`${
                    x % 2 === 0 ? "bg-[#1c2738]" : "bg-[#2a3b55]"
                  } hover:bg-[#3e536f] hver:font-semibold transition duration-300`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-[#dcdcdc] border-b border-[#3b4a6b] py-2.5 pl-5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#1f2a40] border-t border-[#3b4a6b] h-10 rounded-b-md">
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
        </div>

        <div className="flex w-full mt-10 gap-4">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-300">
              🛒 Order Summary
            </h2>
            <table className="border border-collapse text-left w-[600px]">
              <tr className="bg-gray-200 text-gray-900 font-semibold">
                <th className="pl-2.5 py-1.5">Order Details </th>{" "}
                <th>Information</th>
              </tr>
              <tr className="text-gray-300 font-semibold border-b">
                <td className="pl-2.5 py-1.5">📌 Order ID:</td>{" "}
                <td>{orderID}</td>
              </tr>
              <tr className="text-gray-300 font-semibold border-b">
                <td className="pl-2.5 py-1.5">📆 Order Date</td>{" "}
                <td>
                  {" "}
                  {new Date(createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
              <tr className="text-gray-300 font-semibold border-b">
                <td className="pl-2.5 py-1.5">🚚 Status</td> <td>{status}</td>
              </tr>
              <tr className="text-gray-300 font-semibold border-b">
                <td className="pl-2.5 py-1.5">💳 Payment Method</td>{" "}
                <td>{paymentInfo?.paymentMethod}</td>
              </tr>
              <tr className="text-gray-300 font-semibold border-b">
                <td className="pl-2.5 py-1.5">💰 Total Amount</td>{" "}
                <td>${total_price}</td>
              </tr>
              <tr className="text-gray-300 font-semibold border-b">
                <td className="pl-2.5 py-1.5">📍 Shipping Address</td>{" "}
                <td>
                  {shippingDetails?.village}, {shippingDetails?.union}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
