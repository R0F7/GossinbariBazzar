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
      <div className="col-span-2">
        <div>
          <h4 className="border inline-block py-0.5 px-4 rounded-full text-sm mb-1">{sub_category}</h4>
          <h3 className="text-lg font-semibold -mb-0.5">{title}</h3>
          <span className="text-gray-600 text-sm font-bold ">{unit}</span>
        </div>
        <div
          className="flex items-center gap-2.5 text-gray-500 mt-1 mb-2 "
        >
          <Rating
            style={{ maxWidth: 180 }}
            initialRating={rating}
            fullSymbol={<FaStar className="mr-1"></FaStar>}
            emptySymbol={<FaRegStar className="mr-1"></FaRegStar>}
            readonly
          />
        </div>
        <p className="text-gray-500">{short_description}</p>
      </div>
      <div className="col-span-1">
        <div>
          <div>
            <del>{price}</del>
            <h4>{discounted_price}</h4>
          </div>
          <h4>Sold: <span>20</span></h4>
        </div>
        <h4>Sold by : <span>{sold_by}</span></h4>
        <button className="flex items-center justify-center gap-2 bg-[#2E8DD8] text-white w-full py-2 rounded-md text-sm font-bold active:scale-95 scale-100 duration-200">
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
