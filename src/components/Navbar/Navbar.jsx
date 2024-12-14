import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png";
import { FaCartPlus, FaChevronDown } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Unknown from "../../assets/unknown Image.jpg";
import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { CgMenuGridO, CgSearch } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
// import { GiFruitBowl } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
// import grocery from "../../assets/grocery.png";

const Navbar = () => {
  const { user, logOut, cartAddedProducts } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(isOpen);
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch("./categories.json").then((res) => res.json()),
  });
  // console.log(categories);
  const total_quantity = cartAddedProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  // console.log(cartAddedProducts);
  // console.log(total_quantity);

  return (
    <nav className="bg-[#eeeeeecc] g-opacity-80 pt-2.5 shadow relative z-50 fixed top-0 left-0">
      {/* <nav className="bg-white bg-opacity-10 backdrop-blur-md border border-white/30 rounded-lg shadow-lg p-4 relative z-50"> */}
      <div className="container mx-auto">
        {/* nav heading */}
        <div className=" text-[#637381] flex justify-between  text-[15px] static top-0 left-0">
          <div>
            <p>Free shipping on all orders over $99.</p>
          </div>
          <ul className="flex items-center gap-8">
            <li>Become A Vendor </li>
            <li>Order Tracking</li>
            <li>My Wishlist</li>
          </ul>
        </div>

        {/* nav body */}
        {/* <div className="fixed bg-red-600 w-full top- left- right-0"> */}
        <div className=" text-white font-bold flex items-center justify-between gap-6 my-5 ">
          <div className="flex items-center gap-[90px]">
            {/* name +/- logo */}
            <div className="flex items-center gap-3">
              <i
                className="text-3xl ext-[#4B0082] cursor-pointer hover:bg-[#cccccc] hover:text-white p-2 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                {!isOpen ? <FcMenu /> : <CgMenuGridO />}
              </i>
              <Link to="/">
                <div className="flex items-center gap-1">
                  <img className="w-12 rop-shadow-2xl" src={Logo} alt="" />
                  <h4 className="text-logo-font-family text-[#006400] text-lg">
                    Gossainbari<span className="text-[#4B0082]">Bazzar</span>
                  </h4>
                </div>
              </Link>
            </div>

            {/* search bar */}
            <div className="bg-[#F4F6F8] flex items-center shadow rounded-md border">
              <select
                defaultValue=""
                name="categories"
                id="categories"
                className="bg-transparent text-[#212b36] h-[49px] w-[70px] rounded-l-md px-2 outline-none"
              >
                <option value="" disabled>
                  All
                </option>
                {categories.map((category, idx) => (
                  <option key={idx}>{category?.categoryName}</option>
                ))}
              </select>
              <div className="flex ">
                <div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="bg-transparent py-2 px-3 placeholder:text-sm text-[#212b36] h-full w-[500px] outline-none"
                    placeholder="What are you shopping for?"
                  />
                </div>
                <button
                  type="submit"
                  className="text-[#212B36] text-2xl py-3 px-3.5 border-l"
                >
                  <CgSearch />
                </button>
              </div>
            </div>
          </div>

          {/*  cart icon + profile icon  */}
          <div className="g-red-600 flex items-center gap-6">
            <Link
              to="/cart"
              className="relative flex items-center py-1 px-2.5 text-[#212b36]"
            >
              <i className="text-2xl text-[#4B0082]">
                <FaCartPlus />
              </i>
              <h6
                className={`absolute -top-3 
                ${
                  total_quantity > 9 ? "-right-3.5" : "-right-2.5"
                } 
                border px-2 py-1 bg-[#2E8DD8] text-white text-xs rounded-full`}
              >
                {total_quantity || 0}
              </h6>
            </Link>
            <div onClick={() => setToggle(!toggle)} className="relative">
              {user ? (
                <div className="w-12 h-12 border-2 border-[#2E8DD8] hover:border-[#4B0082] transform duration-500 p-1.5 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full rounded-full"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || Unknown}
                    alt=""
                  />
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#343a40] text-white py-1.5 px-2.5 rounded-md shadow-lg hover:shadow-xl"
                >
                  <button className="join-us-btn">Join US</button>
                </Link>
              )}
              {/* {toggle && ( */}
              <div
                className={`bg-[#2E8DD8] bg-opacity absolute top-14 right-0 w-[220px] flex flex-col items-start justify-start rounded-md py-2 text-sm shadow-lg duration-500 ${
                  toggle ? "scale-x-100 origin-right" : "scale-x-0 origin-right"
                }`}
              >
                <Link to="/update-profile" className="w-full text-start py-1.5 px-2 hover:bg-[#E5E8EB] hover:text-[#2E8DD8]">
                  Update Profile
                </Link>
                <button className="border-y w-full text-start py-1.5 px-2 hover:bg-[#E5E8EB] hover:text-[#2E8DD8]">
                  Dashboard
                </button>
                <button
                  onClick={logOut}
                  className="w-full text-start py-1.5 px-2 hover:bg-[#E5E8EB] hover:text-[#2E8DD8]"
                >
                  Logout
                </button>
              </div>
              {/* // )} */}
            </div>
          </div>
        </div>

        {/* nav menu */}
        <div className="flex items-center justify-between mb-[18px] nav-menu header-menu">
          <ul className="flex items-center gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-transparent py-1 px-2.5 border-b-2 active"
                    : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-transparent py-1 px-2.5 active"
                    : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pages"
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-transparent py-1 px-2.5 active"
                    : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5 pages"
                }
              >
                Pages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-transparent py-1 px-2.5 active"
                    : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vendor"
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-transparent py-1 px-2.5 active"
                    : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                }
              >
                Vendor
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/flash-sales"
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-transparent py-1 px-2.5 active"
                    : "font-semibold text-[rgb(46,141,216)] py-1 px-2.5"
                }
              >
                Flash Sales
              </NavLink>
            </li>
          </ul>
          <div>
            <h4 className="flex items-center gap-2 text-[#212b36]">
              Recent Viewed Products{" "}
              <i>
                <FaChevronDown />
              </i>
            </h4>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* nav bottom color div */}
      <div className="grid grid-cols-8">
        <div className="h-1 bg-[#00AB55]"></div>
        <div className="h-1 bg-[#FFB240]"></div>
        <div className="h-1 bg-[#F11D1D]"></div>
        <div className="h-1 bg-[#00AB55] col-span-2"></div>
        <div className="h-1 bg-[#FFB240]"></div>
        <div className="h-1 bg-[#3AA4F1]"></div>
        <div className="h-1 bg-[#F11D1D]"></div>
      </div>
      {/* side menu */}
      <aside
        className={`w-[14%] bg-[#eeeeeecc] fixed top-0 left-0 h-screen z-50 side-menu ${
          isOpen ? "-translate-x-0" : "-translate-x-72"
        } transform transition-all duration-300 ease-in-out`}
      >
        <h4 className="flex items-center justify-between px-4 py-2 text-lg font-bold my-4 b-5 text-[#333333]">
          All categories{" "}
          <i
            onClick={() => setIsOpen(false)}
            className="cursor-pointer order hover:bg-[#cccccc] hover:text-white shadow p-2 rounded-full"
          >
            <RxCross2 />
          </i>
        </h4>
        <ul className="space-y- text-[#333333] font-bold">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 border-y border-[#212b3671] py-2.5 px-4 text-[#333333] ext-[rgb(46,141,216)] hover:text-[rgb(46,141,216)] over:text-[#fff] hover:bg-[#d0d0d0] rayscale hover:grayscale-0 transform duration-200"
            >
              <div className="w-7 h-7">
                <img className="w-full h-full" src={category?.icon} alt="" />
              </div>
              <h4>{category?.categoryName}</h4>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
