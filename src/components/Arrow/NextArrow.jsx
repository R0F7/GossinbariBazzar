import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="bg-[#FFFFFF] h-14 w-14 absolute top-1/2 -right-20 transform -translate-y-1/2 rounded-full text-[#212B36] flex items-center justify-center shadow-md text-xl hover:bg-[#2E8DD8] hover:text-white transition duration-500"
        onClick={onClick}
      >
        <FaAngleRight />
      </div>
    );
  };

  export default NextArrow
  
  NextArrow.propTypes = {
    onClick: PropTypes.func,
  };