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
      ? " h-5 w-7 bg-[#2E8DD8] text-white rounded-sm shadow-[#2e8ed893] shadow-md active:scale-90 scale-100 duration-200 absolute -top-9 right-[195px] flex items-center justify-center text-xl"
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
