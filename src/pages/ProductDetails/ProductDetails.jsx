import { IoSearch } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import CustomPaging from "../../components/CustomPaging/CustomPaging";
import { FaRegHeart } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDropleft,
  IoIosArrowForward,
} from "react-icons/io";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import Slider from "react-slick";
import NextArrow from "../../components/Arrow/NextArrow";
import PrevArrow from "../../components/Arrow/PrevArrow";
import SliderComponent from "./SliderComponent";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  // TODO: add dynamic category
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    vertical: true,
    verticalSwiping: true,
    nextArrow: <NextArrow isTrue={true} />,
    prevArrow: <PrevArrow isTrue={true} />,
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/flashSales.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  console.log("ijol;");

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 text-[#212B36] mb-10 mt-5">
        <h4>Home</h4>
        <span>/</span>
        <h4>Dairy & Eggs</h4>
      </div>
      {/* title */}
      <div>
        <div>
          <div className="flex items-end gap-2  mb-3">
            <h2 className="text-2xl font-bold">Zesco Ripe Bananas</h2>
            <h6 className="text-[#637381] font-semibold">350G</h6>
          </div>
          <div className="space-x-3">
            <i>rating</i>
            <span className="text-[#637381]">1 customer review </span>
            <span className="text-[#637381] border-x px-3">Sold: 0 </span>
            <span className="text-[#637381]">
              <span className="text-[#919eab]">Sold by:</span> Gia Marquez
            </span>
          </div>
        </div>
        {/* icon  */}
        <div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-8">
        {/* product image */}
        <div className="">
          <div className="flex items-center justify-end relative right-10 top- ">
            {/* <button>Featured</button> */}
            <i className="text-2xl">
              <IoSearch />
            </i>
          </div>
          <div className="">
            <CustomPaging></CustomPaging>
          </div>
        </div>
        {/* product details */}
        <div className="x-4">
          <div className="flex items-center justify-between text-xl font-bold ">
            <h4 className="text-red-600">$120.00</h4>
            <i>
              <FaRegHeart />
            </i>
          </div>
          <p className="text-[#666D74] my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl
            tortor, lobortis non tortor sit amet, iaculis rhoncus ipsum. Fusce
            ornare nunc maximus dui molestie.
          </p>
          <h4 className="">
            Availability:{" "}
            <span className="font-semibold text-green-500">6 in stock</span>
          </h4>
          <div className="border w-[130px] flex items-center justify-around py-1.5 text-lg font-bold rounded-md shadow my-3.5">
            <button className="text- active:scale-75 scale-100 duration-200">
              <FiMinus />
            </button>
            <span>1</span>
            <button className="active:scale-75 scale-100 duration-200">
              <FiPlus />
            </button>
          </div>
          <div className="flex flex-col space-y-2 mb-6">
            <button className="g-[#76c893] bg-[#0077b6] text-white py-2.5 rounded-lg font-bold -[65%] shadow active:scale-95 scale-100 duration-200">
              Add to cart
            </button>
            <button className="bg-[#FFB240] py-2.5 rounded-lg font-bold -[65%] shadow active:scale-95 scale-100 duration-200">
              Buy Now{" "}
            </button>
          </div>
          <hr className="py-2.5" />
          <div className="text-[#666D74] space-y-2">
            <h6>
              <span className="font-semibold">SKU:</span>{" "}
              <span>MEGA-OGN-111-01</span>
            </h6>
            <h6>
              <span className="font-semibold">Category:</span>{" "}
              <Link>Dairy & Eggs</Link>
            </h6>
            <h6>
              <span className="font-semibold">Tags:</span>{" "}
              <Link>Home Food</Link>,<Link> Lettuce</Link>, <Link>Onion</Link>,
              <Link>Vegetable </Link>
            </h6>
            <h6>
              <span className="font-semibold">Brand:</span>{" "}
              <Link>Betterfoods</Link>
            </h6>
          </div>
        </div>
        {/* relational product */}
        <div className="pl-14">
          <div className="flex items-center gap-8 mb-3.5">
            <h4 className="text-[#212B36] font-semibold text-lg">
              Related products
            </h4>
          </div>
          <div>
            <div className="slider-container">
              {/* <SliderComponent></SliderComponent> */}
              <Slider {...settings}>
                {data.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mt-2.5 border-t pt-2">
                      <div className="h-20 w-20">
                        <img
                          className="w-full h-full object-cover"
                          src="https://i.ibb.co/4MP2YDc/Fresh-Organic-Tomatoes.webp" // Updated the image URL
                          alt="Product Image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4>Wholegood Organic</h4>
                        <h6 className="text-sm text-[#666D74] font-semibold mb-1">
                          450g
                        </h6>
                        <div className="flex items-center gap-3 font-bold">
                          <del className="text-gray-500">$47.00</del>
                          <h4 className="text-red-500">$32.00</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-20">
        <div className="w-1/2">
          <h4 className="font-semibold">Frequently Bought Together</h4>
          <div className="flex items-center gap-2 text-2xl w-28 h-28 mt-1 mb-2.5">
            <img
              src="https://i.ibb.co.com/b6Xrj6X/Men-s-Casual-T-shirt.jpg"
              className="w-full h-full"
              alt=""
            />
            <span>+</span>
            <img
              src="https://i.ibb.co.com/b6Xrj6X/Men-s-Casual-T-shirt.jpg"
              className="w-full h-full"
              alt=""
            />
            <span>+</span>
            <img
              src="https://i.ibb.co.com/b6Xrj6X/Men-s-Casual-T-shirt.jpg"
              className="w-full h-full"
              alt=""
            />
          </div>
          <ul className="list-disc">
            <li>
              <strong>Tescot durian :</strong>
              {/* <span>-</span> */}
              <span>$60.00</span>
            </li>
            <li>
              <strong>Tescot durian :</strong>
              {/* <span>-</span> */}
              <span>$60.00</span>
            </li>
            <li>
              <strong>Tescot durian :</strong>
              {/* <span>-</span> */}
              <span>$60.00</span>
            </li>
          </ul>
        </div>
        <div className="w-1/2">
          <h6><strong>Price for all:</strong><span>$260.00</span></h6>
          <button>Add all to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
