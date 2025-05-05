import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const ViewProductReviews = () => {
  const { user } = useAuth();
  const { data: products } = useGetSecureData(
    "vendor_products",
    `/vendor-products/${user?.email}`
  );
  const { data: reviewsCollections } = useGetSecureData(
    "get reviews",
    `/reviews`
  );

  const data = products.map((product) => {
    const productReviews = reviewsCollections.filter(
      (review) => review.product_id === product._id
    );

    const totalRatings = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating = totalRatings / productReviews.length || 0;
    return {
      ...product,
      reviews: productReviews,
      averageRating,
    };
  });

  const columnHelper = createColumnHelper();

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

    columnHelper.accessor("reviews", {
      cell: (info) => <span>{info.getValue().length}</span>,
      header: "Total Reviews",
    }),

    columnHelper.accessor("averageRating", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Total Rating",
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
          to={`/dashboard/product-management/view-reviews/${id.getValue()}`}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            View Reviews
          </button>
        </Link>
      ),
      header: "",
    }),
  ];

  return (
    <section className="p-8">
      <Table data={data} columns={columns}></Table>
    </section>
  );
};

export default ViewProductReviews;
