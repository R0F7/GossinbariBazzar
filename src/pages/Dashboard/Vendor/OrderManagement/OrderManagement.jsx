import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const OrderManagement = () => {
    const menuItems = [
        { label: "Orders Received", address: "" },
        { label: "Shipping Updates", address: "shipping-updates" },
        { label: "Returns/Disputes", address: "returns-disputes" },
      ];

    return <NestedSidebarLayout menuItems={menuItems}></NestedSidebarLayout>
};

export default OrderManagement;