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

const TopPerformVendor = ({ topPerformVendors }) => {
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Performing Vendor by Sales",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const vendor = topPerformVendors[index];
            const sale = Number(vendor.totalSale).toLocaleString();
            const commission = Number(vendor.commission).toLocaleString();
            return [`Sales: $${sale}`, `Commission: $${commission}`];
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
    labels: topPerformVendors.map((info) => info.name),
    datasets: [
      {
        label: "Sales",
        data: topPerformVendors.map((info) => info.totalSale),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(102, 255, 204, 0.6)",
          "rgba(255, 102, 0, 0.5)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 102, 255, 0.6)",
          "rgba(83, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

TopPerformVendor.propTypes = {
  topPerformVendors: PropTypes.array,
};

export default TopPerformVendor;
