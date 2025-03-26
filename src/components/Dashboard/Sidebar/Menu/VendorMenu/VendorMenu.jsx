import { MdOutlineAccountTree } from "react-icons/md";
import MenuItem from "../MenuItem";
import { AiOutlineProduct } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { TbDeviceAnalytics } from "react-icons/tb";
import { VscTools } from "react-icons/vsc";

const VendorMenu = () => {
  return (
    <>
      <MenuItem
        address={"my-account"}
        label={"My Account"}
        icon={MdOutlineAccountTree}
      ></MenuItem>

      <MenuItem
        address={"product-management"}
        label={"Product Management"}
        icon={AiOutlineProduct}
      ></MenuItem>

      <MenuItem
        address={"order-management"}
        label={"Order Management"}
        icon={CiMemoPad}
      ></MenuItem>

      <MenuItem
        address={"analytics"}
        label={"Analytics"}
        icon={TbDeviceAnalytics}
      ></MenuItem>

      <MenuItem
        address={"support-tools"}
        label={"Support Tools"}
        icon={VscTools}
      ></MenuItem>
    </>
  );
};

export default VendorMenu;
