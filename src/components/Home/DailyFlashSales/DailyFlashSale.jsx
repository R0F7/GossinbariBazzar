import PropTypes from "prop-types";
import { FaCartPlus, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const DailyFlashSale = ({ flashSale }) => {
  const {
    _id,
    image,
    sold_by,
    total_product,
    sold_product,
    brand_name,
    title,
    unit,
    rating,
    discounted_price,
    price,
    category,
    sub_category,
    tags,
    discount_percent,
  } = flashSale;
  //   const check= Math.round(rating * 2) / 2;

  return (
    <div className="p-4 bg-[#FFFFFF] hover:border-gray-200 border border-white hover:rounded-lg hover:shadow">
      <div className="h-[200px]">
        <img className="h-full w-full" src={image} alt="" />
        <div></div>
      </div>
      <div>
        <h4 className="text-[#637381] text-sm mt-1.5 mb-3">
          <span className="text-[#919EAB]">Sold by:</span> {sold_by}
        </h4>
        <div className="w-full bg-[#EEEEEE] h-2 relative mb-1">
          <div className="w-[70%] bg-red-700 h-2 absolute top-0 left-0"></div>
        </div>
        <div className="flex items-center gap-4 my-2">
          <h4 className="text-[#212B36] font-semibold text-[15px] ">
            <span className="">Sold:</span> 24/47
          </h4>
          <h6 className="border inline-block py-0.5 px-6 rounded-full text-sm font-normal hover:bg-yellow-300 over:text-white transition-all duration-500 y-2.5">
            {sub_category}
          </h6>
        </div>
        <h4 className="text-[#212B36] font-semibold text-l mb-1.5">{title}</h4>
        <h6 className="text-[15px] -mb-0.5">{unit}</h6>
        <div>
          <ReactStars
            count={5}
            value={rating}
            size={22}
            isHalf={true}
            activeColor="#FFC107"
            edit={false}
            color="#D3CED2"
            // emptyIcon={<FaRegStar size={40} />}
            // halfIcon={<FaStarHalfAlt size={40} />}
            // fullIcon={<FaStar size={40} />}
          />
        </div>
        <div className="flex items-center gap-5 mb-3.5">
          <del className="text-[#919EAB] font-bold text-lg">
            ${discounted_price}.00
          </del>
          <h6 className="text-[#C30B0B] font-bold text-lg">${price}.00</h6>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#2E8DD8] text-white w-full py-2 rounded-md text-sm font-bold ">
          <i>
            <FaCartPlus />
          </i>
          <h4>Add to cart</h4>
        </button>
      </div>
    </div>
  );
};

DailyFlashSale.propTypes = {
  flashSale: PropTypes.object,
};

export default DailyFlashSale;
