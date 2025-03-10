import PropTypes from "prop-types";

const CustomToast = ({ message, example }) => {
  return (
    <div className="text-center">
      {message}
      {example && <p className="text-sm">(e.g., {example})</p>}
    </div>
  );
};

CustomToast.propTypes = {
  message: PropTypes.string,
  example: PropTypes.string,
};

export default CustomToast;
