import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const UserManagement = () => {
  const menuItems = [
    { label: "View All Customers", address: "" },
    { label: "View All Vendors", address: "view-all-vendor" },
    { label: "Verify / Block Vendors", address: "vendor-verification" },
    { label: "Manage Roles & Permissions", address: "roles-permissions" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default UserManagement;