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

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  // TODO: add dynamic category

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
        <div>
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
          <hr className="py-2.5"/>
          <div className="text-[#666D74] space-y-2">
            <h6>
              <span className="font-semibold">SKU:</span> <span>MEGA-OGN-111-01</span>
            </h6>
            <h6>
              <span className="font-semibold">Category:</span> <Link>Dairy & Eggs</Link>
            </h6>
            <h6>
              <span className="font-semibold">Tags:</span> <Link>Home Food</Link>,<Link> Lettuce</Link>,{" "}
              <Link>Onion</Link>,<Link>Vegetable </Link>
            </h6>
            <h6>
              <span className="font-semibold">Brand:</span> <Link>Betterfoods</Link>
            </h6>
          </div>
        </div>
        {/* relational product */}
        <div>
          <div>
            <h4>Related products</h4>
            <div>
              <i>
                <IoIosArrowForward />
              </i>
              <i>
                <IoIosArrowBack />
              </i>
            </div>
          </div>
          <hr />
          {/* product  */}
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <h4>Wholegood Organic</h4>
              <h5>Fennel</h5>
              <h6>450g</h6>
              <div>
                <del>$47.00</del>
                <h4>$32.00</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
