import NestedSidebarLayout from "../../../components/Dashboard/NestedSidebar/NestedSidebarLayout";

const MyAccount = () => {
  const menuItems = [
    { label: "Profile", address: "" },
    { label: "Saved Address", address: "savedAddress" },
    { label: "Payment Information", address: "paymentInfo" },
    { label: "Settings", address: "settings" },
  ];

  return <NestedSidebarLayout menuItems={menuItems} />;
};

export default MyAccount;
