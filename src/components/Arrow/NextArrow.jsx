import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";

const NextArrow = ({onClick, isTrue}) => {
  // const { onClick } = props;
  console.log(isTrue);
  
  return (
    <div
    className={
      isTrue
      ? " h-4 w-4 absolute -top-9 right-[220px] rounded-full flex items-center justify-center text-xl"
      : "bg-[#FFFFFF] h-14 w-14 absolute top-1/2 -right-20 transform -translate-y-1/2 rounded-full text-[#212B36] flex items-center justify-center shadow-md text-xl hover:bg-[#2E8DD8] hover:text-white transition duration-500"
    }
      onClick={onClick}
    >
     {isTrue? <IoIosArrowUp /> : <FaAngleRight />}
    </div>
  );
};

export default NextArrow;

NextArrow.propTypes = {
  onClick: PropTypes.func,
  isTrue: PropTypes.bool,
};
