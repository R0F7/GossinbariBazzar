import { MdOutlineAccountTree, MdOutlineSupportAgent } from "react-icons/md";
import MenuItem from "../MenuItem";
import { CiMemoPad } from "react-icons/ci";
import {
  TbBrandGoogleAnalytics,
  TbDeviceAnalytics,
  TbTransactionDollar,
} from "react-icons/tb";
import { VscTools } from "react-icons/vsc";
import { FaTags, FaUsersCog } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { GrSystem } from "react-icons/gr";

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
        label={"Txn & payment"}
        icon={TbTransactionDollar}
      ></MenuItem>
      <MenuItem
        address={"analytics-and-insights"}
        label={"Analytics & Insights"}
        icon={TbBrandGoogleAnalytics}
      ></MenuItem>

      <MenuItem
        address={"content-and-blog"}
        label={"Content & Blog"}
        icon={ImBlog}
      ></MenuItem>

      <MenuItem
        address={"communication-and-support"}
        label={"Help Desk"}
        icon={MdOutlineSupportAgent}
      ></MenuItem>

      <MenuItem
        address={"system-settings"}
        label={"System & Settings"}
        icon={GrSystem}
      ></MenuItem>
    </>
  );
};

export default AdminMenu;
