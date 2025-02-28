import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import chip from '../../../../assets/chip.png';

const PaymentInfo = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const dotGroups = 4;
  const dotsPerGroup = 4;

  const handleInputChangeCardNumber = (e) => {
    let value = e.target.value.replace(/\s+/g, ""); // Remove all spaces
    let formattedValue = value.match(/.{1,4}/g)?.join(" "); // Add space after every 4 digits
    setCardNumber(formattedValue ?? "");
  };

  const handleInputChangeDate = (e) => {
    let value = e.target.value.replace(/\D+/g, ""); // Remove all non-digit characters
    if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits

    let formattedValue = value.match(/.{1,2}/g)?.join("/") || ""; // Add slash after every 2 digits
    setExpiryDate(formattedValue);
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: "linear-gradient(90deg, #6F9BDA 0%, #4DC3DC 100%)",
      }}
    >
      <div className="h-[500px] w-[820px] bg-[#F5FAFD] overflow-hidden flex rounded-lg">
        <div className="bg-[#0369BB] h-[130%] w-[360PX] rotate-[17deg] -translate-y-24 -translate-x-24"></div>
        <div className="w-[460px] pl-4 pr-14 flex items-center ">
          <div>
            <h1 className="text-3xl font-semibold text-[#181713] mb-8">
              Your Payment Details
            </h1>
            <form className="grid space-y-5 relative">
              <label htmlFor="name" className="flex flex-col">
                <span className="text-[#464848] font-semibold uppercase b-0.5">
                  Cardholder Name
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="bg-transparent border-b border-[#888C8C] p-1.5 outline-none text-[#464849] font-semibold text-lg placeholder:text-base"
                />
              </label>

              <label htmlFor="number" className="flex flex-col">
                <span className="text-[#464848] font-semibold uppercase b-0.5">
                  Card Number
                </span>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleInputChangeCardNumber}
                  placeholder="Enter card number"
                  maxLength={19}
                  className="bg-transparent border-b border-[#888C8C] p-1.5 outline-none text-[#464849] font-semibold text-lg placeholder:text-base"
                />
              </label>

              <div className="grid grid-cols-5 gap-8">
                <label htmlFor="number" className="flex flex-col col-span-3">
                  <span className="text-[#464848] font-semibold uppercase b-0.5">
                    Expiration Date
                  </span>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleInputChangeDate}
                    placeholder="MM/YY"
                    maxLength={5} // Limit input length to 5 characters (including slash)
                    className="bg-transparent border-b border-[#888C8C] p-1.5 outline-none text-[#464849] font-semibold text-lg placeholder:text-base"
                  />
                </label>

                <label htmlFor="CVV" className="flex flex-col col-span-2">
                  <span className="text-[#464848] font-semibold uppercase b-0.5">
                    CVV
                  </span>
                  <input
                    type="password"
                    name="CVV"
                    id="CVV"
                    placeholder="CVV"
                    className="bg-transparent border-b border-[#888C8C] p-1.5 outline-none text-[#464849] font-semibold text-lg placeholder:text-base"
                  />
                </label>
              </div>

              <div className="flex items-center gap-1.5">
                <i>
                  <FaRegCheckCircle className="text-[#BACBAF]" />
                </i>
                <p className="text-[#626464] font-medium text-sm">
                  Save my details for future payments
                </p>
              </div>

              <button
                type="submit"
                className="bg-[#0369BB] text-white py-2.5 font-bold text-lg rounded-md translate-y-2.5 scale-100 active:scale-95 transition duration-300 shadow hover:shadow-md"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#3ED9EE] to-[#0495CC] h-[200px] w-[340px] rounded-xl absolute left-[260px] shadow-md p-6">
        <h1 className="text-lg font-semibold text-end text-slate-800">Rakibul Hassan</h1>
        <div className="flex flex-col justify-center space-y-5">
          <div className="w-[55px]">
            <img className="w-full h-full" src={chip} alt="" />
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: dotGroups }).map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <div className="flex space-x-1">
                  {Array.from({ length: dotsPerGroup }).map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className="h-1.5 w-1.5 bg-white rounded-full"
                    ></div>
                  ))}
                </div>
                {groupIdx < dotGroups - 1 && <div className="w-2"></div>}
              </React.Fragment>
            ))}
          </div>
          <h6 className="font-semibold text-slate-800">09 / 20</h6>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
