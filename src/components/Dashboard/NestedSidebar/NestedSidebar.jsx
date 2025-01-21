import PropTypes from "prop-types";

const NestedSidebar = ({ children }) => {
  return (
    <div className="border min-h-screen bg-[#e2e8f0c4] fixed">
      <div className="w-64 min-h-screen border-t border-gray-300 text-slate-600 mt-7">
        {children}
      </div>
    </div>
  );
};

NestedSidebar.propTypes = {
  children: PropTypes.any,
};

export default NestedSidebar;
