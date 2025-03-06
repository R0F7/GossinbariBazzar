import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import {
  FaAngleLeft,
  FaApple,
  FaMotorcycle,
  FaRegUser,
  FaShippingFast,
} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GiSnail } from "react-icons/gi";
import { IoLogoGoogle } from "react-icons/io5";
import { MdAlternateEmail, MdContactless } from "react-icons/md";
import { PiStripeLogoFill } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import chip from "../../assets/chip (2).png";
import { GoArrowRight } from "react-icons/go";
import { Link, Navigate } from "react-router-dom";

// import {loadStripe} from '@stripe/stripe-js';
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

import CheckoutModal from "./CheckoutModal";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user_info_DB, user, cartAddedProducts, cart_products, shippingDetails } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState({
    name: "Normal",
    price: 0,
  });

  console.log(shippingDetails);

  if (Object.keys(shippingDetails).length < 1) {
    return <Navigate to="/cart" />;
  }

  const name = user?.displayName.split(" ") || [];

  const total_quantity = cartAddedProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const subtotal_price = cart_products.reduce(
    (total, product) => total + product.price * product.cartProduct.quantity,
    0
  );

  const discounted_price = cart_products.reduce(
    (total, product) =>
      total + product?.discounted_price * product?.cartProduct?.quantity,
    0
  );

  const discount_percent = (
    ((subtotal_price - discounted_price) / subtotal_price) *
    100
  ).toFixed(2);

  const total_price =
    discounted_price > 0
      ? discounted_price + deliveryMethod.price
      : subtotal_price + deliveryMethod.price;

  //   console.log(total_price);

//   const order_info ={
//     products: cart_products,
//     delivery: deliveryMethod,
//     total_price: total_price,
//     shippingDetails: shippingDetails,
//   }
//   console.table(order_info);

