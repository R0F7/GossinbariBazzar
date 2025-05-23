import PropTypes from "prop-types";
import { GrDocumentMissing } from "react-icons/gr";

const getTop3Products = (orders, sortBy) => {
  const productMap = {};

  // Group products and calculate stats
  orders.forEach((order) => {
    order.products.forEach((product) => {
      const id = product.id;
      const quantity = parseInt(product.quantity);
      const price = parseInt(product.price);
      const total = quantity * price;

      if (!productMap[id]) {
        productMap[id] = {
          id,
          name: product.name,
          image: product.image,
          unitsSold: 0,
          totalRevenue: 0,
        };
      }

      productMap[id].unitsSold += quantity;
      productMap[id].totalRevenue += total;
    });
  });

  const products = Object.values(productMap);

  // Sort based on `sortBy` value
  const sorted = [...products];

  if (sortBy === "units") {
    sorted.sort((a, b) => b.unitsSold - a.unitsSold);
  } else if (sortBy === "revenue") {
    sorted.sort((a, b) => b.totalRevenue - a.totalRevenue);
  } else if (sortBy === "score") {
    sorted.sort((a, b) => {
      const scoreA = a.unitsSold * a.totalRevenue;
      const scoreB = b.unitsSold * b.totalRevenue;
      return scoreB - scoreA;
    });
  }

  return sorted.slice(0, 3);
};

const TopProducts = ({ orders, sortBy }) => {
  const top3Products = getTop3Products(orders, sortBy);

  return (
    <div className="bg-white shadow-md rounded-lg">
      {top3Products.length === 0 ? (
        <div className="py-8 pl-4 flex items-center gap-1.5 text-gray-500">
          <GrDocumentMissing className="w-5 h-5" />
          <p className="text-">No product data available.</p>
        </div>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Units Sold</th>
              <th className="px-4 py-2">Total Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {top3Products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="flex items-center gap-4 px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="px-4 py-3">{product.unitsSold}</td>
                <td className="px-4 py-3">{product.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

TopProducts.propTypes = {
  orders: PropTypes.array,
  sortBy: PropTypes.string,
};

export default TopProducts;
