import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const TransactionAndPayment = () => {
  const menuItems = [
    { label: "View All Transactions", address: "" },
    { label: "Vendor Payment History", address: "vendor-payment-history" },
    { label: "Customer Refund Logs", address: "customer-refund-logs" },
    { label: "Commission Reports", address: "commission-reports" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default TransactionAndPayment;