console.log(cartAddedProducts);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(deliveryMethod.price);

  return (
    <section className="container mx-auto flex justify-between -[1300px] g-gradient-to-r from-[#EAEDFA] to-[#D3E0F3]">
      <div>
        <Link
          to="/cart"
          className="flex items-center gap-0.5 text-[#7A78F4] font-semibold py-4"
        >
          <FaAngleLeft /> <span>Back to cart</span>
        </Link>
        <h1 className="text-4xl mb-2">Checkout</h1>
        <p className="text-gray-500 font-light mb-5">
          a checkout is a counter where you pay for things you are buying
        </p>

        {/* Contact information */}
        <div className="text-[#212B36]">
          <h4 className="mb-4">1. Contact information</h4>
          <form className="grid grid-cols-10 gap-x-10 gap-y-6">
            <label
              htmlFor="first_name"
              className={`flex items-center gap-2.5 border-b pl-2.5 pb-1.5 ${
                focusedField === "first_name" ? "border-[#7A78F4]" : ""
              } transition-all duration-300 ease-in-out col-span-4`}
            >
              <div className="border-r pr-2.5">
                <FaRegUser
                  className={`w-5 h-5 ${
                    focusedField === "first_name"
                      ? "text-[#7A78F4]"
                      : "text-[#212B36]"
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col w-full">
                <span
                  className={`text-sm text-gray-500 ext-[#C8C7CA] font-medium ${
                    focusedField === "first_name" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  First Name
                </span>
                <input
                  type="text"
                  id="first_name"
                  placeholder="John"
                  defaultValue={name.slice(0, -1).join(" ")}
                  onFocus={() => handleFocus("first_name")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg bg-transparent"
                />
              </div>
            </label>
            <label
              htmlFor="last_name"
              className={`flex items-center gap-2.5 border-b pl-2.5 pb-1.5 ${
                focusedField === "last_name" ? "border-[#7A78F4]" : ""
              } transition-all duration-300 ease-in-out col-span-4`}
            >
              <div className="border-r pr-2.5">
                <AiOutlineUser
                  className={`w-5 h-5 ${
                    focusedField === "last_name"
                      ? "text-[#7A78F4]"
                      : "text-[#212B36]"
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col w-full">
                <span
                  className={`text-sm text-gray-500 ext-[#C8C7CA] font-medium ${
                    focusedField === "last_name" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  Last Name
                </span>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Deo"
                  defaultValue={name[name?.length - 1]}
                  onFocus={() => handleFocus("last_name")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg bg-transparent"
                />
              </div>
            </label>
            <label
              htmlFor="phone_number"
              className={`flex items-center gap-2.5 border-b pl-2.5 pb-1.5 ${
                focusedField === "phone_number" ? "border-[#7A78F4]" : ""
              } transition-all duration-300 ease-in-out col-span-5`}
            >
              <div className="border-r pr-2.5">
                <FiPhoneCall
                  className={`w-5 h-5 ${
                    focusedField === "phone_number"
                      ? "text-[#7A78F4]"
                      : "text-[#212B36]"
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col w-full">
                <span
                  className={`text-sm text-gray-500 ext-[#C8C7CA] font-medium ${
                    focusedField === "phone_number" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  Phone Number
                </span>
                <input
                  type="number"
                  id="phone_number"
                  placeholder="01600500100"
                  defaultValue={
                    user_info_DB?.number === "N/A" ? "" : user_info_DB?.number
                  }
                  onFocus={() => handleFocus("phone_number")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg bg-transparent"
                />
              </div>
            </label>
            <label
              htmlFor="email"
              className={`flex items-center gap-2.5 border-b pl-2.5 pb-1.5 ${
                focusedField === "email" ? "border-[#7A78F4]" : ""
              } transition-all duration-300 ease-in-out col-span-5`}
            >
              <div className="border-r pr-2.5">
                <MdAlternateEmail
                  className={`w-5 h-5 ${
                    focusedField === "email"
                      ? "text-[#7A78F4]"
                      : "text-[#212B36]"
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col w-full">
                <span
                  className={`text-sm text-gray-500 ext-[#C8C7CA] font-medium ${
                    focusedField === "email" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  Email
                </span>
                <input
                  type="text"
                  id="email"
                  placeholder="example@gmail.com"
                  value={user?.email}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg bg-transparent"
                />
              </div>
            </label>
          </form>
        </div>

        {/* Delivery method */}
        <div className="mt-5 text-[#212B36]">
          <h4 className="mb-4">2. Delivery method</h4>
          <div className="flex gap-6">
            <button
              //   title="max time 1 hour"
              title="RapidX delivery costs $20"
              onClick={() => setDeliveryMethod({ name: "RapidX", price: 20 })}
              className={`flex items-center gap-2 border py-3 px-5 rounded-xl font-medium ${
                deliveryMethod.name === "RapidX"
                  ? "bg-[#4947FB] text-white"
                  : ""
              } transition duration-300 shadow group overflow-hidden h-[52px]`}
            >
              <i>
                <FaShippingFast />
              </i>{" "}
              <div className="flex flex-col">
                <span className="group-hover:-translate-y-10 translate-y-[11px] transition duration-500">
                  RapidX
                </span>
                <span className="group-hover:-translate-y-3 translate-y-10 transition duration-500">
                  $20
                </span>
              </div>
            </button>
            <button
              title="Express delivery costs $10"
              onClick={() => setDeliveryMethod({ name: "Express", price: 10 })}
              className={`flex items-center gap-2 border py-3 px-5 rounded-xl font-medium ${
                deliveryMethod.name === "Express"
                  ? "bg-[#4947FB] text-white"
                  : ""
              } transition duration-300 shadow group overflow-hidden h-[52px]`}
            >
              <i>
                <FaMotorcycle />
              </i>
              <div className="flex flex-col">
                <span className="group-hover:-translate-y-10 translate-y-[11px] transition duration-500">
                  Express
                </span>
                <span className="group-hover:-translate-y-3 translate-y-10 transition duration-500">
                  $10
                </span>
              </div>
            </button>
            <button
              title="Normal delivery is free"
              onClick={() => setDeliveryMethod({ name: "Normal", price: 0 })}
              className={`flex items-center gap-2 border py-3 px-5 rounded-xl font-medium ${
                deliveryMethod.name === "Normal"
                  ? "bg-[#4947FB] text-white"
                  : ""
              } transition duration-300 shadow group overflow-hidden h-[52px]`}
            >
              <i>
                <GiSnail />
              </i>{" "}
              <div className="flex flex-col">
                <span className="group-hover:-translate-y-10 translate-y-[11px] transition duration-500">
                  Normal
                </span>
                <span className="group-hover:-translate-y-3 translate-y-10 transition duration-500">
                  $0
                </span>
              </div>
            </button>
            <label
              htmlFor="zipcode"
              className={`flex items-center gap-2.5 border-b h-12 pl-2.5 pb-1.5 ${
                focusedField === "zipcode" ? "border-[#7A78F4]" : ""
              } transition-all duration-300 ease-in-out col-span-5`}
            >
              <div className="border-r pr-2.5">
                <SlLocationPin
                  className={`w-5 h-5 ${
                    focusedField === "zipcode" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm text-gray-500 ext-[#C8C7CA] font-medium ${
                    focusedField === "zipcode" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  Zip Code
                </span>
                <input
                  type="number"
                  id="zipcode"
                  placeholder="zip code"
                  onFocus={() => handleFocus("zipcode")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg active-input"
                />
              </div>
            </label>
          </div>
        </div>

        {/* Payment method */}
        <div className="mt-5">
          <h4 className="mb-4 text-[#212B36]">3. Payment method</h4>
          <div className="flex gap-6 text-[#212B36]">
            <button className="flex items-center gap-1 border py-2.5 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow">
              <i>
                <IoLogoGoogle />
              </i>{" "}
              <span>Pay</span>
            </button>
            <button className="flex items-center gap-1 border py-2.5 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow">
              <i>
                <FaApple />
              </i>{" "}
              <span>Pay</span>
            </button>
            <button className="flex items-center gap-1 border py-2.5 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow">
              <i>
                <PiStripeLogoFill />
              </i>{" "}
              <span>Pay</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border p-4 w-[310px] mt-[70px]">
        {/* card */}
        <div className="border p-4 bg-[#4947FB] rounded-md text-white">
          <div className="flex justify-between items-center mb-12">
            <img className="w-10" src={chip} alt="chip" />
            <MdContactless className="w-6 h-6" />
          </div>
          <p className="text-sm font-light mb-2">Exp 09 / 27</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">
              <sup className="font-black text-xl ">. . . .</sup> 5478
            </p>
            <h6 className="">R H Rakibul</h6>
          </div>
        </div>
        <div>
          <Link
            to="/cart"
            className="w-full flex justify-between items-center border-b py-2 px-4 my-4 hover:bg-gray-200 scale-100 active:scale-95 transition duration-300"
          >
            <span className="text-sm font-semibold text-[#212B36]">
              Manage Cards
            </span>{" "}
            <GoArrowRight />
          </Link>
          <h2 className="text-center text-2xl font-medium mb-4 text-[#212B36]">
            {total_quantity} items
          </h2>
          <div className="space-y-2.5 border-b pb-4">
            <div className="flex justify-between items-center ">
              <p className="text-[#A7A7A7]">Subtotal</p>
              <p className="text-[#212B36]">
                ${" "}
                {Number.isInteger(subtotal_price)
                  ? `${subtotal_price + ".00"}`
                  : subtotal_price}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#A7A7A7]">Discount</p>
              <p className="text-[#212B36]">
                - $ {subtotal_price - discounted_price} (%
                {isNaN(discount_percent) ? 0 : discount_percent})
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#A7A7A7]">Delivery Service</p>
              <p className="text-[#212B36]">
                {" "}
                + ${" "}
                {deliveryMethod.price === undefined ? 0 : deliveryMethod.price}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold text-[#212B36]">Total</p>
            <p className="text-2xl font-semibold text-[#212B36]">
              $ {total_price}
            </p>
          </div>
          {/* <Elements stripe={stripePromise}>
                  <CheckoutForm></CheckoutForm>
          </Elements> */}

          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-center gap-4 bg-[#4947FB] text-white py-3 px-4 rounded-md mt-5 scale-100 active:scale-95 transition duration-300"
          >
            Pay Now <GoArrowRight />
          </button>

          {/* Modal */}
          <CheckoutModal
            isOpen={isOpen}
            // refetch={refetch}
            closeModal={closeModal}
            // bookingInfo={{
            //   ...room,
            //   price: totalPrice,
            //   guest: {
            //     name: user?.displayName,
            //     email: user?.email,
            //     image: user?.photoURL,
            //   },
            // }}
          />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
