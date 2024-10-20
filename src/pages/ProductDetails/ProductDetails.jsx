import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";

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
      <div>
        <div>
          <div>
            <img src="https://i.ibb.co.com/LZLcY9T/Professional-Soccer-Ball.webp" alt="" />
          </div>
          <div>
            
          </div>
          <div>
            <button>Featured</button>
            <i><IoSearch /></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
