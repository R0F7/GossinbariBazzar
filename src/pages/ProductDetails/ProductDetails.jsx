import { IoSearch } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import CustomPaging from "../../components/CustomPaging/CustomPaging";
import { FaRegHeart } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDropleft,
  IoIosArrowForward,
} from "react-icons/io";

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
        <div className="border">
          <div className="flex items-center justify-between">
            <button>Featured</button>
            <i>
              <IoSearch />
            </i>
          </div>
          <div className="">
            {/* <img src="https://i.ibb.co.com/LZLcY9T/Professional-Soccer-Ball.webp" alt="" /> */}
            <CustomPaging></CustomPaging>
          </div>
        </div>
        {/* product details */}
        <div>
          <div>
            <h4>$120.00</h4>
            <i>
              <FaRegHeart />
            </i>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl
            tortor, lobortis non tortor sit amet, iaculis rhoncus ipsum. Fusce
            ornare nunc maximus dui molestie.
          </p>
          <div>
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div>
          <button>Add to cart</button>
          <button>Buy Now </button>
          <hr />
          <div>
            <h6>
              SKU: <span>MEGA-OGN-111-01</span>
            </h6>
            <h6>
              Category:: <Link>Dairy & Eggs</Link>
            </h6>
            <h6>
              Tags: : <Link>Home Food</Link>,<Link> Lettuce</Link>,{" "}
              <Link>Onion</Link>,<Link>Vegetable </Link>
            </h6>
            <h6>
              SKU: <span>MEGA-OGN-111-01</span>
            </h6>
            <h6>
              Brand <Link>Betterfoods</Link>
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
