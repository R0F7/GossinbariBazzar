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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow isTrue={true}/>,
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div>
                    <div>
                      <div className="flex items-end gap-2">
                        <h1>{title}</h1>
                        <h6>{unit}</h6>
                      </div>
                      <div>
                        <Rating
                          style={{ maxWidth: 180 }}
                          initialRating={rating}
                          fullSymbol={<FaStar className="mr-1"></FaStar>}
                          emptySymbol={<FaRegStar className="mr-1"></FaRegStar>}
                          readonly
                        />
                        <h6>3 customer reviews</h6>
                        <h6>Sold: 33</h6>
                        <h6>
                          Sold by: <strong>{sold_by}</strong>
                        </h6>
                      </div>
                    </div>
                    <div>
                      {/* image */}
                      <div>
                        <Slider {...settings}>
                          <div>
                            <h3>1</h3>
                          </div>
                          <div>
                            <h3>2</h3>
                          </div>
                          <div>
                            <h3>3</h3>
                          </div>
                          <div>
                            <h3>4</h3>
                          </div>
                          <div>
                            <h3>5</h3>
                          </div>
                          <div>
                            <h3>6</h3>
                          </div>
                          <div>
                            <h3>7</h3>
                          </div>
                          <div>
                            <h3>8</h3>
                          </div>
                          <div>
                            <h3>9</h3>
                          </div>
                        </Slider>
                      </div>
                      {/* details */}
                      <div>
                        <div>
                          <del>${discounted_price}</del>
                          <h3>${price}</h3>
                        </div>
                        {/* TODO:add dynamic details */}
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. In nisl tortor, lobortis non tortor sit amet,
                          iaculis rhoncus ipsum. Fusce ornare nunc maximus dui
                          molestie.
                        </p>
                        <h6>
                          Availability: <span>10 in stock</span>
                        </h6>

                        <div className="border w-[130px] flex items-center justify-around py-1.5 text-lg font-bold rounded-md shadow my-3.5">
                          <button className="text- active:scale-75 scale-100 duration-200">
                            <FiMinus />
                          </button>
                          <span>1</span>
                          <button className="active:scale-75 scale-100 duration-200">
                            <FiPlus />
                          </button>
                        </div>

                        <button>Add To Cart</button>
                        <button>Buy Now</button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={closeDialog} className="btn-secondary">
                      Cancel
                    </button>
                    <button onClick={closeDialog} className="btn-primary">
                      Confirm
                    </button>
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
