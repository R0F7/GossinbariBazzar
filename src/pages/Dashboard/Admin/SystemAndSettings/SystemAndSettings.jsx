import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const SystemAndSettings = () => {
  const menuItems = [
    { label: "Site Settings", address: "" },
    { label: "Notification Settings", address: "notification-settings" },
    { label: "SEO & Meta Info", address: "SEO-&-meta-info" },
    { label: "Maintenance Mode Toggle", address: "maintenance-mode-toggle" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default SystemAndSettings;
