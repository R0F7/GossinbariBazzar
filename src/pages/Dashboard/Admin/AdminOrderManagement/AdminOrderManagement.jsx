import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const AdminOrderManagement = () => {
  const menuItems = [
    { label: "All Orders", address: "" },
    { label: "Returns & Refunds", address: "return-and-refund" },
    { label: "Track Orders", address: "track-orders" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default AdminOrderManagement;