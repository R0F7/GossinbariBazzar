import { FaAngleLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";

const PrevArrow = ({ onClick, isTrue, isQuickView }) => {
  // console.log(isTrue);
  //  console.log("Prev arrow --> "+typeof onClick === "function");

  return (
    <div
      className={
        isTrue
          ? " h-5 w-7 bg-[#2E8DD8] text-white rounded-sm shadow-[#2e8ed893] shadow-md active:scale-90 scale-100 duration-200 absolute -top-9 left-48 flex items-center justify-center text-xl"
          : isQuickView
          ? "h-5 w-7 bg-[#2E8DD8] text-white rounded-sm shadow-[#2e8ed893] shadow-md active:scale-90 scale-100 duration-200 absolute -top-9 left-[39%] flex items-center justify-center text-xl cursor-pointer hover:rotate-90 hover:-translate-y-[7px]"
          : ` h-14 w-14 absolute top-1/2 -left-20 transform -translate-y-1/2 rounded-full text-[#212B36] flex items-center justify-center shadow-md text-xl hover:bg-[#2E8DD8] hover:text-white transition duration-500 ${
              typeof onClick === "function"
                ? "bg-[#FFFFFF]"
                : "bg-[#2E8DD8] text-white"
            }`
      }
      onClick={onClick}
    >
      {isTrue || isQuickView ? <IoIosArrowDown /> : <FaAngleLeft />}
    </div>
  );
};

export default PrevArrow;

PrevArrow.propTypes = {
  onClick: PropTypes.func,
  isTrue: PropTypes.bool,
  isQuickView: PropTypes.bool,
};
