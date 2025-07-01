import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const ProductAndCategory = () => {
  const menuItems = [
    { label: "All Products Overview", address: "" },
    { label: "Approve New Products", address: "approve-new-products" },
    { label: "Categories & Subcategories", address: "categories-and-subcategories" },
    // { label: "Add/Edit/Delete Products", address: "add-edit-delete-products" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default ProductAndCategory;