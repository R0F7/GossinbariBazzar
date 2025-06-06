import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { MdBarChart } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyRevenueChart = ({ revenue ={} }) => {
  const { lastRevenue, currentRevenue, growthPercentage } = revenue;

  const data = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Previous Month",
        data: [lastRevenue],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Current Month",
        data: [currentRevenue],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "Monthly Revenue Comparison",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MdBarChart className="text-blue-500" /> Monthly Revenue
        </h2>
        <div className="text-lg text-center">
          Growth:{" "}
          <span
            className={
              growthPercentage >= 0 ? "text-green-700" : "text-red-700"
            }
          >
            {growthPercentage}% {growthPercentage >= 0 ? "▲" : "▼"}
          </span>
        </div>
      </div>

      <Bar options={options} data={data} />
    </div>
  );
};

MonthlyRevenueChart.propTypes = {
  revenue: PropTypes.any,
};

export default MonthlyRevenueChart;
