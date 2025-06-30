import Table from "@/components/Table/Table";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import ProductDetailsModal from "./ProductDetailsModal/ProductDetailsModal";
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllProductsOverview = () => {
  const columnHelper = createColumnHelper();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [product, setProduct] = useState({});
  const axiosSecure = useAxiosSecure();

  const { data: all_products, refetch } = useGetSecureData(
    "all-data-for-admin",
    "/products"
  );
  //   console.log(all_products);

  const columns = [
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          className="w-[180px] h-[50px] rounded-md"
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

    columnHelper.accessor("brand_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Brand Name",
    }),

    columnHelper.accessor("vendor_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Vendor Name",
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
        if (discounted > 0) return <span>${discounted}</span>;
        return <span>${original}</span>;
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

    columnHelper.accessor("timestamp", {
      header: "Date Added",
      cell: (info) => {
        const timestamp = info.getValue();
        const formattedDate = timestamp
          ? new Date(timestamp).toLocaleDateString("en-GB")
          : "N/A";
        return <span>{formattedDate}</span>;
      },
    }),

    columnHelper.accessor("_id", {
      id: "Details",
      cell: (info) => {
        const id = info.getValue();
        const find_product = all_products.find((pro) => pro._id === id);

        return (
          <>
            <button
              onClick={() => {
                setIsOpenModal(true), setProduct(find_product);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <TbListDetails />
            </button>
          </>
        );
      },
      header: "",
    }),

    columnHelper.accessor("_id", {
      id: "delete",
      cell: (info) => {
        const id = info.getValue();

        const handleDelete = async () => {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this product from your shop? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove product",
          });

          if (result.isConfirmed) {
            try {
              const response = await axiosSecure.delete(`/product/${id}`);
              if (response.data?.deletedCount > 0) {
                Swal.fire(
                  "Deleted!",
                  "Your product has been deleted.",
                  "success"
                );
                refetch();
              }
            } catch (error) {
              Swal.fire("Error!", "Something went wrong.", error);
            }
          }
        };

        return (
          <button
            onClick={handleDelete}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <RiDeleteBin5Line />
          </button>
        );
      },
      header: "",
    }),
  ];

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 All Products Overview</h1>
      <Table columns={columns} data={all_products}></Table>

      {product && (
        <ProductDetailsModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          product={product}
        ></ProductDetailsModal>
      )}
    </section>
  );
};

export default AllProductsOverview;
