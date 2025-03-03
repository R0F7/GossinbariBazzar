import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaAngleLeft, FaMotorcycle, FaRegUser, FaShippingFast } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GiSnail } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const Checkout = () => {
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <section className="container mx-auto g-black in-h-screen">
      <div>
        <button className="flex items-center gap-0.5 text-[#7A78F4] font-semibold py-4">
          <FaAngleLeft /> <span>Back to cart</span>
        </button>
        <h1 className="text-4xl mb-2">Checkout</h1>
        <p className="text-gray-500 font-light mb-5">
          a checkout is a counter where you pay for things you are buying
        </p>

        <div>
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
                    focusedField === "first_name" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col">
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
                  placeholder="First name"
                  onFocus={() => handleFocus("first_name")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg active-input"
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
                    focusedField === "last_name" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col">
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
                  placeholder="Last name"
                  onFocus={() => handleFocus("last_name")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg active-input"
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
                    focusedField === "phone_number" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm text-gray-500 ext-[#C8C7CA] font-medium ${
                    focusedField === "phone_number" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  Phone Number
                </span>
                <input
                  type="text"
                  id="phone_number"
                  placeholder="Phone number"
                  onFocus={() => handleFocus("phone_number")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg active-input"
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
                    focusedField === "email" ? "text-[#7A78F4]" : ""
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <div className="flex flex-col">
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
                  placeholder="Email"
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur()}
                  className="outline-none text-lg active-input"
                />
              </div>
            </label>
          </form>
        </div>

        <div className="mt-5">
          <h4 className="mb-4">1. Delivery method</h4>
          <div className="flex gap-6">
            <button className="flex items-center gap-2 border py-3 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow"><i><FaShippingFast /></i> <span>Same-day</span></button>
            <button className="flex items-center gap-2 border py-3 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow"><i><FaMotorcycle /></i> <span>Express</span></button>
            <button className="flex items-center gap-2 border py-3 px-5 rounded-xl font-medium hover:bg-[#4947FB] hover:text-white transition duration-300 shadow"><i><GiSnail /></i> <span>Normal</span></button>
            <label
              htmlFor="email"
              className={`flex items-center gap-2.5 border-b pl-2.5 pb-1.5 ${
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
                  Email
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
      </div>

      <div></div>
    </section>
  );
};

export default Checkout;
