import StatCard from "@/components/StatCard/StatCard";
import useGetSecureData from "@/hooks/useGetSecureData";
import { FaUserCheck, FaUsers } from "react-icons/fa";
import { MdOutlineBlock, MdPendingActions } from "react-icons/md";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as tooltip,
  Legend as legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, tooltip, legend);

const UserAndVendorGrowthStats = () => {
  const { data: all_users } = useGetSecureData("all-users", "/users");
  // console.log(all_users);

  const findUsers = (role) => {
    const users = all_users.filter(
      (user) => user.role === role && user.action !== "block"
    );

    const verifyVendor = all_users.filter(
      (user) =>
        user.role === "seller" &&
        user.action !== "block" &&
        user.status === "Verified"
    );

    const unverifiedVendor = all_users.filter(
      (user) => user.status !== "Verified" && user.action !== "block"
    );

    const blockedUsers = all_users.filter((user) => user.action === "block");

    return { users, verifyVendor, unverifiedVendor, blockedUsers };
  };

  const sellerCustomerData = {};
  all_users.forEach((user) => {
    const date = new Date(user.timestamp);
    const monthYear = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!sellerCustomerData[monthYear]) {
      sellerCustomerData[monthYear] = {
        month: monthYear,
        customers: 0,
        vendors: 0,
      };
    }

    if (user.role === "seller") {
      sellerCustomerData[monthYear].vendors++;
    } else if (user.role === "customer") {
      sellerCustomerData[monthYear].customers++;
    }
  });

  const chartData = Object.values(sellerCustomerData).sort((a, b) => {
    return new Date("1 " + a.month) - new Date("1 " + b.month);
  });

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  let newUsers = 0;
  let returningUsers = 0;

  all_users.forEach((user) => {
    const createdAt = new Date(user.timestamp);
    if (createdAt >= oneWeekAgo) {
      newUsers++;
    } else {
      returningUsers++;
    }
  });

  const data = {
    labels: ["New Users", "Returning Users"],
    datasets: [
      {
        label: "Total",
        data: [newUsers, returningUsers],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="p-6">
      {/* Gross Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={FaUsers}
          iconColor="text-purple-500"
          title="Total Registered Users"
          value={findUsers("customer").users.length}
          // info=""
        ></StatCard>

        <StatCard
          icon={FaUserCheck}
          iconColor="text-blue-500"
          title="Total Active Vendors"
          value={findUsers("seller").users.length}
          //   info=""
        ></StatCard>
        {/* 
        <StatCard
          icon={BsPatchCheckFill}
          iconColor="text-green-500"
          title="Verified Vendors"
          value={findUsers().verifyVendor.length}
          //   info=""
        ></StatCard> */}

        <StatCard
          icon={MdPendingActions}
          iconColor="text-yellow-500"
          title="Pending Vendors"
          value={findUsers().unverifiedVendor.length}
          //   info=""
        ></StatCard>

        <StatCard
          icon={MdOutlineBlock}
          iconColor="text-red-500"
          title="Blocked Users"
          value={findUsers().blockedUsers.length}
          //   info=""
        ></StatCard>
      </div>
      {/* charts */}
      <div className="flex justify-between gap-4">
        <div className="w-3/4">
          <h1 className="text-xl font-semibold mb-4">
            📊 Monthly Growth Chart
          </h1>
          <div className="flex items-center h-full">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis
                  allowDecimals={false}
                  // domain={[0, "dataMax + 5"]}
                  // tickCount={6}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#A855F7"
                  name="Customers"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="vendors"
                  stroke="#3B82F6"
                  name="Vendors"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-1/4">
          <h1 className="text-xl font-semibold">⏳ User Retention</h1>
          <div className=" h-full flex justify-center items-center">
            <Pie data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAndVendorGrowthStats;
