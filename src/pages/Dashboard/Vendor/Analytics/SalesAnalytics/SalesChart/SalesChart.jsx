import { useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const SalesChart = ({ orders, groupBy, dateRange, chartType, dataQty }) => {
  const { startDate, endDate } = dateRange;

  const chartData = useMemo(() => {
    if (!orders) return { labels: [], datasets: [] };

    const grouped = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      if (startDate && date < startDate) return;
      if (endDate && date > endDate) return;

      let key = "";

      if (groupBy === "daily") {
        key = date.toISOString().split("T")[0];
      } else if (groupBy === "weekly") {
        const firstJan = new Date(date.getFullYear(), 0, 1);
        const weekNo = Math.ceil(
          ((date - firstJan) / 86400000 + firstJan.getDay() + 1) / 7
        );
        key = `Week ${weekNo} (${date.getFullYear()})`;
      } else if (groupBy === "monthly") {
        const month = date.toLocaleString("default", { month: "short" });
        key = `${month} ${date.getFullYear()}`;
      } else if (groupBy === "yearly") {
        key = `${date.getFullYear()}`;
      }

      grouped[key] = (grouped[key] || 0) + order.total_price;
    });

    let labels = Object.keys(grouped).sort((a, b) => {
      if (groupBy === "daily") return new Date(a) - new Date(b);
      if (groupBy === "monthly") return new Date("1 " + a) - new Date("1 " + b);
      return a.localeCompare(b);
    });

    let data = labels.map((label) => grouped[label]);

    // fake data generator
    // for (let index = 0; index < 100; index++) {
    //   labels.push(`2025-05-${index <= 9 ? `0${index}` : index}`);
    //   data.push(Math.floor(Math.random() * 10000) + 1);
    // }

    if (data.length >= dataQty) {
      data = data.slice(-dataQty);
      labels = labels.slice(-dataQty);
    }
    // console.log(data.length);

    return {
      labels,
      datasets: [
        {
          label: "Sales Amount ($)",
          data,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          fill: chartType === "line",
          tension: 0.4,
        },
      ],
    };
  }, [orders, dataQty, chartType, startDate, endDate, groupBy]);

  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <div className="w-full bg-white p-2.5 rounded shadow">
      <ChartComponent
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: "$ Sales Amount",
              },
            },
            x: {
              title: {
                display: true,
                text:
                  groupBy === "daily"
                    ? "Day"
                    : groupBy === "weekly"
                    ? "Week"
                    : groupBy === "monthly"
                    ? "Month"
                    : "Year",
              },
            },
          },
        }}
      />
    </div>
  );
};

SalesChart.propTypes = {
  orders: PropTypes.array,
  groupBy: PropTypes.string,
  dateRange: PropTypes.object,
  chartType: PropTypes.string,
  dataQty: PropTypes.number,
};

export default SalesChart;
