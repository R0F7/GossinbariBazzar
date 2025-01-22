import NestedSidebarLayout from "../../../components/Dashboard/NestedSidebar/NestedSidebarLayout";

const Payment = () => {
    const menuItems = [
        { label: "Payment History", address: "" },
        { label: "Invoices", address: "invoices" },
      ];
    
      return <NestedSidebarLayout menuItems={menuItems} />;
};

export default Payment;