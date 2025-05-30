import Table from "@/components/Table/Table";
// import useAuth from "@/hooks/useAuth";
import { createColumnHelper } from "@tanstack/react-table";
import PropTypes from "prop-types";
// import { useState } from "react";
import { Link } from "react-router-dom";

const RevenueProductTable = ({ orders, bestsellingProduct, items = [] }) => {
  const columnHelper = createColumnHelper();
  // const { sub_category, setSub_category } = useAuth();
  const productMap = {};

  orders.forEach((order) => {
    order.products.forEach((product) => {
      let findProduct = null;

      const id = product.id;
      const quantity = Number(product.quantity);
      const price = Number(product.price);
      const discounted_price = Number(product.discounted_price);
      const cost_price = Number(product.cost_price);

      const revenue = (discounted_price || price) * quantity;
      const profit = revenue - cost_price * quantity;
      const profitMargin = ((profit / revenue) * 100).toFixed(2);

      // if (bestsellingProduct) {
      //   findProduct = items.find((item) => item._id == id);
      //   if (!sub_category.includes(findProduct.sub_category)) {
      //     setSub_category([...sub_category, findProduct.sub_category]);
      //   }
      // }

      if (!productMap[id]) {
        productMap[id] = {
          id,
          name: product.name,
          image: product.image,
          category: product.category,
          profitMargin,
          unitsSold: 0,
          totalRevenue: 0,
          rating: findProduct?.rating,
          total_product: findProduct?.total_product,
        };
      }

      productMap[id].unitsSold += quantity;
      productMap[id].totalRevenue += revenue;
    });
  });

  const products = Object.values(productMap);
  // console.log(products);
  let topProducts = null;

  if (bestsellingProduct) {
    topProducts = [...products].sort((a, b) => b.unitsSold - a.unitsSold);
  } else {
    topProducts = [...products].sort((a, b) => b.totalRevenue - a.totalRevenue);
  }

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-4">
            <img
              src={row.image}
              alt={row.name}
              className="w-12 h-10 object-cover rounded"
            />
            <span className="font-medium">{row.name}</span>
          </div>
        );
      },
      header: "Product",
    }),

    columnHelper.accessor("unitsSold", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Units Sold",
    }),

    columnHelper.accessor("totalRevenue", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Revenue",
    }),

    columnHelper.accessor("profitMargin", {
      cell: (info) => <span>{info.getValue()}%</span>,
      header: "Profit Margin",
    }),
  ];

  if (bestsellingProduct) {
    columns.splice(
      1,
      0,
      columnHelper.accessor("category", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Category",
      })
    );
    columns.push(
      columnHelper.accessor("rating", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "rating",
      }),
      columnHelper.accessor("total_product", {
        cell: (info) => {
          const value = info.getValue();

          if (value > 10) {
            return <span>In Stock</span>;
          } else if (value && value < 10) {
            return <span>Low Stock</span>;
          } else {
            return <span>Out of Stock</span>;
          }
        },
        header: "Stock status",
      }),
      columnHelper.accessor("id", {
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
      })
    );
  }

  return <Table columns={columns} data={topProducts}></Table>;
};

RevenueProductTable.propTypes = {
  orders: PropTypes.array,
  bestsellingProduct: PropTypes.bool,
  items: PropTypes.array,
};

export default RevenueProductTable;
