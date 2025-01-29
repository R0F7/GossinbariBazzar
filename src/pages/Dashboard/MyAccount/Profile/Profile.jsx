import { useEffect, useState } from "react";
import unknownImage from "../../../../assets/unknown Image.jpg";
import useAuth from "../../../../hooks/useAuth";
import { TbEditOff, TbPhotoEdit } from "react-icons/tb";
import { MdOutlineVpnKey, MdOutlineVpnKeyOff } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const Profile = () => {
  const { user, user_info_DB } = useAuth();
  const [focusedField, setFocusedField] = useState(null);
  
  //   TODO:save state in localStorage
  const [toggleImage, setToggleImage] = useState(true);
  const [togglePassword, setTogglePassword] = useState(true);

  const [savePassword, setSavePassword] = useState(false);
  //   console.log(user?.providerData[0]?.uid);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const date_of_birth = form.DB.value;
    const address = form.address.value;
    const about = form.about.value;

    console.table(name, email, number, date_of_birth, address, about);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setSavePassword(true);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSavePassword(false);
    }, 5000);

    return () => {
      clearTimeout(timeOutId);
      //   console.log("save password");
    };
  }, [savePassword]);

  return (
    <div className="border flex justify-center h-[97%] items-center bg-gradient-to-r from-[#2E8DD8] via-[#FFD700] to-[#4B0082]">
      <div className="border w-full g-white g-opacity-75 glass-bg py-9 m-[94px] rounded-md shadow flex justify-center">
        <div className="w-ful">
          <div className="">
            {/* <h4 className="text-slate-800 font-bold text-lg mb-3">
              Profile picture
            </h4> */}
            <div className="flex items-center gap-4">
              {/* image part */}
              <div className="w-24 h-24 rounded-full p-[5px] bg-gradient-to-r from-[#3A92CC] to-[#feb47b]">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={user?.photoURL || unknownImage}
                  alt="User Avatar"
                />
              </div>

              <div className="flex gap-">
                <div className="">
                  <h3 className="text-lg font-bold">
                    {user?.displayName}{" "}
                    <span className="text-[#4F0480] text-sm">
                      ({user_info_DB?.role})
                    </span>
                  </h3>
                  <h4 className="text-slate-600 font-bold">
                    UID :{" "}
                    <span className="font-semibold">
                      {user?.providerData[0]?.uid}
                    </span>
                  </h4>
                  <h4 className="text-slate-600">{user?.email}</h4>
                </div>

                <div className="mt-1 -mr-2.5">
                  <div
                    onClick={() => setToggleImage(!toggleImage)}
                    className="w-10 h-10 p-2 ml-2.5 rounded-full hover:bg-white hover:bg-opacity-30 transition duration-500 flex items-center justify-center text-xl"
                  >
                    {toggleImage ? (
                      <TbEditOff title="Cancel Edit" />
                    ) : (
                      <TbPhotoEdit title="Edit Image" />
                    )}
                  </div>

                  <div
                    onClick={() => setTogglePassword(!togglePassword)}
                    className="w-10 h-10 p-2 ml-2.5 rounded-full hover:bg-white hover:bg-opacity-30 transition duration-500 flex items-center justify-center text-xl"
                  >
                    {togglePassword ? (
                      <MdOutlineVpnKeyOff title="Cancel Edit" />
                    ) : (
                      <MdOutlineVpnKey title="Edit Password" />
                    )}
                  </div>
                </div>

                {/* buttons */}
                <div
                  className={`flex flex-col gap-3 border-l-2 pl-6 ml-6 border-[#540B7B] ${
                    toggleImage ? "scale-y-100 " : "scale-y-0"
                  } transition duration-300 origin-top`}
                >
                  <button className="upload-button h-[35px] w-[120px] text-sm shadow hover:shadow-md active:scale-95 scale-100 transition duration-300">
                    Upload Img
                  </button>
                  <button className="remove-button h-[35px] w-[120px] text-sm shadow hover:shadow-md active:scale-95 scale-100 transition-transform duration-300">
                    Save
                  </button>
                </div>

                <div className="">
                  <form
                    onSubmit={handleChangePassword}
                    className={`flex flex-col gap-3 border-l-2 pl-6 ml-6 border-[#540B7B] ${
                      togglePassword ? "scale-x-100" : "scale-x-0"
                    } transition duration-300 origin-left`}
                  >
                    <label
                      htmlFor="changePassword"
                      className="flex flex-col gap-4 b-2.5 relative"
                    >
                      <span className="text-slate-600 font-semibold">
                        Change Password
                      </span>
                      <input
                        type="password"
                        name="changePassword"
                        id="changePassword"
                        placeholder="Change Password"
                        onFocus={() => handleFocus("changePassword")}
                        onBlur={handleBlur}
                        className="border-2 border-[#3B91CA] py-2 pl-3 pr-6 outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                      />
                    </label>
                    <span
                      className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-[33px] right-8 bg-[#C19761] ${
                        focusedField === "changePassword"
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      } transition duration-1000 `}
                    >
                      Password
                    </span>
                    <button
                      type="submit"
                      title="Save Password"
                      className="absolute right-3 top-[52px] rounded-full hover:bg-[#2E8DD8] hover:text-white hover:text-opacity-80 hover:scale-[1.23] scale-100 active:scale-95 transition duration-300"
                    >
                      {savePassword ? <FaCircleCheck /> : <FaRegCheckCircle />}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* form part */}
          <div className="-[65%] mt-10 x-auto">
            <form
              className="grid grid-cols-2 gap-x-6 gap-y-3"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name" className="flex flex-col gap-2 relative">
                <span className="text-slate-500 font-semibold">Full Name</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user?.displayName}
                  placeholder="Jane Doe"
                  className="border-2 border-[#3B91CA] p-2.5 outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                />
                <span
                  className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-9 right-9 bg-[#D6C759] ${
                    focusedField === "name" ? "scale-100" : "scale-0"
                  } transition duration-1000`}
                >
                  Full Name
                </span>
              </label>
              <label htmlFor="email" className="flex flex-col gap-2 relative">
                <span className="text-slate-500 font-semibold">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                  placeholder="Jane@Doe.com"
                  className="border-2 border-[#3B91CA] p-2.5  outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                />
                <span
                  className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-9 right-9 bg-[#C19761] ${
                    focusedField === "email" ? "scale-100" : "scale-0"
                  } transition duration-1000`}
                >
                  Email Address
                </span>
              </label>
              <label htmlFor="number" className="flex flex-col gap-2 relative">
                <span className="text-slate-500 font-semibold">
                  Phone Number
                </span>
                <input
                  type="number"
                  name="number"
                  id="number"
                  defaultValue={user_info_DB?.number}
                  placeholder="0123456789"
                  className="border-2 border-[#3B91CA] p-2.5  outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                  onFocus={() => handleFocus("number")}
                  onBlur={handleBlur}
                />
                <span
                  className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-[38px] right-9 bg-[#D4C95C] ${
                    focusedField === "number" ? "scale-100" : "scale-0"
                  } transition duration-1000`}
                >
                  Number
                </span>
              </label>
              <label htmlFor="DB" className="flex flex-col gap-2 relative">
                <span className="text-slate-500 font-semibold">
                  Date of Birth
                </span>
                <input
                  type="date"
                  name="DB"
                  id="DB"
                  className="border-2 border-[#3B91CA] p-2.5  outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                  onFocus={() => handleFocus("date-of-birth")}
                  onBlur={handleBlur}
                />
                <span
                  className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-[38px] right-9 bg-[#C19860] ${
                    focusedField === "date-of-birth" ? "scale-100" : "scale-0"
                  } transition duration-1000`}
                >
                  Date of Birth
                </span>
              </label>
              <label
                htmlFor="address"
                className="flex flex-col gap-2 col-span-2 relative"
              >
                <span className="text-slate-500 font-semibold">Address</span>
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={user_info_DB?.address}
                  placeholder="Jane Doe"
                  className="border-2 border-[#3B91CA] p-2.5  outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                  onFocus={() => handleFocus("address")}
                  onBlur={handleBlur}
                />
                <span
                  className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-9 right-9 bg-[#C19860] ${
                    focusedField === "address" ? "scale-100" : "scale-0"
                  } transition duration-1000`}
                >
                  Address
                </span>
              </label>
              <label
                htmlFor="about"
                className="flex flex-col gap-2 col-span-2 relative"
              >
                <span className="text-slate-500 font-semibold">About</span>
                <textarea
                  name="about"
                  id="about"
                  placeholder="Write a quirky intro or a heartfelt description..."
                  className="border-2 border-[#3B91CA] p-2.5 h-[120px] outline-none rounded-md focus:border-[#2E8DD8] focus:border-2 focus:border-l-[#530A7C] focus:border-t-[#530A7C] text-slate-600 bg-transparent border-b-2 border-t-transparent border-l-transparent transition duration-1000 shadow-lg focus:shadow-xl placeholder:font-semibold font-semibold placeholder:text-slate-500"
                  onFocus={() => handleFocus("about")}
                  onBlur={handleBlur}
                ></textarea>
                <span
                  className={`text-xs font-semibold text-slate-700 border border-[#530A7C] w-[100px] text-center py-0.5 rounded-full shadow-md absolute bottom-[115px] right-9 bg-[#C19860] ${
                    focusedField === "about" ? "scale-100" : "scale-0"
                  } transition duration-1000`}
                >
                  About
                </span>
              </label>
              <div>
                <button
                  type="submit"
                  className="bg-[#2E8DD8] text-white font-semibold mt-2 py-2.5 px-36 rounded-md active:scale-95 scale-100 transition duration-300"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
