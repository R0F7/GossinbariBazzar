import { FaLocationDot } from "react-icons/fa6";
import unknownImage from "../../../../assets/unknown Image.jpg";
import { useState } from "react";

const SavedAddress = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="min-h-screen w-full g-slate-800 g-opacity-85 bg-[} chic-bg">
      <div className="w-[54%] mx-auto pt-20 relative overflow-hidden rounded-lg">
        <div className="ice-bg text-slate-500  rounded-lg shadow-lg relative pb-3 overflow-hidden mt-8">
          <div className="flex gap-6 py-10 pl-10">
            {/* circle */}
            <div className="relative">
              <div className="inline-block rounded-full p-5 bg-[#2E8DD8] shadow-xl ml-4 mt-2-md">
                <div className="w-[110px] h-[110px] rounded-full border-[7px] border-[#4B0082]">
                  <img
                    className="w-full h-full rounded-full"
                    src={unknownImage}
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute top-0 left-0 -z-50">
                <div className="bg-[#0077B6] w-[200px] h-[600px] -translate-y-[348px] -translate-x-[35px] rotate-45"></div>
              </div>
            </div>

            <div className="mt-24">
              <h2 className="ext-slate-900 t ext-[#FF6B6B] t ext-[#00D1FF] text-[#FFD700] font-bold text-3xl textshado underline decoration-wavy pb-6">
                Jonathan Smith.
              </h2>

              {/* info field */}
              <div className="grid grid-cols-2  gap-y-2 gap-x-14 mr-6">
                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold nderline ecoration-double">
                      87594545454
                    </span>
                  </h4>
                </div>

                <div className="text-slate-700 flex gap-1.5">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6]" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold">8759 Jones Lane</span>
                  </h4>
                </div>

                <div className="text-slate-700 flex gap-1.5">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6]" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold">8759 Jones Lane </span>
                  </h4>
                </div>

                <div className="text-slate-700 flex gap-1.5">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6]" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold">8759 Jones Lane </span>
                  </h4>
                </div>

                <div className="text-slate-700 flex gap-1.5">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6]" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold">8759 Jones Lane </span>
                  </h4>
                </div>

                <div className="text-slate-700 flex gap-1.5">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6]" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold flex">
                      8759 Jones Lane <br />
                      Kings Mountain, <br /> NC 28086
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#2E8DD8] w-[85%] h-4"></div>
          <div className="absolute top-0 left-0">
            <div className="bg-[#2E8DD8] w-36 h-7 translate-y-[204px] -translate-x-[30px] -rotate-45"></div>
          </div>
          <div className="bg-[#2E8DD8] w-[150px] h-[150px] absolute top-0 -left-0 -translate-x-20 -translate-y-[114px] rotate-45 shadow-md border border-slate-200 border-opacity-45"></div>
          <div className="absolute top-0 left-0 bg-[#2E8DD8] h-2 w-[150px] translate-x-[110px] translate-y-0 -rotate-45 shadow-md border border-slate-200 border-opacity-30 -z-50"></div>

          {/* Switch */}
          <div className={`w-14 h-6 border-2 rounded-full absolute top-10 right-10 shadow-lg ${ toggle ? "bg-[#2E8DD8]" : "bg-transparent"} transition duration-500`}>
            <button
              onClick={() => setToggle(!toggle)}
              className={`w-[30px] h-[30px] border rounded-full -translate-y-[5px] ${
                toggle ? "translate-x-7" : "-translate-x-0.5"
              }  bg-white active:scale-x-125 ctive:w-[36px] transition duration-500`}
            ></button>
          </div>
        </div>

        <div className="absolute -bottom-[1px] -right-[125px] -rotate-45">
          <div className="bg-[#2E8DD8] w-[250px] h-4 mb-2 translate-x-3 -translate-y-1"></div>
          <div className="bg-[#2E8DD8] w-[250px] h-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SavedAddress;
