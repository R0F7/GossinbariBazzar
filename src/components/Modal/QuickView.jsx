/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import Rating from "react-rating";
import Slider from "react-slick";
import NextArrow from "../Arrow/NextArrow";
import PrevArrow from "../Arrow/PrevArrow";
import { RxCross2 } from "react-icons/rx";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

// const QuickView = ({ isOpen, onClose, title, description, message }) => {
//   return (
//     <>
//       {/* <Dialog open={isOpen} onClose={onClose} className="relative z-50">
//         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//           <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
//             <DialogTitle className="font-bold">{title}</DialogTitle>
//             <Description>{description}</Description>
//             <p>{message}</p>
//             <div className="flex gap-4">
//               <button onClick={onClose}>Cancel</button>
//               <button onClick={onClose}>Deactivate</button>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog> */}

//     </>
//   );
// };

const QuickView = ({
  isDialogOpen,
  closeDialog,
  item,
  productReviews = [],
  averageRating,
}) => {
  const [count, setCount] = useState(1);
  const { cartAddedProducts, user, addProductInCard } = useAuth();
  const {
    _id,
    image,
    additionalImages,
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
    short_description,
    vendor_info,
  } = item;

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow isQuickView={true} isTrue={false} />,
    prevArrow: <PrevArrow isQuickView={true} isTrue={false} />,
  };

  const find_product = cartAddedProducts.find((product) => product.id === _id);
  const quantity = find_product?.quantity;

  useEffect(() => {
    if (find_product) {
      setCount(quantity);
    }
  }, [find_product, quantity]);

  const handleAddToCard = async () => {
    if (quantity === count) {
      return toast.error("if you want more! update quantity");
    }

    const product_info = {
      id: _id,
      order_owner_info: {
        name: user?.displayName,
        email: user?.email,
      },
      vendor_info,
      quantity: count,
    };

    await addProductInCard(product_info);

    // console.log(product_info);
  };

  return (
    <div>
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          {/* Overlay - triggers closeDialog on outside click */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-35" />
          </TransitionChild>

          {/* Centered Modal Content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  onClick={(e) => e.stopPropagation()} // Prevent closeDialog on inner content clicks
                  className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 pb-14 text-left align-middle shadow-xl transition-all"
                >
                  <div>
                    <div>
                      <div className="flex items-end gap-1.5 mb-2">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <h6 className="text-[13px] font-semibold text-gray-500">
                          {"( "}
                          {unit}
                          {" )"}
                        </h6>
                      </div>
                      <div className="flex items-center mb-8 text-sm font-semibold space-x-2 text-[#828E9A]">
                        <Rating
                          style={{ maxWidth: 180 }}
                          initialRating={averageRating}
                          fullSymbol={
                            <FaStar className="mr-0.5 text-xs text-yellow-400"></FaStar>
                          }
                          emptySymbol={
                            <FaRegStar className="mr-0.5 text-xs text-yellow-400"></FaRegStar>
                          }
                          readonly
                        />
                        <h6>{productReviews.length} customer reviews</h6>

                        {/* TODO: change sold dynamic */}
                        <h6 className="border-x px-2">Sold: {sold_product}</h6>
                        <h6>
                          Sold by: <strong>{sold_by}</strong>
                        </h6>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      {/* image */}
                      <div className="w-1/2 h-full border p-8 relative z-50">
                        <Slider {...settings} className=" p-">
                          <div className="h-[250px] w-[600px] bg-slate-500">
                            <img
                              className="w-full h-full"
                              src={additionalImages[0]}
                              alt=""
                            />
                          </div>
                          <div className="h-[250px] w-[600px] bg-slate-500">
                            <img
                              className="w-full h-full"
                              src={additionalImages[1]}
                              alt=""
                            />
                          </div>
                          <div className="h-[250px] w-[600px] bg-slate-500">
                            <img
                              className="w-full h-full"
                              src={additionalImages[2]}
                              alt=""
                            />
                          </div>
                          <div className="h-[250px] w-[600px] bg-slate-500">
                            <img
                              className="w-full h-full"
                              src={additionalImages[3]}
                              alt=""
                            />
                          </div>
                        </Slider>
                        <div className="h-2 w-[8%] bg-white absolute -top-1 left-1/2 -translate-x-4 -z-50"></div>
                      </div>
                      {/* details */}
                      <div className="w-1/2 h-full pb-10">
                        <div className="flex items-center gap-2.5 font-semibold text-xl ">
                          {discounted_price ? (
                            <>
                              <del className="text-gray-500">
                                {" "}
                                $
                                {Number.isInteger(price)
                                  ? price + ".00"
                                  : price}
                              </del>
                              <h3 className="text-red-500">
                                $
                                {Number.isInteger(discounted_price)
                                  ? discounted_price + ".00"
                                  : discounted_price}
                              </h3>
                            </>
                          ) : (
                            <h3 className="text-red-500">
                              ${Number.isInteger(price) ? price + ".00" : price}
                            </h3>
                          )}
                        </div>
                        {/* TODO:add dynamic short description */}
                        <p className="my-2.5 font-light text-[#828E9A]">
                          {short_description}
                        </p>
                        <h6 className="text-sm font-semibold text-gray-500">
                          Availability :{" "}
                          <span className="text-base text-green-500">
                            {total_product}
                          </span>
                        </h6>

                        <div className="border w-[110px] flex items-center justify-around py-1.5 text-sm font-bold rounded-md shadow my-3">
                          <button
                            onClick={() => setCount(count - 1)}
                            disabled={count === 1}
                            className="text- active:scale-75 scale-100 duration-200"
                          >
                            <FiMinus />
                          </button>
                          <span>{count}</span>
                          <button
                            onClick={() => setCount(count + 1)}
                            disabled={count === total_product}
                            className="active:scale-75 scale-100 duration-200"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <button
                            onClick={handleAddToCard}
                            className="g-[#76c893] bg-[#0077b6] text-white py-2 rounded-md text-sm font-semibold shadow-[#2e8ed886] shadow-md hover:shadow-md active:scale-95 scale-100 duration-200 "
                          >
                            Add to cart
                          </button>
                          <button className="bg-[#FFB240] py-2 rounded-md text-sm font-semibold shadow-md shadow-[#ffb3406e] hover:shadow-md active:scale-95 scale-100 duration-200">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute top-4 right-4 border p-0.5 rounded-full shadow text-red-500 cursor-pointer hover:scale-[1.18] hover:shadow-red-200 hover:shadow-md hover:border-transparent transition duration-200"
                      onClick={closeDialog}
                    >
                      <i>
                        <RxCross2 />
                      </i>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default QuickView;
