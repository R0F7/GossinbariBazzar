import PropTypes from "prop-types";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Card = ({ item, progress_sold }) => {
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
  } = item;
  //   const check= Math.round(rating * 2) / 2;

  return (
   <Link to={`/product/${_id}`}>
    <div className="p-4 pb-6 bg-[#FFFFFF] hover:border-gray-200 border border-white hover:rounded-lg hover:shadow cart">
      <div className="h-[200px] relative">
        <img className="h-full w-full" src={image} alt="" />
        {discounted_price && (
          <div className="bg-[#C40B0B] text-white w-14 h-14 rounded-full flex items-center justify-center absolute top-4 right-2">
            <h4>-{discount_percent}%</h4>
          </div>
        )}
        <div className="flex justify-around bg-[#eeeeee] bg-opacity-50 py-2.5 icon-menu">
          <div className="flex flex-col items-center">
            <i>
              <FaRegHeart />
            </i>
            <h4>Wishlist</h4>
          </div>
          <div className="flex flex-col items-center">
            <i>
              <FiEye />
            </i>
            <h4>Quickview</h4>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-[#637381] mt-1.5 mb-3">
          <span className="text-[#919EAB] text-sm">Sold by:</span> {sold_by}
        </h4>
        {progress_sold && (
          <div className="w-full bg-[#EEEEEE] h-2 relative mb-1">
            <div className="w-[70%] bg-red-700 h-2 absolute top-0 left-0"></div>
          </div>
        )}
        <div className="flex items-center justify-between ap-4 mt-2 mb-2">
        <h6 className="border inline-block py-0.5 px-6 rounded-full text-sm font-normal hover:bg-yellow-300 over:text-white transition-all duration-500 y-2.5">
            {sub_category}
          </h6>
          {progress_sold && (
            <h4 className="text-[#212B36] ont-semibold text-[15px] ">
              <span className="text-[#919EAB] text-sm">Sold:</span> 24/47
            </h4>
          )}
        </div>
        <h4 className="text-[#637381] font-semibold text-l mb-1">{title}</h4>
        <h6 className="text-[15px] text-sm font text-[#637381] -mb-1">
          {unit}
        </h6>
        <div className="flex items-center gap-4 T= text-gray-500">
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
          <h6>0</h6>
        </div>
        <div className="flex items-center gap-5 mb-3.5">
          <del className="text-[#919EAB] font-bold text-lg">
            ${Number.isInteger(price) ? `${price + ".00"}` : price}
          </del>
          <h6 className="text-[#C30B0B] font-bold text-lg">
            $
            {Number.isInteger(discounted_price)
              ? `${discounted_price + ".00"}`
              : discounted_price}
          </h6>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#2E8DD8] text-white w-full py-2 rounded-md text-sm font-bold active:scale-95 scale-100 duration-200">
          <i>
            <FaCartPlus />
          </i>
          <h4>Add to cart</h4>
        </button>
      </div>
    </div>
   </Link>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  progress_sold: PropTypes.bool,
};

export default Card;
