import useAuth from "../../hooks/useAuth";

const UPdateProfile = () => {
  const { user, user_info_DB } = useAuth();
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

  const formattedLocalDate = gmtTime.toLocaleString("en-US", options);
  // console.log(formattedLocalDate);

  return (
    <section className="bg-[#F9F9FB] h-screen">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-[#212B36] mb-6 mt-5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Update Profile</h4>
        </div>
        <div className="flex justify-center items-center h-[calc(100vh-500px)]">
          <div className="w-[70%]">
            <section className="flex bg-white">
              {/* left part */}
              <div className="border w-1/3 flex flex-col items-center py-10">
                <div className="h-20 w-20 rounded-full border p-1">
                  <img
                    className="w-full h-full rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
                <div className="text-center mt-1">
                  <h4 className="">{user?.displayName}</h4>
                  <h4 className="bg-[#4B0082] inline-block text-white px-2.5 py-px rounded-full text-sm mb-1">
                    {/* <span>Role: </span> */}
                    {user_info_DB?.role}
                  </h4>
                  <h4 className="">{user?.email}</h4>
                  <hr className="my-2.5" />
                  <h6>
                    <span className="font-bold">Last logged in: </span>
                    <br />
                    <h6 className="w-[70%] mx-auto text-sm text-gray-600">
                      {formattedLocalDate}
                    </h6>
                  </h6>
                </div>
              </div>

              {/* right part */}
              <div className="w-2/3 border p-4">
                <h3 className="text-lg font-bold">Profile</h3>

                <div>
                  {/* Personal Info */}
                  <div>
                    {/* <h4>Personal Info</h4> */}
                    <div>
                      <div className="flex mt-3 gap-4 ">
                        <img className="w-[75px] rounded-md" src={user?.photoURL} alt="" />
                        <div>
                          <input type="file" name="image" id="image" />
                          <button className="bg-[#4B0082] text-white py-1.5 px-3 rounded-md text-sm scale-100 active:scale-95 transition-all duration-200">Update Image</button>
                        </div>
                      </div>
                      <hr className="my-4"/>
                      <div className="grid grid-cols-2">
                        <label htmlFor="first_name" className="border">First Name
                          <input type="text" name="first_name" id="first_name" />
                        </label>
                        <label htmlFor="last_name">Last Name
                          <input type="text" name="last_name" id="last_name" />
                        </label>                        
                        <label htmlFor="phone_number">Phone Number
                          <input type="text" name="phone_number" id="phone_number" />
                        </label>
                        <label htmlFor="password">Change Password
                          <input type="text" name="password" id="password" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* contact info */}
                  <div></div>
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
