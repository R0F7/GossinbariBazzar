import PropTypes from "prop-types";

const CustomToast = ({ message, para, example }) => {
  return (
    <div className="text-center">
      <h4>{message}</h4>
      {para && <p className="text-sm">{para}</p>}
      {example && <p className="text-sm">(e.g., {example})</p>}
    </div>
  );
};

CustomToast.propTypes = {
  message: PropTypes.string,
  para: PropTypes.string,
  example: PropTypes.string,
};

export default CustomToast;
