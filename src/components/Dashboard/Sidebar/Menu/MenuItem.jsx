import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MenuItem = ({ address, icon: Icon, label }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `text-white order-l-4 order-transparent flex items-center gap-2 px-6 py-2.5 mr-2 mb-0.5 rounded-r-md hover:bg-[rgba(255,255,255,0.28)] hover:border-l-4 hover:border-white transition duration-300 ${isActive ? "bg-[rgba(255,255,255,0.28)] border-l-4" : "bg-transparent border-transparent"}`
      }
    >
      <i>
        <Icon className="w-6 h-6" />
      </i>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
