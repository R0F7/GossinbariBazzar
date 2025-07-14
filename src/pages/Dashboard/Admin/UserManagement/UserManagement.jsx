import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const UserManagement = () => {
  const menuItems = [
    { label: "All Customers", address: "" },
    { label: "All Vendors", address: "view-all-vendor" },
    { label: "Verify Vendors", address: "vendor-verification" },
    { label: "Manage Roles & Permissions", address: "roles-permissions" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default UserManagement;