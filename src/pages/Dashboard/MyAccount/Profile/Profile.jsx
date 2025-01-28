import unknownImage from "../../../../assets/unknown Image.jpg";
import useAuth from "../../../../hooks/useAuth";

const Profile = () => {
  const { user, user_info_DB } = useAuth();
  console.log(user_info_DB);

  return (
    <div className="border flex justify-center h-[98%] items-center bg-gradient-to-r from-[#2E8DD8] via-[#FFD700] to-[#4B0082]">
      <div className="border w-full bg-white bg-opacity-75 p-4 m-4 rounded-md shadow flex justify-center">
        <div className="w-ful">
          <div className="">
            <h4 className="text-slate-500 font-semibold text-lg mb-3">
              Profile picture
            </h4>
            <div className="flex items-center gap-4">
              {/* image part */}
              <div className="w-24 h-24 border-2 rounded-xl">
                <img
                  className="w-full h-full rounded-xl"
                  src={user?.photoURL || unknownImage}
                  alt=""
                />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  {user?.displayName} <span>({user_info_DB?.role})</span>
                </h3>
                <h3 className="text-slate-600">{user?.email}</h3>
              </div>

              {/* buttons */}
              {/* <div className="flex flex-col ml-3.5 gap-3">
              <button className="upload-button h-[45px] w-[140px] shadow hover:shadow-md active:scale-95 scale-100 transition duration-300">
                Upload now
              </button>
              <button className="remove-button h-[45px] w-[140px] shadow hover:shadow-md active:scale-95 scale-100 transition-transform duration-300">
                Remove
              </button>
            </div> */}
            </div>

            {/* <span className="w-[2px] bg-[#2E8DD8] mx-10"></span> */}

            {/* change password field */}
            {/* <div className="mt-2 flex flex-col items-center">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Change Password"
              className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600"
            />
            <button className="bg-[#2E8DD8] text-white font-semibold mt-2 py-2.5 px-6 rounded-md active:scale-95 scale-100 transition duration-300">
              Submit
            </button>
          </div> */}
          </div>

          {/* form part */}
          <div className="-[65%] mt-10 x-auto">
            <form className="grid grid-cols-2 gap-x-6 gap-y-3">
              <label htmlFor="name" className="flex flex-col gap-2">
                <span className="text-slate-500 font-semibold">Full Name</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user?.displayName}
                  placeholder="Jane Doe"
                  className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
                />
              </label>
              <label htmlFor="email" className="flex flex-col gap-2">
                <span className="text-slate-500 font-semibold">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                  placeholder="Jane@Doe.com"
                  className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
                />
              </label>
              <label htmlFor="number" className="flex flex-col gap-2">
                <span className="text-slate-500 font-semibold">
                  Phone Number
                </span>
                <input
                  type="number"
                  name="number"
                  id="number"
                  defaultValue={user_info_DB?.number}
                  placeholder="0123456789"
                  className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
                />
              </label>
              <label htmlFor="DB" className="flex flex-col gap-2">
                <span className="text-slate-500 font-semibold">
                  Date of Birth
                </span>
                <input
                  type="date"
                  name="DB"
                  id="DB"
                  className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
                />
              </label>
              <label
                htmlFor="address"
                className="flex flex-col gap-2 col-span-2"
              >
                <span className="text-slate-500 font-semibold">Address</span>
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={user_info_DB?.address}
                  placeholder="Jane Doe"
                  className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
                />
              </label>
              <label htmlFor="about" className="flex flex-col gap-2 col-span-2">
                <span className="text-slate-500 font-semibold">About</span>
                <textarea
                  name="about"
                  id="about"
                  placeholder="About"
                  className="border-2 border-slate-400 p-2.5 h-[120px] outline-none rounded-md focus:border-[#2E8DD8] focus:border- text-slate-600 "
                ></textarea>
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
