import PropTypes from "prop-types";
import { TiArrowRight } from "react-icons/ti";
import "./category.css";
import { useState } from "react";

const Category = ({ category, idx, handleClick }) => {
  const [hover, setHover] = useState({ isHovered: false, idx: null });
  // console.log(hover.isHovered,hover.idx);

  return (
    <div
      onClick={() => handleClick(category.categoryName)}
      className="border-[#eeeeee75] border hover:border bg-[#eeeeee75] mx-auto rounded-sm shadow p-4 hover:shadow-md category-box"
      onMouseEnter={() => setHover({ isHovered: true, idx })}
      onMouseLeave={() => setHover({ isHovered: false, idx: null })}
    >
      <div className="w-[250px] h-[150px] mb-2.5 image">
        <img className="h-full w-full" src={category.categoryImage} alt="" />
        <h4
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold ${
            hover.isHovered && hover.idx === idx ? "scale-100" : "scale-0"
          } duration-500`}
        >
          {category.categoryName}
        </h4>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[#212B36] category-name">
          {category.categoryName}
        </h4>
        <i className="text-xl icon">
          <TiArrowRight />
        </i>
      </div>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object,
  idx: PropTypes.number,
  handleClick:PropTypes.func,
};

export default Category;
