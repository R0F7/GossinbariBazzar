import PropTypes from "prop-types";
import { useState } from "react";
import { FaCartPlus, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import QuickView from "../Modal/QuickView";
import Rating from "react-rating";

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

  // console.log(isDialogOpen);

  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const openDialog = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDialogOpen(true);
  //   console.log("openDialog clicked");
  // };

  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  //   console.log("closeDialog clicked");
  // };

  return (
    <Link to={`/product/${_id}`}>
      <div className="p-4 pb-6 bg-[#FFFFFF] hover:border-gray-200 border border-white hover:rounded-lg hover:shadow cart">
        <div className="h-[200px] relative overflow-hidden">
          <img
            className="h-full w-full hover:scale-110 transition duration-500 cardX-image"
            src={image}
            alt={title}
          />
          {discounted_price && (
            <div className="bg-[#C40B0B] text-white w-14 h-14 rounded-full flex items-center justify-center absolute top-4 right-2">
              <h4>-{discount_percent}%</h4>
            </div>
          )}
          <div className="flex justify-around bg-[#eeeeee] bg-opacity-50 icon-menu">
            <div className="flex flex-col items-center w-1/2 py-2.5 hover:bg-gray-300 hover:bg-opacity-30">
              <i>
                <FaRegHeart />
              </i>
              <h4>Wishlist</h4>
            </div>
            <div
              className="flex flex-col items-center border-l w-1/2 h-full py-2.5 hover:bg-gray-300 hover:bg-opacity-30"
              onClick={openDialog}
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
              />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-[#637381] mt-1.5 mb-3">
            <span className="text-[#023e8a] font-semibold text-sm ">Sold by:</span> <span className="text-[#4E148C] font-semibold">{sold_by}</span>
          </h4>
          {progress_sold && (
            <div className="w-full bg-[#EEEEEE] h-2 relative mb-1">
              <div className="w-[70%] bg-red-700 h-2 absolute top-0 left-0"></div>
            </div>
          )}
          <div className="flex items-center justify-between ap-4 mt-2 mb-2">
            <h6
              className="border order-gray-100 shadow shadow-[#2e8ed87a] border-[#2E8DD8] inline-block py-0.5 px-4 rounded-full text-sm mb-1 
             text-[#2E8DD8] font-bold transition-all duration-1500 
             hover:text-yellow-500 hover:border-yellow-500 hover:bg-[#f8f9fa34] hover:font-bold hover:shadow-md hover:shadow-yellow-200"
            >
              {sub_category}
            </h6>
            {progress_sold && (
              <h4 className="text-[#212B36] ont-semibold text-[15px] ">
                <span className="text-[#919EAB] text-sm">Sold:</span> 24/47
              </h4>
            )}
          </div>
          <h4 className="text-[#023e8a] font-semibold text-l mb-1">{title}</h4>
          <h6 className="text-[15px] text-sm font-bold text-[#023e8a] mb-1">
            {unit}
          </h6>
          <div
            className="flex items-center gap-1.5 text-gray-500
          -mb-1.5"
          >
            <Rating
              style={{ maxWidth: 180 }}
              initialRating={rating}
              fullSymbol={<FaStar className="mr-1 text-yellow-500"></FaStar>}
              emptySymbol={
                <FaRegStar className="mr-1 text-yellow-500"></FaRegStar>
              }
              readonly
            />
            <h6 className="text-xs font-bold">{"(" + 0 + ")"}</h6>
          </div>
          <div className="flex items-center gap-5 my-2.5">
            <del className="ext-[#919EAB] text-red-600 font-bold text-lg">
              ${Number.isInteger(price) ? `${price + ".00"}` : price}
            </del>
            <h6 className="ext-[#C30B0B] text-[#2E8DD8] font-bold text-lg">
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
