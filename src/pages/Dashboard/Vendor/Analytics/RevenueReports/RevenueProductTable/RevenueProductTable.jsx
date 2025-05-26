import Table from "@/components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import PropTypes from "prop-types";

const RevenueProductTable = ({ orders }) => {
  const columnHelper = createColumnHelper();

  const productMap = {};
  // Group products and calculate stats
  orders.forEach((order) => {
    order.products.forEach((product) => {
      const id = product.id;
      const quantity = Number(product.quantity);
      const price = Number(product.price);
      const discounted_price = Number(product.discounted_price);
      const cost_price = Number(product.cost_price);

      const revenue = (discounted_price || price) * quantity;
      const profit = revenue - cost_price * quantity;
      const profitMargin = ((profit / revenue) * 100).toFixed(2);

      if (!productMap[id]) {
        productMap[id] = {
          id,
          name: product.name,
          image: product.image,
          profitMargin,
          unitsSold: 0,
          totalRevenue: 0,
        };
      }

      productMap[id].unitsSold += quantity;
      productMap[id].totalRevenue += revenue;
    });
  });

  const products = Object.values(productMap);
  const topProducts = [...products].sort(
    (a, b) => b.totalRevenue - a.totalRevenue
  );

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

  return <Table columns={columns} data={topProducts}></Table>;
};

RevenueProductTable.propTypes = {
  orders: PropTypes.array,
};

export default RevenueProductTable;
