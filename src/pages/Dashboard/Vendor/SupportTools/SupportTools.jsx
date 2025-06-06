import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const SupportTools = () => {
      const menuItems = [
          { label: "Vendor Guidelines", address: "" },
          { label: "Help & Support", address: `help-and-support/vendor` },
          { label: "Notifications", address: "notifications" },
        ];
  
      return <NestedSidebarLayout menuItems={menuItems}></NestedSidebarLayout>
};

export default SupportTools;