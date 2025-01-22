// import { Outlet } from "react-router-dom";
// import NestedMenu from "../../../components/Dashboard/Sidebar/Menu/NestedMenu";
// import NestedSidebar from "../../../components/Dashboard/NestedSidebar/NestedSidebar";

// const MyOrders = () => {
    //   return (
        //     <div className="min-h-scree flex">
//       <NestedSidebar>
//         <NestedMenu label={"Cart"} address={""}></NestedMenu>
//         <NestedMenu label={"Order History"} address={"order-history"}></NestedMenu>
//         <NestedMenu label={"Wishlist"} address={"wishlist"}></NestedMenu>
//       </NestedSidebar>

//       {/* outlet */}
//       <div className="flex-1 ml-[280px] mr-6">
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;


import NestedSidebarLayout from "../../../components/Dashboard/NestedSidebar/NestedSidebarLayout";

const MyOrders = () => {
  const menuItems = [
    { label: "Cart", address: "" },
    { label: "Order History", address: "order-history" },
    { label: "Wishlist", address: "wishlist" },
  ];

  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default MyOrders;
