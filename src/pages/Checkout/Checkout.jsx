import { useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import {
  FaAngleLeft,
  FaMotorcycle,
  FaRegUser,
  FaShippingFast,
} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GiSnail } from "react-icons/gi";
import { MdAlternateEmail, MdContactless } from "react-icons/md";
import { PiStripeLogoFill } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import chip from "../../assets/chip (2).png";
import { GoArrowRight } from "react-icons/go";
import { Link, Navigate, useNavigate } from "react-router-dom";
import sslcommerz from "../../assets/sslcommerz.png";

// import {loadStripe} from '@stripe/stripe-js';
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

import CheckoutModal from "./CheckoutModal";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { isValidEmail, isValidNumber } from "../../utils/validation";
import CustomToast from "../../components/CustomToast/CustomToast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Checkout = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({});
  const btnRef = useRef(null);
  const {
    user_info_DB,
    user,
    cartAddedProducts,
    cartAddedProductsRefetch,
    isFetched,
    cart_products,
    shippingDetails,
  } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState({
    category: "Normal",
    price: 0,
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // insert order info with remove cart items
  const { mutateAsync: postOrderInfoInDB } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/order-info", info);
      return data;
    },
    onSuccess: () => {
      cartAddedProductsRefetch();
      navigate("/dashboard/my-orders/order-history");
      toast(
        <CustomToast
          message={"🛍️ Order Confirmed! "}
          para={"Get ready for something awesome! 😍📦"}
        />
      );
    },
  });

  if (isFetched && cartAddedProducts.length < 1) return <Navigate to="/shop" />;
  if (Object.keys(shippingDetails).length < 1) return <Navigate to="/cart" />;

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

  // const newCart = cartAddedProducts.map((item) => {
  //   const findProduct = cart_products.find(
  //     (product) => item.id === product._id
  //   );

  //   return { ...item, price: findProduct.price, name: findProduct.title };
  // });
  // console.log(newCart);

  const productMap = new Map(
    cart_products.map((product) => [product._id, product])
  );

  const newCart = cartAddedProducts.map((item) => {
    const findProduct = productMap.get(item.id);

    return {
      ...item,
      // id: item.id,
      // quantity: item.quantity,
      unit: findProduct.unit,
      price: findProduct.discounted_price
        ? findProduct.discounted_price
        : findProduct.price,
      name: findProduct.title,
      image: findProduct.image,
    };
  });

  console.log(newCart);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setContactInfo({})

    const form = e.target;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const name = first_name + " " + last_name;
    const phone_number = form.phone_number.value;
    const email = form.email.value;

    if (!first_name || !last_name) {
      setIsOpen(false);
      return toast("⚠️ Please enter Your full name");
    } else if (!phone_number || !isValidNumber(phone_number)) {
      setIsOpen(false);
      return toast(
        <CustomToast
          message={"⚠️ Please enter a valid number"}
          example={"+8801712345678 or 01712345678"}
        ></CustomToast>
      );
    } else if (!email || !isValidEmail(email)) {
      setIsOpen(false);
      return toast(
        <CustomToast
          message={"⚠️ Please enter a valid email"}
          example={"example@domain.com"}
        ></CustomToast>
      );
    }

    setContactInfo({ name, phone_number, email });
  };

  const orderInfo = {
    orderID: `GBB-${Date.now()}`,
    products: newCart,
    delivery: deliveryMethod,
    total_price,
    total_quantity,
    order_owner_info: { name: user?.displayName, email: user?.email },
    contactInfo,
    // TODO: IMPLEMENT Cash on Delivery & sslcommerz PAYMENT METHOD
    paymentInfo: {
      paymentMethod: "Card", // or "Cash on Delivery", "Bkash", etc.
      paymentStatus: "Paid", // "Pending", "Paid", "Refunded"
      // transactionId: transactionId // If online payment
      transactionId: null, // Cash on Delivery
    },
    shippingDetails,
    status: "Order Placed",
    createdAt: new Date(),
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-10 gap-x-10 gap-y-6"
          >
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
                  name="first_name"
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
                  name="last_name"
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
                  name="phone_number"
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
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  defaultValue={user?.email}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg bg-transparent"
                />
              </div>
            </label>
            <button type="submit" ref={btnRef}></button>
          </form>
        </div>

        {/* Delivery method */}
        <div className="mt-5 text-[#212B36]">
          <h4 className="mb-4">2. Delivery method</h4>
          <div className="flex gap-6">
            <button
              //   title="max time 1 hour"
              title="RapidX delivery costs $20"
              onClick={() =>
                setDeliveryMethod({ category: "RapidX", price: 20 })
              }
              className={`flex items-center gap-2 border py-3 px-5 rounded-xl font-medium ${
                deliveryMethod.category === "RapidX"
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
              onClick={() =>
                setDeliveryMethod({ category: "Express", price: 10 })
              }
              className={`flex items-center gap-2 border py-3 px-5 rounded-xl font-medium ${
                deliveryMethod.category === "Express"
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
              onClick={() =>
                setDeliveryMethod({ category: "Normal", price: 0 })
              }
              className={`flex items-center gap-2 border py-3 px-5 rounded-xl font-medium ${
                deliveryMethod.category === "Normal"
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
        {/* TODO: IMPLEMENT Cash on Delivery & sslcommerz PAYMENT METHOD */}
        <div className="mt-5">
          <h4 className="mb-4 text-[#212B36]">3. Payment method</h4>
          <div className="flex gap-6 text-[#212B36]">
            <button
              onClick={() => toast("⏳ coming soon")}
              className="flex items-center gap-1 border py-2.5 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow h-[52px]"
            >
              <span>💰</span> <span>Cash on Delivery</span>
            </button>
            <button className="flex items-center gap-1 border py-2.5 px-5 rounded-xl font-medium bg-[#4947FB] text-white transition duration-300 shadow h-[52px]">
              <span>
                <PiStripeLogoFill />
              </span>{" "}
              <span>Stripe</span>
            </button>
            <button
              onClick={() => toast("⏳ coming soon")}
              className="flex items-center gap-1 border rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow h-[52px] w-[183px]"
            >
              <img src={sslcommerz} alt="" />
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
            onClick={() => {
              setIsOpen(true);
              btnRef.current.click();
            }}
            // onClick={handleClickSubmit}
            className="w-full flex items-center justify-center gap-4 bg-[#4947FB] text-white py-3 px-4 rounded-md mt-5 scale-100 active:scale-95 transition duration-300"
          >
            Pay Now <GoArrowRight />
          </button>

          {/* Modal */}
          <CheckoutModal
            isOpen={isOpen}
            // refetch={refetch}
            closeModal={closeModal}
            orderInfo={orderInfo}
            postOrderInfoInDB={postOrderInfoInDB}
          />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
