import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const NestedMenu = ({ label, address }) => {
  const [toggleIcon, setToggleIcon] = useState(false);

  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center justify-between py-2 px-6 border-b border-gray-300 hover:bg-gray-300 hover:font-medium ${
          isActive ? `${setToggleIcon(true)} bg-gray-300 font-medium` : setToggleIcon(false)
        } transition duration-300`
      }
    >
      <h6>{label}</h6>
      <GrFormNext className={`${toggleIcon ? "block" : "hidden"}`}></GrFormNext>
    </NavLink>
  );
};

NestedMenu.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
};

export default NestedMenu;
