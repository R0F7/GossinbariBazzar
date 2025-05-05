import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { TbFileInvoice } from "react-icons/tb";
import ReceivedOrderDetails from "./ReceivedOrderDetails/ReceivedOrderDetails";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const OrdersReceived = () => {
  const { user } = useAuth();
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();

  const { data: ordersData, refetch } = useGetSecureData(
    "order_data_for_order_received",
    `/orders-receive/${user?.email}`
  );
  // console.log(ordersData)

  const { mutateAsync: update_vendor_status } = useMutation({
    mutationFn: async ({ row, vendor_status }) => {
      const { data } = await axiosSecure.patch(
        `/order_update_vendor_status/${row._id}`,
        { vendor_status }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("status updated");
      refetch();
    },
  });

  const columns = [
    columnHelper.accessor("orderID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order ID",
    }),

    columnHelper.accessor("order_owner_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Customer Name",
    }),

    // products
    // {
    //   header: "Products",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div className="space-y-2">
    //         {products.map((p, idx) => (
    //           <div key={idx} className="flex items-center gap-2">
    //             <img src={p.image} alt={p.name} className="w-8 h-8 rounded" />
    //             <span>{p.name}</span>
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    // unit
    // {
    //   header: "Unit",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div>
    //         {products.map((p, idx) => (
    //           <h6 key={idx}>{p.unit}</h6>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    // Quantities
    // {
    //   header: "Quantities",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div>
    //         {products.map((p, idx) => (
    //           <h6 key={idx}>{p.quantity}</h6>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    // Price
    // {
    //   header: "Price",
    //   cell: (info) => {
    //     const products = info.row.original.products || [];
    //     return (
    //       <div>
    //         {products.map((p, idx) => (
    //           <h6 key={idx}>${p.price}</h6>
    //         ))}
    //       </div>
    //     );
    //   },
    // },

    columnHelper.accessor("total_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total Price",
    }),

    columnHelper.accessor("paymentInfo.paymentStatus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Payment Status",
    }),

    columnHelper.accessor("shippingDetails", {
      id: "deliveryAddress",
      header: "Delivery Address",
      cell: (info) => {
        const { village, union } = info.getValue();
        return (
          <span>
            {village},<br /> {union}
          </span>
        );
      },
    }),

    // {
    //   accessorFn: (row) =>
    //     `${row.shippingDetails.village}, ${row.shippingDetails.union}`,
    //   id: "deliveryAddress",
    //   header: "Delivery Address",
    //   cell: (info) => <span>{info.getValue()}</span>,
    // },

    columnHelper.accessor("delivery.category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Delivery",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Date",
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        let currentStatus = info.getValue();
        const row = info.row.original;
        // console.log(row);

        const vendorStatusArray = row.vendor_status || [];

        const matchedVendor = vendorStatusArray.find(
          (v) => v.email === user.email
        );

        const status = matchedVendor ? matchedVendor.status : currentStatus;

        const handleChange = async (e) => {
          const newStatus = e.target.value;
          currentStatus = newStatus;

          const vendor_status = {
            email: user.email,
            status: newStatus,
          };

          try {
            await update_vendor_status({ row, vendor_status });
            // console.log("Status updated");
          } catch (error) {
            console.error("Failed to update status", error);
          }
        };

        return (
          <select
            defaultValue={status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Processing">Processing</option>
            {/* <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option> */}
          </select>
        );
      },
    }),

    columnHelper.accessor("_id", {
      id: "productsColumn",
      header: "Details",
      cell: (info) => {
        const products = info.row.original.products;
        return <ReceivedOrderDetails products={products} />;
      },
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

  return (
    <section className="p-8">
      <Table data={ordersData} columns={columns}></Table>
    </section>
  );
};

export default OrdersReceived;
