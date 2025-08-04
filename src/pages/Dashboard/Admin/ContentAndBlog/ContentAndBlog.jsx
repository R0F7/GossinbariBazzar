import NestedSidebarLayout from "@/components/Dashboard/NestedSidebar/NestedSidebarLayout";

const ContentAndBlog = () => {
  const menuItems = [
    { label: "All Blog Posts", address: "" },
    { label: "Vendor Blog Approval", address: "vendor-blog-approval" },
    // { label: "Tags & Categories", address: "tags-categories" },
  ];
  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default ContentAndBlog;
