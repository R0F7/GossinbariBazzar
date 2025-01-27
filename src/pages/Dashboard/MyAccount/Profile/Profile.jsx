import unknownImage from "../../../../assets/unknown Image.jpg";

const Profile = () => {
  return (
    <div>
      <h4 className="text-slate-500 font-semibold text-lg mb-3">
        Profile picture
      </h4>

      {/* image part */}
      <div className="flex items-center">
        <div>
          <div className="w-32 h-32 border-2 rounded-xl">
            <img
              className="w-full h-full rounded-xl"
              src={unknownImage}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col ml-3.5 gap-3">
          <button className="upload-button h-[45px] w-[140px] shadow hover:shadow-md active:scale-95 scale-100 transition duration-300">
            Upload now
          </button>
          <button className="remove-button h-[45px] w-[140px] shadow hover:shadow-md active:scale-95 scale-100 transition-transform duration-300">
            Remove
          </button>
        </div>
      </div>

      {/* form part */}
      <div className="w-[65%]">
        <form className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
          <label htmlFor="name" className="flex flex-col gap-2">
            <span className="text-slate-500 font-semibold">Full Name</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Jane Doe"
              className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-2">
            <span className="text-slate-500 font-semibold">Email Address</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Jane@Doe.com"
              className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
            />
          </label>
          <label htmlFor="number" className="flex flex-col gap-2">
            <span className="text-slate-500 font-semibold">Phone Number</span>
            <input
              type="number"
              name="number"
              id="number"
              placeholder="0123456789"
              className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
            />
          </label>
          <label htmlFor="DB" className="flex flex-col gap-2">
            <span className="text-slate-500 font-semibold">Date of Birth</span>
            <input
              type="date"
              name="DB"
              id="DB"
              className="border-2 border-slate-400 p-2.5  outline-none rounded-md focus:border-[#2E8DD8] text-slate-600 "
            />
          </label>
          <label htmlFor="address" className="flex flex-col gap-2 col-span-2">
            <span className="text-slate-500 font-semibold">Address</span>
            <input
              type="text"
              name="address"
              id="address"
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
              className="border-2 border-slate-400 p-2.5 h-[120px] outline-none rounded-md focus:border-[#2E8DD8] focus:border-[3px] text-slate-600 "
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
  );
};

export default Profile;
