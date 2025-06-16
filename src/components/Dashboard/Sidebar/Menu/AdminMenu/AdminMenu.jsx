import { MdOutlineAccountTree } from "react-icons/md";
import MenuItem from "../MenuItem";
import { CiMemoPad } from "react-icons/ci";
import { TbDeviceAnalytics, TbTransactionDollar } from "react-icons/tb";
import { VscTools } from "react-icons/vsc";
import { FaTags, FaUsersCog } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        address={"my-account"}
        label={"My Account"}
        icon={MdOutlineAccountTree}
      ></MenuItem>

      <MenuItem
        address={"user-management"}
        label={"User Management"}
        icon={FaUsersCog}
      ></MenuItem>

      <MenuItem
        address={"product-and-category"}
        label={"Product & Category"}
        icon={FaTags}
      ></MenuItem>

      <MenuItem
        address={"admin-order-management"}
        label={"Order Management"}
        icon={CiMemoPad}
      ></MenuItem>

      <MenuItem
        address={"transaction-and-payment"}
        label={"Transaction & Payment"}
        icon={TbTransactionDollar}
      ></MenuItem>

      {/* <MenuItem
        address={"support-tools"}
        label={"Support Tools"}
        icon={VscTools}
      ></MenuItem> */}
    </>
  );
};

export default AdminMenu;
