import { MdOutlineFileUpload, MdUpdate } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const UPdateProfile = () => {
  const { user, user_info_DB,address } = useAuth();
  const gmtTime = new Date(user?.metadata?.lastSignInTime);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Dhaka",
  };

  console.log(address);

  // name and preview for choose image
  const [imagePreview, setImagePreview] = useState("");
  const [imageText, setImageText] = useState("");

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  console.log(imagePreview);

  const formattedLocalDate = gmtTime.toLocaleString("en-US", options);
  // console.log(formattedLocalDate);

  const name = user?.displayName.split(" ") || [];

  return (
    <section className="bg-[#F9F9FB] h-screen">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-[#212B36] mb-6 pt-5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Update Profile</h4>
        </div>
        <div className="flex justify-center items-center h-[calc(100vh-400px)]">
          <div className="w-[70%]">
            <section className="flex bg-white">
              {/* left part */}
              <div className="border order-r-0 w-1/4 flex flex-col items-center py-10">
                <div className="h-20 w-20 rounded-full border p-1">
                  <img
                    className="w-full h-full rounded-full"
                    src={user?.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center mt-1">
                  <h4 className="">{user?.displayName}</h4>
                  <h4 className="bg-[#4B0082] inline-block text-white px-2.5 py-px rounded-full text-sm mb-1">
                    {/* <span>Role: </span> */}
                    {user_info_DB?.role}
                  </h4>
                  <h4 className="">{user?.email}</h4>
                  <hr className="m-2.5" />
                  <h6>
                    <span className="font-bold">Last logged in: </span>
                    <br />
                    <span className="w-[70%] mx-auto text-sm text-gray-600 flex flex-wrap">
                      {formattedLocalDate}
                    </span>
                  </h6>
                </div>
              </div>

              {/* right part */}
              <div className="w-3/4 border p-4">
                <h3 className="text-lg font-bold">Profile</h3>
                <div>
                  <div className="flex mt-3 gap-4 ">
                    <img
                      className="w-[75px] h-[75px] rounded-md"
                      src={imagePreview ? imagePreview : user?.photoURL}
                      alt="imagePreview"
                      referrerPolicy="no-referrer"
                    />
                    <label htmlFor="file">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImage(e.target.files[0])}
                      />
                      <div className="py-1.5 px-4 text-sm font-bold cursor-pointer bg-[#2E8DD8] shadow-md hover:shadow-lg hover:shadow-[rgba(46,141,216,.25)] text-white rounded active:scale-95 scale-100 transform duration-150 flex items-center gap-1">
                        <i className="text-lg font-semibold">
                          <MdOutlineFileUpload />
                        </i>
                        <h4>
                          {imageText.length > 10
                            ? imageText.split(".")[0].slice(0, 10) +
                              "..." +
                              imageText.split(".")[1]
                            : imageText && imageText > 0
                            ? imageText
                            : "Update Image"}
                        </h4>
                        {/* <h4>Upload Image</h4> */}
                      </div>
                    </label>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-end">
                      <label
                        htmlFor="first_name"
                        className="flex items-center gap-2 ext-[#4B0082]"
                      >
                        First Name:
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          // defaultValue={name && name[0]}
                          defaultValue={name[name?.length - 2]}
                          placeholder="Enter your first name"
                          className="border-[1.5px] w-[220px] p-1.5 rounded-md outline-none focus:ring focus:ring-[#2E8DD8] placeholder:text-sm"
                        />
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <label
                        htmlFor="last_name"
                        className="flex items-center gap-2 ext-[#4B0082]"
                      >
                        Last Name:
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          defaultValue={name[name?.length - 1]}
                          placeholder="Enter your last name"
                          className="border-[1.5px] w-[220px] p-1.5 rounded-md outline-none focus:ring focus:ring-[#2E8DD8] placeholder:text-sm"
                        />
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <label
                        htmlFor="phone_number"
                        className="flex items-center gap-2 ext-[#4B0082]"
                      >
                        Phone Number:
                        <input
                          type="number"
                          name="phone_number"
                          id="phone_number"
                          defaultValue={
                            user_info_DB?.number === "N/A"
                              ? ""
                              : user_info_DB?.number
                          }
                          placeholder="Enter your phone number"
                          className="border-[1.5px] w-[220px] p-1.5 rounded-md outline-none focus:ring focus:ring-[#2E8DD8] placeholder:text-sm"
                        />
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <label
                        htmlFor="password"
                        className="flex items-center gap-2 ext-[#4B0082]"
                      >
                        Change Password:
                        <input
                          type="text"
                          name="password"
                          id="password"
                          placeholder="Enter your New Password"
                          className="border-[1.5px] w-[220px] p-1.5 rounded-md outline-none focus:ring focus:ring-[#2E8DD8] placeholder:text-sm"
                        />
                      </label>
                    </div>

                    <span></span>

                    <div className="flex justify-center col-span-2 pb-3">
                      <button
                        type="submit"
                        className="bg-[#4B0082] flex justify-center items-center gap-1 text-white py-2.5 px-7 hover:px-14 rounded-md text-sm font-bold scale-100 active:scale-95 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#4c00823f]"
                      >
                        <MdUpdate className="text-lg" />
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UPdateProfile;
