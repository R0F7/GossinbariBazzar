import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import Rating from "react-rating";
import Slider from "react-slick";
import NextArrow from "../Arrow/NextArrow";
import PrevArrow from "../Arrow/PrevArrow";
import { RxCross2 } from "react-icons/rx";

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

const QuickView = ({ isDialogOpen, closeDialog, item }) => {
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
  } = item;

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow isQuickView={true} isTrue={false} />,
    prevArrow: <PrevArrow isTrue={true} />,
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
                  className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all"
                >
                  <div>
                    <div>
                      <div className="flex items-end gap-1.5 mb-2">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <h6 className="text-[13px] font-semibold">
                          {"( "}
                          {unit}
                          {" )"}
                        </h6>
                      </div>
                      <div className="flex items-center mb-6 text-sm font-semibold space-x-2">
                        <Rating
                          style={{ maxWidth: 180 }}
                          initialRating={rating}
                          fullSymbol={
                            <FaStar className="mr-0.5 text-xs"></FaStar>
                          }
                          emptySymbol={
                            <FaRegStar className="mr-0.5 text-xs"></FaRegStar>
                          }
                          readonly
                        />
                        <h6>3 customer reviews</h6>
                        <h6>Sold: 33</h6>
                        <h6>
                          Sold by: <strong>{sold_by}</strong>
                        </h6>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      {/* image */}
                      <div className="w-1/2 h-full border p-8">
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
                      </div>
                      {/* details */}
                      <div className="w-1/2 h-full pb-10">
                        <div className="flex items-center gap-2.5 font-semibold text-xl ">
                          <del className="text-gray-500">
                            ${discounted_price}
                          </del>
                          <h3 className="text-red-500">${price}</h3>
                        </div>
                        {/* TODO:add dynamic short description */}
                        <p className="my-2.5 font-light text-gray-700">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. In nisl tortor, lobortis non tortor sit amet,
                          iaculis rhoncus ipsum. Fusce ornare nunc maximus dui
                          molestie.
                        </p>
                        <h6 className="text-sm font-semibold text-gray-500">
                          Availability :{" "}
                          <span className="text-base text-green-500">
                            10 in stock
                          </span>
                        </h6>

                        <div className="border w-[110px] flex items-center justify-around py-1.5 text-sm font-bold rounded-md shadow my-3">
                          <button className="text- active:scale-75 scale-100 duration-200">
                            <FiMinus />
                          </button>
                          <span>1</span>
                          <button className="active:scale-75 scale-100 duration-200">
                            <FiPlus />
                          </button>
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <button className="g-[#76c893] bg-[#0077b6] text-white py-2 rounded-lg text-sm font-semibold -[65%] shadow active:scale-95 scale-100 duration-200 ">
                            Add to cart
                          </button>
                          <button className="bg-[#FFB240] py-2 rounded-lg text-sm font-semibold -[65%] shadow active:scale-95 scale-100 duration-200 ">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 border p-0.5 rounded-full shadow text-red-500 cursor-pointer hover:scale-[1.18] hover:shadow-red-200 hover:shadow-md hover:border-transparent transition duration-200"
                    onClick={closeDialog}
                    >
                        <i><RxCross2 /></i>
                    </div>
                  </div>

                  {/* <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={closeDialog} className="btn-secondary">
                      Cancel
                    </button>
                    <button onClick={closeDialog} className="btn-primary">
                      Confirm
                    </button>
                  </div> */}
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
