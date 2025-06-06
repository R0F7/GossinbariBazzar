import PropTypes from "prop-types";

const GuidelineCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-700 mb-2">
      {icon} {title}
    </h2>
    <div className="text-gray-700 text-sm space-y-1">{children}</div>
  </div>
);

GuidelineCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default GuidelineCard;
