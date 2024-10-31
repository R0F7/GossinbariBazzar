import { GoSearch } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="container mx-auto">
      {/* page location  */}
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-1.5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Eco Technology</h4>
        </div>
        <div className="flex items-center gap-1">
          <i>
            <IoIosArrowBack />
          </i>
          <h4>Previous page</h4>
        </div>
      </div>

      <div className="flex">
        {/* left part */}
        <div className="w-1/4 pr-2">
          <form className="flex items-center relative mb-6">
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

          {/* blogs categories */}
          <div className="">
            <h4 className="text-lg font-semibold text-gray-700 mb-1.5">
              Blog Categories{" "}
            </h4>
            <ul>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[15px] text-[rgb(46,141,216)] "
                    : "text-sm"}
              >
                Eco Technology <span className="ml-1 text-sm">(3)</span>
              </NavLink>

            </ul>
          </div>
        </div>

        {/* right part */}
        <div className="w-3/4 pl-4 border-gray-300 border-l h-screen"></div>
      </div>
    </div>
  );
};

export default Blogs;
