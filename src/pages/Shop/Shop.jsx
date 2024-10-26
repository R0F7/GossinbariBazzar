import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../components/Card/Card";

const Shop = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["shopProducts"],
    queryFn: () => fetch("./flashSales.json").then((res) => res.json()),
  });
  //   console.log(products);

  const { data: categories = [] } = useQuery({
    queryKey: ["shopCategories"],
    queryFn: () => fetch("./categories.json").then((res) => res.json()),
  });
  //   console.log(categories);

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

      <div className="flex divide-x">
        {/* shop left side */}
        <div className="w-1/6 ">
          {/* categories */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Product categories</h4>
            <ul className="">
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  className="py-1.5 ml-1.5 order-b text-[#646B73] ext-sm font-medium"
                >
                  {category?.categoryName}
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-6" />

          {/* price */}
          <div>
            <h4 className="font-semibold mb-2">Price</h4>
            <input
              type="range"
              name="range"
              id="range"
              min="20"
              max="120"
              step="10"
            />
            <h4>Price : <span className="font-semibold"> $20 - $120</span></h4>
            <button className="mt-3 py-1.5 px-6 bg-[#2E8DD8] text-sm font-bold text-white rounded-md active:scale-90 scale-100 transform duration-200 ">Filter</button>
          </div>
        </div>

        {/*shop right side  */}
        <div className="w-5/6 pl-4">
          {/* heading */}
          <div className="flex justify-between">
            <h4>Showing 1-12 of 50 results</h4>
            <div className="flex items-center gap-4">
              {/* sort div */}
              <div className="flex border  py-2 px-2 rounded-md ">
                <h4>Sort by:</h4>
                <select
                  name=""
                  id=""
                  className="outline-none text-[#333]"
                  defaultValue=""
                >
                  <option value="" disabled selected hidden>
                    Default sorting
                  </option>
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
          {/* product */}
          <div className="grid grid-cols-5 my-8">
            {products.map((product) => (
              <Card key={product?._id} item={product}></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
