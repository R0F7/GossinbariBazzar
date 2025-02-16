import { FaLocationDot } from "react-icons/fa6";
import unknownImage from "../../../../assets/unknown Image.jpg";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { ImOffice } from "react-icons/im";
import { LuFileCode2 } from "react-icons/lu";
import { MdLocationCity } from "react-icons/md";

const SavedAddress = () => {
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const number = form.number.value;
    const website = form.url.value;
    const home_address = form.home.value;
    const office_address = form.office.value;
    const zip_code = form.zip_code.value;
    const city_name = form.city.value;
    const full_address = form.full_address.value;

    const formInfo = {
      email,
      number,
      website,
      home_address,
      office_address,
      zip_code,
      city_name,
      full_address,
    };

    console.table(formInfo);
  };

  return (
    <div className="min-h-screen w-full g-slate-800 g-opacity-85 bg-[} chic-bg">
      <div className="-[54%] w-[757px] mx-auto mt-20 relative overflow-hidden rounded-lg">
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
              <div className="flex justify-between">
                <h2 className="ext-slate-900 t ext-[#FF6B6B] t ext-[#00D1FF] text-[#FFD700] font-bold text-3xl textshado underline decoration-wavy pb-6">
                  Jonathan Smith.
                </h2>
                {/* <button className={`bg-[#4B0082] px-6 h-10 rounded-md font-semibold translate-x-[87px] translate-y-[38px] rotate-90 shadow-md cale-100 active:scale-95 hover:font-bold hover:translate-x-0 hover:translate-y-0.5 hover:rotate-0 ${ toggle ? "scale-100" : "scale-0"} transition duration-300`}>SubmitX</button> */}
              </div>

              {/* info field */}
              <form
                className="grid grid-cols-2  gap-y-2 gap-x-8 mr-6 relative"
                onSubmit={handleSubmit}
              >
                {/* <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold nderline ecoration-double">
                      87594545454
                    </span>
                  </h4>
                </div> */}

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <MdEmail className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={"sample@gmail.com"}
                    placeholder="Enter Your Name"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent cu" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <IoCall className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    defaultValue={"01612500106"}
                    placeholder="Enter Your Number"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <TbWorld className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    defaultValue={"https://www.example.com"} // TODO: hide https://
                    placeholder="Enter Your Url"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />

                  {/* <input
                    type="url"
                    name="url"
                    id="url"
                    value={url} // Use value instead of defaultValue
                    onChange={(e) => setUrl(e.target.value)} // Update state on input change
                    placeholder="Enter Your Url"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  /> */}
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <IoHome className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="text"
                    name="home"
                    id="home"
                    defaultValue={"Gossainbari"}
                    placeholder="Enter Your Home Address"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <ImOffice className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="text"
                    name="office"
                    id="office"
                    defaultValue={""}
                    placeholder="Enter Your Office Address"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500 placeholder:text-slate-300 placeholder:text-sm`}
                    readOnly={!toggle}
                  />
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <LuFileCode2 className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="number"
                    name="zip_code"
                    id="zip_code"
                    defaultValue={"87594"}
                    placeholder="Enter Your Zip code"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <MdLocationCity className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    defaultValue={"Bogura"}
                    placeholder="Enter Your City Name"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />
                </div>

                <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6] ext-opacity-90" />
                  </i>
                  <input
                    type="text"
                    name="full_address"
                    id="name"
                    defaultValue={`8759 Jones Lane\nKings Mountain,\nNC 28086`}
                    placeholder="Enter Your Name"
                    className={`bg-transparent font-bold border-b ${
                      !toggle ? "border-transparent" : "border-slate-100"
                    } outline-none pb-1 w-full transition duration-500`}
                    readOnly={!toggle}
                  />
                </div>

                <button
                  type="submit"
                  className={`absolute right-0 bg-[#4c0082] px-6 h-10 rounded-md font-semibold translate-x-[110px] -translate-y-[15px] rotate-90 shadow-md cale-100 active:scale-95 hover:font-bold hover:translate-x-0 hover:-translate-y-[57px] hover:rotate-0 ${
                    toggle ? "scale-100" : "scale-0 -translate-y-[170px]"
                  } transition duration-300`}
                >
                  Submit
                </button>

                {/* <div className="text-slate-700 flex gap-1.5 order-b pb-1 shadow-2xl w-[185px]">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6] text-opacity-90" />
                  </i>
                  <textarea
                    name="address"
                    id="address"
                    defaultValue={`8759 Jones Lane\nKings Mountain,\nNC 28086`}
                    placeholder="Enter Your Address"
                    className="bg-transparent font-bold border-b border-slate-50 outline-none pb-1 w-full resize-none"
                    rows="3"
                  />
                </div> */}

                {/* <div className="text-slate-700 flex gap-1.5">
                  <i>
                    <FaLocationDot className="w-4 h-4 mt-[5px] text-[#0077B6]" />
                  </i>
                  <h4 className="flex flex-col">
                    <span className="font-bold flex">
                      8759 Jones Lane <br />
                      Kings Mountain, <br /> NC 28086
                    </span>
                  </h4>
                </div> */}
              </form>
            </div>
          </div>
          <div className="bg-[#2E8DD8] w-[85%] h-4"></div>
          <div className="absolute top-0 left-0">
            <div className="bg-[#2E8DD8] w-36 h-7 translate-y-[204px] -translate-x-[30px] -rotate-45"></div>
          </div>
          <div className="bg-[#2E8DD8] w-[150px] h-[150px] absolute top-0 -left-0 -translate-x-20 -translate-y-[114px] rotate-45 shadow-md border border-slate-200 border-opacity-45"></div>
          <div className="absolute top-0 left-0 bg-[#2E8DD8] h-2 w-[150px] translate-x-[110px] translate-y-0 -rotate-45 shadow-md border border-slate-200 border-opacity-30 -z-50"></div>

          {/* Switch */}
          <div
            className={`w-14 h-6 border-2 rounded-full absolute top-10 right-10 shadow-lg ${
              toggle ? "bg-[#2E8DD8]" : "bg-transparent"
            } transition duration-500`}
          >
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
