import PropTypes from "prop-types";
import { useState } from "react";
import { FaCartPlus, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import QuickView from "../Modal/QuickView";

const CardX = ({ item, handleAddToCard, handleWishlist, reviews }) => {
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (e) => {
    // Prevent the click from bubbling up to the parent Link
    // e.stopPropagation();
    e.preventDefault();
    setIsDialogOpen(true);
    console.log("openDialog are clicked");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    console.log("closeDialog clicked");
  };

  const productReviews = reviews.filter((review) => review.product_id === _id);
  // console.log(productReviews);

  const totalRatings = productReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRatings / reviews.length;
  // console.log(averageRating);

  return (
    <Link
      to={`/product/${_id}`}
      className="grid grid-cols-4 gap-4 border hover:rounded-xl hover:shadow-md hover:scale-[0.97] scale-[0.96] duration-500 shadow cart"
    >
      <div className="col-span-1 w-[300px] h-[250px] overflow-hidden">
        <img
          className="w-full h-full hover:scale-110 transition duration-500 cardX-image"
          src={image}
          alt=""
        />
        <div className="flex justify-around bg-[#eeeeee] bg-opacity-50 icon-menu">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlist(_id);
            }}
            className="flex flex-col items-center w-1/2 py-2.5 hover:bg-gray-300 hover:bg-opacity-30"
          >
            <i>
              <FaRegHeart />
            </i>
            <h4>Wishlist</h4>
          </button>
          <div
            className="flex flex-col items-center border-l w-1/2 h-full py-2.5 hover:bg-gray-300 hover:bg-opacity-30"
            onClick={openDialog}
            title="Quick View"
            // onClick={(e) => openDialog(e,'R0F7')}
          >
            <i>
              <FiEye />
            </i>
            <h4>Quickview</h4>
            {/* <QuickView
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="Deactivate account"
                description="This will permanently deactivate your account"
                message="Are you sure you want to deactivate your account? All of your data will be permanently removed."
              /> */}

            <QuickView
              isDialogOpen={isDialogOpen}
              closeDialog={closeDialog}
              item={item}
              productReviews={productReviews}
              averageRating={averageRating}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <div>
          <h4
            title={sub_category}
            className="border order-gray-100 shadow shadow-[#2e8ed87a] border-[#2E8DD8] inline-block py-0.5 px-4 rounded-full text-sm mb-1 
             text-[#2E8DD8] font-bold transition-all duration-1500 
             hover:text-yellow-500 hover:border-yellow-500 hover:bg-[#f8f9fa34] hover:font-bold hover:shadow-md hover:shadow-yellow-200"
          >
            {sub_category}
          </h4>
          <h3 className="text-lg font-semibold -mb-0.5 text-[#023e8a]">
            {title}
          </h3>
          <span className="text-sm font-bold text-[#023e8a]">{unit}</span>
        </div>
        {/* <div className="flex"> */}
        <div className="flex items-center gap-2.5 text-gray-500 mt-1 mb-2 ">
          <Rating
            style={{ maxWidth: 180 }}
            initialRating={averageRating}
            fullSymbol={<FaStar className="mr-1 text-yellow-500"></FaStar>}
            emptySymbol={
              <FaRegStar className="mr-1 text-yellow-500"></FaRegStar>
            }
            readonly
          />
          <span className="-ml-1.5 -mt-1">{`(${productReviews.length})`}</span>
        </div>
        {/* </div> */}
        <p className="text-gray-500">{short_description}</p>
      </div>
      <div className="col-span-1 flex flex-col justify-center">
        <div>
          {discounted_price ? (
            <div className="flex items-center gap-3 font-black text-lg mb-1">
              <del className="text-red-600">
                ${Number.isInteger(price) ? price + ".00" : price}
              </del>
              <h4 className="text-[#2E8DD8]">
                $
                {Number.isInteger(discounted_price)
                  ? discounted_price + ".00"
                  : discounted_price}
              </h4>
            </div>
          ) : (
            <h4 className="text-[#2E8DD8] font-black text-lg mb-1">
              ${Number.isInteger(price) ? price + ".00" : price}
            </h4>
          )}
          <h4 className="text-sm font-bold text-[#023e8a]">
            Sold:{" "}
            <span className="text-base text-green-500 font-bold">
              {sold_product}
            </span>
          </h4>
        </div>
        <h4 className="text-sm font-bold text-[#023e8a] mb-4">
          Sold by :{" "}
          <span className="text-[#4E148C] text-base font-bold">{sold_by}</span>
        </h4>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCard(item);
          }}
          className="flex items-center justify-center gap-2 bg-[#2E8DD8] text-white w-[65%] py-2 rounded-md text-sm font-bold active:scale-95 scale-100 duration-200 hover:bg-yellow-500 hover:text-[#1a1a2e] hover:shadow-md hover:shadow-yellow-300 transition-all"
        >
          <i>
            <FaCartPlus />
          </i>
          <h4>Add to cart</h4>
        </button>
      </div>
    </Link>
  );
};

CardX.propTypes = {
  item: PropTypes.object,
  progress_sold: PropTypes.bool,
  handleAddToCard: PropTypes.func,
  handleWishlist: PropTypes.func,
  reviews: PropTypes.array,
};

export default CardX;
