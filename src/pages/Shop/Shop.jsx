import { IoIosArrowBack } from "react-icons/io";

const Shop = () => {
  return (
    <div className="container mx-auto">
      {/* page location  */}
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-1.5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Shop</h4>
        </div>
        <div className="flex items-center gap-1">
          <i>
            <IoIosArrowBack />
          </i>
          <h4>Previous page</h4>
        </div>
      </div>
      <h1 className="font-bold text-2xl mb-4">Shop</h1>

      <div className="flex">
        {/* shop left side */}
        <div className="w-1/6 border">
          <h4>Product categories</h4>
        </div>

        {/*shop right side  */}
        <div className="w-5/6 ">
          <div className="flex justify-between">
            <h4>Showing 1-12 of 50 results</h4>
            <div className="flex items-center gap-4">
              {/* sort div */}
              <div className="flex border  py-2 px-2 rounded-md ">
                <h4>Sort by:</h4>
                <select name="" id="" className="outline-none text-[#333]" defaultValue=''>
                  <option value="" disabled selected hidden>Default sorting</option>
                  <option value="">Sort by popularity</option>
                  <option value="">Sort by average rating</option>
                  <option value="">Sort by latest</option>
                  <option value="">Sort by price: low to high</option>
                  <option value="">Sort by price: high to low</option>
                </select>
              </div>

              {/* grid icon */}
              <div className="flex gap-2">
                <div className="grid grid-cols-3 gap-0.5 w-6">
                  <div className="w-1.5 h-1.5 bg-black"></div>
                  <div className="w-1.5 h-1.5 bg-black"></div>
                  <div className="w-1.5 h-1.5 bg-black"></div>
                  <div className="w-1.5 h-1.5 bg-black"></div>
                  <div className="w-1.5 h-1.5 bg-black"></div>
                  <div className="w-1.5 h-1.5 bg-black"></div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="w-6 h-1.5 bg-black"></div>
                  <div className="w-6 h-1.5 bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
