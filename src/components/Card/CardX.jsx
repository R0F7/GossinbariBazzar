import PropTypes from "prop-types";
import { FaCartPlus, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const CardX = ({ item }) => {
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
    description,
    short_description,
    tags,
    discount_percent,
  } = item;

  return (
    <section className="grid grid-cols-4 gap-4 border">
      <div className="col-span-1 w-[300px] h-[250px]">
        <img className="w-full h-full" src={image} alt="" />
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <div>
          <h4
            title={sub_category}
             className="border border-gray-100 shadow-md shadow-gray-300 inline-block py-0.5 px-4 rounded-full text-sm mb-1 
             text-gray-500 font-bold transition-all duration-1500 
             hover:text-yellow-500 hover:border-yellow-500 hover:bg-[#f8f9fa34] hover:font-bold hover:shadow-md hover:shadow-yellow-200" 
             >

            {sub_category}
          </h4>
          <h3 className="text-lg font-semibold -mb-0.5 text-[#023e8a]">
            {title}
          </h3>
          <span className="text-sm font-bold text-[#023e8a]">{unit}</span>
        </div>
        <div className="flex items-center gap-2.5 text-gray-500 mt-1 mb-2 ">
          <Rating
            style={{ maxWidth: 180 }}
            initialRating={rating}
            fullSymbol={<FaStar className="mr-1 text-yellow-500"></FaStar>}
            emptySymbol={
              <FaRegStar className="mr-1 text-yellow-500"></FaRegStar>
            }
            readonly
          />
        </div>
        <p className="text-gray-500">{short_description}</p>
      </div>
      <div className="col-span-1 flex flex-col justify-center">
        <div>
          <div className="flex items-center gap-3 font-black text-lg mb-1">
            <del className="text-red-600">${price}</del>
            <h4 className="text-[#2E8DD8]">${discounted_price}</h4>
          </div>
          <h4 className="text-sm font-bold text-[#023e8a]">
            Sold:{" "}
            <span className="text-base text-yellow-500 font-bold">20</span>
          </h4>
        </div>
        <h4 className="text-sm font-bold text-[#023e8a] mb-4">
          Sold by :{" "}
          <span className="text-[#4E148C] text-base font-bold">{sold_by}</span>
        </h4>
        <button className="flex items-center justify-center gap-2 bg-[#2E8DD8] text-white w-[65%] py-2 rounded-md text-sm font-bold active:scale-95 scale-100 duration-200">
          <i>
            <FaCartPlus />
          </i>
          <h4>Add to cart</h4>
        </button>
      </div>
    </section>
  );
};

CardX.propTypes = {
  item: PropTypes.object,
  progress_sold: PropTypes.bool,
};

export default CardX;
