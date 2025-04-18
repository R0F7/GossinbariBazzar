import { FaRegClock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
// import Map from "../Map/Map";

const ContactUs = () => {
  return (
    <div className="container mx-auto">
      {/* page location  */}
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-1.5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Pages</h4>
        </div>
        <div className="flex items-center gap-1">
          <i>
            <IoIosArrowBack />
          </i>
          <h4>Previous page</h4>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Contact Us</h1>
        {/* <div className="flex gap-4">
          <div className="border w-[20%] flex flex-col items-end">
            <i className="-ranslate-x-7 text-[#3691d9] text-2xl mb-1">
              <IoLocationSharp />
            </i>
            <div className="text-right">
              <h4 className="text-lg font-semibold text-[#3691d9]">
                Gossainbari
              </h4>
              <h6>Bogura Bangladesh</h6>
            </div>
          </div>
          <div className="border -[20%] flex flex-col">
            <i className="ranslate-x-7 text-[#3691d9] text-2xl mb-1">
              <FaRegClock />
            </i>
            <div>
              <h4 className="text-lg font-semibold text-[#3691d9]">
                Opening Hours
              </h4>
              <h6 className="-[70%]">
                The store’s opening hours are <strong>9 a.m.</strong> to{" "}
                <strong>6 p.m.</strong>{" "}
              </h6>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-px rounded">
          <div className="-[200px] h-[200px] flex items-end justify-end border-r border-b pr-3 pb-3">
            <div className="border w-[53%] bg-black bg-opacity-5 flex flex-col items-end py-4 pr-3.5 pl-24 rounded-md shadow">
              <i className="-ranslate-x-7 text-[#3691d9] text-2xl mb-1">
                <IoLocationSharp />
              </i>
              <div className="text-right">
                <h4 className="text-lg font-semibold text-[#3691d9]">
                  Gossainbari
                </h4>
                <h6 className="text-[#676F77]">Bogura Bangladesh</h6>
              </div>
            </div>
          </div>
          <div className="-[200px] h-[200px]"></div>
          <div className="-[200px] h-[200px]"></div>
          <div className="-[200px] h-[200px] border-l border-t pl-3 pt-3">
            <div className="border w-[53%] bg-black bg-opacity-5 flex flex-col py-4 pl-3.5 rounded-md shadow">
              <i className="ranslate-x-7 text-[#3691d9] text-2xl mb-1">
                <FaRegClock />
              </i>
              <div>
                <h4 className="text-lg font-semibold text-[#3691d9]">
                  Opening Hours
                </h4>
                <h6 className="text-[#676F77]">
                  The store’s opening hours are <strong>9 a.m.</strong> to{" "}
                  <strong>6 p.m.</strong>
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 flex gap-6">
          <div className="bg-[#F4F6F8] w-1/2 p-14 rounded-md">
            <h4 className="font-semibold mb-0.5">Have A Question?</h4>
            <p className="mb-6 text-[#676F77]">
              Your email address will not be published. Required fileds are
              marked*
            </p>
            <form className="grid grid-cols-2 gap-4 -[90%] mx-auto">
              <input
                type="text"
                name="name"
                id="name"
                className=" py-2.5 px-2 rounded-md shadow outline-none"
                placeholder="Name*"
                requiredL
              />
              <input
                type="email"
                name="email"
                id="email"
                className=" py-2 px-2.5 rounded-md shadow outline-none"
                placeholder="Email*"
                requiredL
              />
              <input
                type="text"
                name="subject"
                id="subject"
                className="col-span-2 py-2.5 px-2 rounded-md shadow outline-none"
                placeholder="Subject*"
                requiredL
              />
              <textarea
                name="message"
                id="message"
                className="col-span-2 py-2 px-2 h-[150px] rounded-md shadow outline-none"
                placeholder="Message*"
                required
              ></textarea>
              <span></span>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-[#4D9DDC] py-2.5 text-white font-bold text-sm rounded-md w-[80%] scale-100 active:scale-90 transition duration-200"
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>

          {/* <Map></Map> */}
          <div className="w-1/2 rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4336.100517541013!2d89.60214797594958!3d24.73923520009665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fda4ea95803269%3A0xd6fbb665ab04c7bf!2sGossainbari!5e1!3m2!1sen!2sus!4v1730484611269!5m2!1sen!2sus"
              className="w-full h-full rounded-md"
              allowfullscreen="true"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
