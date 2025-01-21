import { Outlet } from "react-router-dom";
import NestedMenu from "../../../components/Dashboard/Sidebar/Menu/NestedMenu";
import NestedSidebar from "../../../components/Dashboard/NestedSidebar/NestedSidebar";

const MyOrders = () => {
  return (
    <div className="min-h-scree flex">
      <NestedSidebar>
        <NestedMenu label={"Cart"} address={""}></NestedMenu>
        <NestedMenu label={"Order History"} address={"order-history"}></NestedMenu>
        <NestedMenu label={"Wishlist"} address={"wishlist"}></NestedMenu>
      </NestedSidebar>

      {/* outlet */}
      <div className="flex-1 ml-[280px] mr-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MyOrders;
