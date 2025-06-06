import PropTypes from "prop-types";
import { GoInfo } from "react-icons/go";
import { Tooltip } from "react-tooltip";

const StatCard = ({ icon: Icon, iconColor, title, value, info }) => {
  const tooltipId = `${title}-tooltip`;

  return (
    <div className="flex items-center gap-3.5 p-4 bg-white rounded-md shadow-md">
      <Icon className={`${iconColor} w-6 h-6`} />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 mb-0.5">{title}</p>
          {info && (
            <>
              <GoInfo
                data-tooltip-id={tooltipId}
                data-tooltip-content={info}
                className="text-gray-500 cursor-pointer"
              />
              <Tooltip id={tooltipId} place="top" />
            </>
          )}
        </div>
        <p className={`text-lg font-semibold ${iconColor}`}>{value}</p>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.func,
  iconColor: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any,
  info: PropTypes.string,
};

export default StatCard;
