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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopPerformanceProducts = ({ topPerformProducts }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Performing Products by Revenue",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `$${Number(value).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return `$${Number(value).toLocaleString()}`;
          },
        },
      },
    },
  };

  const data = {
    labels: topPerformProducts.map((info) => info.name),
    datasets: [
      {
        label: "Revenue",
        data: topPerformProducts.map((info) => info.revenue),
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
      },
    ],
  };
  return (
    <div className="-full">
      <Bar options={options} data={data} />
    </div>
  );
};

TopPerformanceProducts.propTypes = {
  topPerformProducts: PropTypes.array,
};

export default TopPerformanceProducts;
