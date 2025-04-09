import Logo from "../../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png";
import { Link } from "react-router-dom";
import MenuItem from "./Menu/MenuItem";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "./Menu/UserMenu/UserMenu";
import useRole from "@/hooks/useRole";
import VendorMenu from "./Menu/VendorMenu/VendorMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  // console.log(role);

  // if (loading || isLoading) return <Spinier></Spinier>;

  return (
    <div className="fixed w-64 min-h-screen flex flex-col justify-between py-6 bg-[#2E8DD8]">
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
          {role === "customer" && <UserMenu />}
          {role === "seller" && <VendorMenu />}
          </nav>
      </div>
      <div>
        <MenuItem
          address={"settings"}
          label={"Settings"}
          icon={IoSettingsOutline}
        ></MenuItem>
        <div
          onClick={logOut}
          className="border mr-2 text-white  border-transparent px-6 py-2.5 pr-2 rounded-r-md hover:bg-[rgba(255,255,255,0.28)] hover:border-l-4 hover:border-l-white transition duration-300"
        >
          <button className="flex items-center gap-2">
            <MdLogout className="w-6 h-6"></MdLogout>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
