import NestedSidebarLayout from "../../../components/Dashboard/NestedSidebar/NestedSidebarLayout";

const Support = () => {
    const menuItems = [
        { label: "Payment History", address: "" },
        { label: "Notifications", address: "notifications" },
      ];
    
      return <NestedSidebarLayout menuItems={menuItems} />;
};

export default Support;