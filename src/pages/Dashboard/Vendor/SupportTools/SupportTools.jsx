import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const SupportTools = () => {
  const menuItems = [
    { label: "Chat Window", address: "" },
    { label: "My Tickets", address: "my-tickets" },
    { label: "Vendor Guidelines", address: "vendor-guidelines" },
    { label: "Help & Support", address: `help-and-support/vendor` },
    { label: "Complaints", address: `complaints` },
    { label: "Notifications", address: "notifications" },
  ];

  return <NestedSidebarLayout menuItems={menuItems}></NestedSidebarLayout>;
};

export default SupportTools;
