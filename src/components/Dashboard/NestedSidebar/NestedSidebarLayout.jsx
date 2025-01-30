import { Outlet } from "react-router-dom";
import NestedMenu from "../Sidebar/Menu/NestedMenu";
import NestedSidebar from "./NestedSidebar";
import PropTypes from "prop-types";

const NestedSidebarLayout = ({ menuItems, children, outletAreaStyles }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <NestedSidebar>
        {menuItems.map(({ label, address }, index) => (
          <NestedMenu key={index} label={label} address={address}></NestedMenu>
        ))}
      </NestedSidebar>

      {/* Main Content */}
      <div className={`flex-1 ml-[255px] t-6 r-6 ${outletAreaStyles}`}>
        {children || <Outlet />}
      </div>
    </div>
  );
};

NestedSidebarLayout.propTypes = {
  menuItems: PropTypes.array,
  children: PropTypes.any,
  outletAreaStyles: PropTypes.any,
};

export default NestedSidebarLayout;
