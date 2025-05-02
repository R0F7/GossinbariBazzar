import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const ManageInventory = () => {
  const { user } = useAuth();
  const data = useGetSecureData(
    "vendor_products",
    `/vendor-products/${user?.email}`
  );
  const columnHelper = createColumnHelper();
  // console.log(data);

  const columns = [
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          className="w-[80px] h-[50px] rounded-md"
          src={info.getValue()}
          alt=""
        />
      ),
      header: "",
    }),

    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Product Name",
    }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("total_product", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Stock Quantity",
    }),

    columnHelper.accessor((row) => row.discounted_price, {
      id: "price",
      cell: (info) => {
        const discounted = info.getValue();
        const original = info.row.original.price;
        if (discounted > 0) return <span>{discounted}</span>;
        return <span>{original}</span>;
      },
      header: "Price",
    }),

    columnHelper.accessor((row) => row.total_product, {
      id: "stock_status",
      cell: (info) => (
        <span>{info.getValue() >= 1 ? "In Stock" : "Out of Stock"}</span>
      ),
      header: "Status",
    }),

    columnHelper.accessor("_id", {
      cell: (id) => (
        <Link
          to={`/dashboard/product-management/update-product/${id.getValue()}`}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            Update Product
          </button>
        </Link>
      ),
      header: "",
    }),
  ];

  return (
    <section className="p-8">
      {/* <h1 className="font-semibold text-4xl mb-8">Manage Inventory</h1> */}
      {/* ManageInventory */}
      <Table columns={columns} data={data}></Table>
    </section>
  );
};

export default ManageInventory;
