import { GoSearch } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import banner from "../../assets/help-center-banner.jpg";

const HelpCenter = () => {
  return (
    <section className="container mx-auto">
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
        <h1 className="text-2xl font-bold text-[#212B36]">Help Center</h1>
      </div>

      {/* banner with search bar */}
      <div className="my-5 relative">
        <div className="h-[400px] relative top-0 left-0">
          <img className="h-full w-full" src={banner} alt="" />
          <div className="bg-black h-full absolute z-50"></div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-5 text-white">
            Hi, how can we help you?
          </h1>
          <form className="flex items-center relative mb-6 w-[35%]">
            <input
              type="text"
              name="search"
              id="search"
              className="border border-[#0000001a] w-full py-2 pl-3 shadow rounded-md bg-[#F4F6F8] outline-none"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 font-bold text-xl"
            >
              <GoSearch />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
