import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* sidebar */}
      <div className="">
        <Sidebar></Sidebar>
      </div>

      {/* outlet */}
      <div className="flex-1 ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
