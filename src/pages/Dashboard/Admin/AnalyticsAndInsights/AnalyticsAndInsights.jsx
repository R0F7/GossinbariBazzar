import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const AnalyticsAndInsights = () => {
  const menuItems = [
    { label: "Growth Stats", address: "" },
    { label: "Sales Performance", address: "sales-performance" },
    { label: "Traffic & Engagement", address: "traffic-and-engagement" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default AnalyticsAndInsights;