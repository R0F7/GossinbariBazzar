import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const CommunicationAndSupport = () => {
  const menuItems = [
    { label: "Contact Messages", address: "" },
    { label: "Vendor Support Tickets", address: "vendor-support-tickets" },
    { label: "Customer Complaints", address: "customer-complaints" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default CommunicationAndSupport;
