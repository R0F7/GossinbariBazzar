import Logo from "../../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png";
import { Link } from "react-router-dom";
import MenuItem from "./Menu/MenuItem";
import {
  MdLogout,
  MdOutlineAccountTree,
  MdOutlinePayments,
  MdSupportAgent,
} from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen flex flex-col justify-between py-6">
      <div className="">
        {/* logo */}
        <Link to="/">
          <div className="flex items-center justify-center gap-1 bg-white py-0.5 rounded-md hover:shadow-2xl transition duration-200 mb-6 mx-6">
            <img className="w-10 rop-shadow-2xl" src={Logo} alt="" />
            <h4 className="text-logo-font-family text-[#006400] text-l">
              Gossainbari<span className="text-[#4B0082]">Bazzar</span>
            </h4>
          </div>
        </Link>

        <nav>
          <MenuItem
            address={"/dashboard"}
            label={"My Account"}
            icon={MdOutlineAccountTree}
          ></MenuItem>

          <MenuItem
            address={"my-orders"}
            label={"My Orders"}
            icon={GrNotes}
          ></MenuItem>

          <MenuItem
            address={"payment"}
            label={"Payment"}
            icon={MdOutlinePayments}
          ></MenuItem>

          <MenuItem
            address={"support"}
            label={"Support"}
            icon={MdSupportAgent}
          ></MenuItem>
        </nav>
      </div>
      <div>
        <MenuItem
          address={"settings"}
          label={"Settings"}
          icon={IoSettingsOutline}
        ></MenuItem>
        {/* <button className="text-white order-l-4 order-transparent flex items-center gap-2 px-6 py-2.5 mr-2 mb-0.5 rounded-r-md hover:bg-[rgba(255,255,255,0.28)] hover:border-l-4 hover:border-white transition duration-300 -full">
          <MdLogout className="w-6 h-6"></MdLogout>
          <span>Log out</span>
        </button> */}
        <button className="text-white border-l-4 border-transparent flex items-center gap-2 px-6 py-2.5 pr-2 rounded-r-md hover:bg-[rgba(255,255,255,0.28)] hover:border-l-white transition duration-300 w-full">
          <MdLogout className="w-6 h-6"></MdLogout>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
