import { Pie, Bar, Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const SalesByCategoryChart = ({ orders, chartType, dateRange = {}, admin }) => {
  const { startDate, endDate } = dateRange;

  const allProducts = orders?.flatMap((order) => order.products) || [];

  const categorySalesMap = {};

  allProducts.forEach((product) => {
    const date = new Date(product.timestamp);

    if (startDate && date < startDate) return;
    if (endDate && date > endDate) return;

    const { category, price, quantity } = product;
    // if (!category) return;

    const saleAmount = Number(price) * Number(quantity);
    categorySalesMap[category] = (categorySalesMap[category] || 0) + saleAmount;
  });

  const labels = Object.keys(categorySalesMap);
  const salesData = Object.values(categorySalesMap);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales by Category",
        data: salesData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(83, 102, 255, 0.6)",
          "rgba(255, 102, 255, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 102, 0, 0.5)",
          "rgba(102, 255, 204, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(255, 102, 255, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 102, 0, 1)",
          "rgba(102, 255, 204, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const ChartComponent = chartType === "bar" ? Bar : Pie;

  return (
    <div
      className={`w-full flex justify-center bg-white rounded py-2.5 shadow ${
        admin ? "h-[600px]" : "h-[300px]"
      } mx-auto`}
    >
      {labels.length > 0 ? (
        <ChartComponent data={chartData} options={chartOptions} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mb-2 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m16 0v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6M3 21h18"
            />
          </svg>
          <p className="text-sm">No product data available</p>
        </div>
      )}
    </div>
  );
};

SalesByCategoryChart.propTypes = {
  orders: PropTypes.array,
  chartType: PropTypes.oneOf(["pie", "bar"]),
  dateRange: PropTypes.object,
  admin: PropTypes.bool,
};

export default SalesByCategoryChart;
