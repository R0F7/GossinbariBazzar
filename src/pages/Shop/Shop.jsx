import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
// import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { CgMenuGridR } from "react-icons/cg";
import { ImMenu } from "react-icons/im";
import CardX from "../../components/Card/CardX";

const Shop = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [grid, setGrid] = useState(true);

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

  // old way
  useEffect(() => {
    const allSubCategories = [];

    for (const subCategory of products) {
      // remove duplicate
      if (!allSubCategories.includes(subCategory.sub_category)) {
        allSubCategories.push(subCategory.sub_category);
      }
    }

    setSubCategories(allSubCategories);
  }, [products]);
  //   console.log(subCategories);

  //  new way
  useEffect(() => {
    const allTags = products.flatMap((product) => product.tags);
    // remove duplicate
    const uniqueTags = [...new Set(allTags)];
    setTags(uniqueTags);
  }, [products]);
  //   console.log(tags);

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
            <h4 className="font-semibold mb-2 text-lg">Price</h4>
            <input
              type="range"
              name="range"
              id="range"
              min="20"
              max="120"
              step="10"
            />
            <h4>
              Price : <span className="font-semibold"> $20 - $120</span>
            </h4>
            <button className="mt-3 py-1.5 px-6 bg-[#2E8DD8] text-sm font-bold text-white rounded-md active:scale-90 scale-100 transform duration-200 ">
              Filter
            </button>
          </div>

          <hr className="my-6" />

          <div>
            <h4 className="font-semibold mb-2 text-lg">Sub Categories</h4>
            <div className="space-y-2 space-x-2 mr-2">
              {subCategories.map((sCat, idx) => (
                <h4
                  key={idx}
                  className="border inline-block rounded-full text-sm py-0.5 px-3"
                >
                  {sCat}
                </h4>
              ))}
            </div>
          </div>

          <hr className="my-6" />

          {/* tags */}
          <div>
            <h4 className="font-semibold mb-2 text-lg">Tags</h4>
            <div className="space-y-2 space-x-2 mr-2">
              {tags.map((tag, idx) => (
                <h4
                  key={idx}
                  className="border inline-block rounded-full text-sm py-0.5 px-3"
                >
                  {tag}
                </h4>
              ))}
            </div>
          </div>
        </div>

        {/*shop right side  */}
        <div className="w-5/6 pl-4">
          {/* heading */}
          <div className="flex justify-between">
            <h4>Showing 1-12 of 50 results</h4>
            <div className="flex items-center gap-4">
              {/* sort div */}
              <div className="flex border  py-2 px-2 rounded-md shadow">
                <label htmlFor="sort">Sort by:</label>
                <select
                  name="sort"
                  id="sort"
                  className="outline-none text-[#333] px-2 "
                  defaultValue=""
                >
                  <option value="" disabled selected hidden>
                    Default sorting
                  </option>
                  <option value="" className="hover:bg-red-500">
                    Sort by popularity
                  </option>
                  <option value="">Sort by average rating</option>
                  <option value="">Sort by latest</option>
                  <option value="">Sort by price: low to high</option>
                  <option value="">Sort by price: high to low</option>
                </select>
                {/* <CustomDropdown></CustomDropdown> */}
              </div>

              {/* grid icon */}
              <div className="flex items-center gap-2.5">
                <h4 className="font-semibold text-sm">View As: </h4>
                <div className="flex gap-2 border p-2 shadow">
                  {/* <div className="grid grid-cols-3 gap-1 w-6 border-r multiple-col">
                    <div className="w-1.5 h-1.5 bg-black multiple-col-div"></div>
                    <div className="w-1.5 h-1.5 bg-black multiple-col-div"></div>
                    <div className="w-1.5 h-1.5 bg-black multiple-col-div"></div>
                    <div className="w-1.5 h-1.5 bg-black multiple-col-div"></div>
                    <div className="w-1.5 h-1.5 bg-black multiple-col-div"></div>
                    <div className="w-1.5 h-1.5 bg-black multiple-col-div"></div>
                  </div> */}
                  {/* <div className="flex flex-col gap-1 single-col">
                    <div className="w-6 h-1.5 bg-black single-col-div"></div>
                    <div className="w-6 h-1.5 bg-black single-col-div"></div>
                  </div> */}

                  <div
                    className={`text-2xl ${
                      grid ? "text-[#2E8DD8]" : "text-gray-400" 
                    } border-r pr-1.5`}
                    onClick={() => setGrid(true)}
                  >
                    <CgMenuGridR />
                  </div>
                  <div
                    className={`text-2xl ${
                      grid ? "text-gray-400" : "text-[#2E8DD8]"
                    }`}
                    onClick={() => setGrid(false)}
                  >
                    <ImMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* product */}
         { grid ? <div className={`grid ${grid ? 'grid-cols-5' : 'grid-cols-1'}  my-8`}>
            {products.map((product) => (
              <Card key={product?._id} item={product}></Card>
            ))}
          </div>
          :
          <div className={`grid grid-cols-1'} my-8 `}>
            {products.map((product) => (
              <CardX key={product?._id} item={product}></CardX>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Shop;
