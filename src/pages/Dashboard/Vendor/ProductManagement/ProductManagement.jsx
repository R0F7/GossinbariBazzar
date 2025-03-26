import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const ProductManagement = () => {
  const menuItems = [
    { label: "Add New Products", address: "" },
    { label: "Manage Inventory", address: "manage-inventory" },
    { label: "View Product Reviews", address: "view-product-reviews" },
  ];

  return <NestedSidebarLayout menuItems={menuItems}></NestedSidebarLayout>;
};

export default ProductManagement;
