import NestedSidebarLayout from "../../../components/Dashboard/NestedSidebar/NestedSidebarLayout";

const Support = () => {
    const menuItems = [
        { label: "Help & Support", address: "" },
        { label: "Chat Window", address: "chat-window" },
        { label: "Notifications", address: "notifications" },
      ];
    
      return <NestedSidebarLayout menuItems={menuItems} />;
};

export default Support;