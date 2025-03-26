import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const Analytics = () => {
  const menuItems = [
    { label: "Sales Analytics", address: "" },
    { label: "Revenue Reports", address: "revenue-reports" },
    { label: "Bestselling Products", address: "bestselling-products" },
  ];

  return <NestedSidebarLayout menuItems={menuItems}></NestedSidebarLayout>;
};

export default Analytics;
