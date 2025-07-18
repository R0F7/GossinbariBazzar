import { useMutation, useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../components/Card/Card";
import { useEffect, useRef, useState } from "react";
// import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { CgMenuGridR } from "react-icons/cg";
import { ImMenu } from "react-icons/im";
import CardX from "../../components/Card/CardX";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
import { GiClick } from "react-icons/gi";
import toast from "react-hot-toast";
import EmptyState from "../EmptyState/EmptyState";
import PriceRangeSlider from "@/components/PriceRange/PriceRange";

const Shop = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [grid, setGrid] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const axiosCommon = useAxiosCommon();
  const {
    user,
    cartAddedProducts,
    addProductInCard,
    category,
    setCategory,
    searchText,
    setSearchText,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useAuth();
  const [price, setPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(price);
  const [subCategory, setSubCategory] = useState("");
  const [tag, setTag] = useState("");
  // console.log(searchText);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
  const [storeMaxPrice, setStoreMaxPrice] = useState(maxPrice);

  const oneCall = useRef(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      "shopProducts",
      category,
      price,
      subCategory,
      tag,
      searchText,
      sortOption,
      debouncedMinPrice,
      debouncedMaxPrice,
    ],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        // `/products?category=${category}&price=${price}&sub_category=${subCategory}&tag=${tag}&searchText=${searchText}&sortOption=${sortOption}`
        `/products?category=${category}&minPrice=${debouncedMinPrice}&maxPrice=${debouncedMaxPrice}&sub_category=${subCategory}&tag=${tag}&searchText=${searchText}&sortOption=${sortOption}`
      );
      return data;
    },
  });
  // console.log(products);

  // useEffect(() => {
  //   if (!oneCall.current) {
  //     const price = products.map((product) => {
  //       return product?.discounted_price || product?.price;
  //     });

  //     if (price.length > 0) {
  //       setMaxPrice(Math.max(...price));
  //     }

  //     oneCall.current = true;
  //   }
  // }, [products, setMaxPrice]);

  // useEffect(() => {
  //   if (!oneCall.current && products.length > 0) {
  //     const price = products
  //       .map((product) =>
  //         product?.discounted_price > 0
  //           ? product?.discounted_price
  //           : product?.price
  //       )
  //       .filter((p) => typeof p === "number");

  //     if (price.length > 0) {
  //       setMaxPrice(Math.max(...price));
  //       oneCall.current = true;
  //     }
  //   }
  // }, [products, setMaxPrice]);

  const prices = products.map(
    (product) => product.discounted_price || product.price
  );

  // useEffect(() => {
  //   if (!oneCall.current && prices.length > 0) {
  //     const max_Price = prices.length ? Math.max(...prices) : 0;
  //     setMaxPrice(max_Price);
  //     oneCall.current = true;
  //   }
  // }, [prices, setMaxPrice]);

  useEffect(() => {
  if (!oneCall.current && prices.length > 0) {
    const max_Price = Math.max(...prices);
    setMaxPrice(max_Price);        // user filter
    setStoreMaxPrice(max_Price);   // slider fixed limit
    oneCall.current = true;
  }
}, [prices, setMaxPrice]);


  // console.log(products.map(product => product.discounted_price || product.price));

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500);
    return () => clearTimeout(t);
  }, [minPrice, maxPrice]);

  const restQuery = () => {
    setCategory("");
    setPrice(0);
    setSubCategory("");
    setTag("");
    setSearchText("");
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["shopCategories"],
    queryFn: () => fetch("./categories.json").then((res) => res.json()),
  });
  //   console.log(categories);

  // old way
  useEffect(() => {
    const allSubCategories = [];

    for (const product of products) {
      // remove duplicate
      if (!allSubCategories.includes(product.sub_category)) {
        allSubCategories.push(product.sub_category);
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  // console.log(sortOption);

  const { data: reviews = [] } = useQuery({
    queryKey: ["card_reviews_fetch"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/reviews`);
      return data;
    },
  });
  // console.log(reviews);

  const updateQuantity = (product) => (product ? product.quantity + 1 : 1);
  const handleAddToCard = async (item) => {
    const find_product = cartAddedProducts.find(
      (product) => product.id === item._id
    );
    const quantity = updateQuantity(find_product);
    // console.log(find_product);

    const product_info = {
      id: item._id,
      order_owner_info: {
        name: user?.displayName,
        email: user?.email,
      },
      vendor_info: item.vendor_info,
      quantity,
    };

    try {
      await addProductInCard(product_info);
    } catch (error) {
      console.error("Failed to add product to the cart:", error);
    }
  };

  const handlePrice = (e) => {
    e.preventDefault();

    const price = e.target.range.value;
    setPrice(price);
    setDisplayPrice(price);
  };
  // console.log(price);

  const { data: wishlist = [], refetch: wishlistUpdate } = useQuery({
    queryKey: ["wishlist_collection", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/wishlist/${user?.email}`);
      return data;
    },
  });
  // console.log(wishlist);

  const { mutateAsync: wishlistCollections } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosCommon.post(
        "/add-product-wishlist",
        product_info
      );
      return data;
    },
    onSuccess: () => {
      toast.success("product added successfully");
      wishlistUpdate();
    },
  });

  const handleWishlist = async (id) => {
    const isExist = wishlist.find((item) => item._id === id);
    if (isExist) {
      return toast.error("already added this item");
    }

    const info = {
      id,
      email: user?.email,
      timestamp: Date.now(),
    };
    // console.log(info);

    try {
      await wishlistCollections(info);
    } catch (error) {
      console.error("Failed to add product to the wishlist:", error);
    }
  };

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

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
                  onClick={() => setCategory(category?.categoryName)}
                  className="py-1.5 ml-0.5 order-b text-[#646B73] ext-sm font-semibold hover:font-bold hover:text-[#2E8DD8] cursor-pointer flex items-center hover:border-b hover:drop-shadow-lg hover:bg-gray-300 hover:bg-opacity-15 hover:shadow-md transition duration-500 group"
                >
                  <span className="pl-2">{category?.categoryName} </span>
                  <i className="opacity-0group-hover:opacity-100 scale-0 group-hover:scale-100 group-hover:pl-2 translate-x-5 group-hover:translate-x-0 transition duration-500 ">
                    <GiClick />
                  </i>
                </li>
                // <li
                //   key={idx}
                //   onClick={() => setCategory(category?.categoryName)}
                //   className="py-1.5 ml-0.5 order-b text-[#646B73] ext-sm font-semibold hover:font-bold hover:text-[#2E8DD8] cursor-pointer flex items-center hover:border-b hover:drop-shadow-lg hover:bg-gray-300 hover:bg-opacity-15 hover:shadow-md transition duration-500 group"
                // >
                //   <span className="pl-2">{category?.categoryName} </span>
                //   <i className="opacity-0group-hover:opacity-100 scale-0 group-hover:scale-100 group-hover:pl-2 group-hover:translate-x-5 transition duration-500 ">
                //     <GiClick />
                //   </i>
                // </li>
                // <li
                //   key={idx}
                //   onClick={() => setCategory(category?.categoryName)}
                //   className="py-1.5 ml-1.5 order-b text-[#646B73] ext-sm font-medium hover:font-bold cursor-pointer flex items-center hover:border-b hover:drop-shadow-lg hover:bg-gray-400  hover:bg-opacity-15 group"
                // >
                //   <span className="bg">{category?.categoryName} </span>
                //   <i className="opacity-0 group-hover:pl-2 group-hover:opacity-100 group-hover:translate-x-5 transition duration-300 ">
                //     <GiClick />
                //   </i>
                // </li>
              ))}
            </ul>
          </div>

          <hr className="my-6" />

          {/* price */}
          <form onSubmit={handlePrice}>
            <h4 className="font-semibold mb-2 text-lg">Price</h4>

            {/* <input
              type="range"
              name="range"
              id="range"
              min="20"
              max="120"
              step="10"
              defaultValue={price || 0}
              onChange={(e) => setDisplayPrice(e.target.value)}
            />
            {displayPrice ? (
              <h4>
                Price : <span className="font-semibold"> ${displayPrice}</span>
              </h4>
            ) : (
              <h4>
                Price : <span className="font-semibold"> $20 - $120</span>
              </h4>
            )} */}

            <PriceRangeSlider key={storeMaxPrice}></PriceRangeSlider>

            <div className="flex justify-around">
              <button
                type="submit"
                className="mt-3 py-1.5 px-6 bg-[#2E8DD8] text-sm font-bold text-white rounded-md active:scale-90 scale-100 transform duration-200 "
              >
                Filter
              </button>
              <button
                type="reset"
                onClick={() => {
                  setPrice(0);
                  setDisplayPrice(null);
                }}
                className="mt-3 py-1.5 px-6 bg-[#2E8DD8] text-sm font-bold text-white rounded-md active:scale-90 scale-100 transform duration-200 "
              >
                Reset
              </button>
            </div>
          </form>

          <hr className="my-6" />

          {/* sub category */}
          <div>
            <h4 className="font-semibold mb-2 text-lg">Sub Categories</h4>
            <div className="space-y-2 space-x-2 mr-2">
              {subCategories.map((sCat, idx) => (
                <h4
                  key={idx}
                  onClick={() => setSubCategory(sCat)}
                  className="border inline-block rounded-full text-sm py-0.5 px-3 hover:text-[#2E8DD8] hover:border-[#2E8DD8] hover:shadow-md hover:shadow-[rgba(46,141,216,.3)] hover:cursor-pointer"
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
                  onClick={() => setTag(tag)}
                  className="border inline-block rounded-full text-sm py-0.5 px-3 hover:text-[#2E8DD8] hover:border-[#2E8DD8] hover:shadow-md hover:shadow-[rgba(46,141,216,.3)] hover:cursor-pointer"
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
                  className="outline-none text-[#333] px-2"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="default">Default sorting</option>
                  <option value="popularity" className="hover:bg-red-500">
                    Sort by popularity
                  </option>
                  <option value="rating">Sort by average rating</option>
                  <option value="latest">Sort by latest</option>
                  <option value="low-to-high">
                    Sort by price: low to high
                  </option>
                  <option value="high-to-low">
                    Sort by price: high to low
                  </option>
                </select>

                {/* <CustomDropdown></CustomDropdown> */}
              </div>

              {/* grid icon */}
              <div className="flex items-center gap-2.5">
                <h4 className="font-semibold text-sm">View As: </h4>
                <div className="flex gap-2 border p-2 shadow">
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
          {products.length > 0 ? (
            grid ? (
              <div className={`grid grid-cols-5 my-8`}>
                {products.map((product) => (
                  <Card
                    key={product?._id}
                    item={product}
                    handleAddToCard={handleAddToCard}
                    handleWishlist={handleWishlist}
                    reviews={reviews}
                  ></Card>
                ))}
              </div>
            ) : (
              <div className={`grid grid-cols-1 my-8 `}>
                {products.map((product) => (
                  <CardX
                    key={product?._id}
                    item={product}
                    handleAddToCard={handleAddToCard}
                    handleWishlist={handleWishlist}
                    reviews={reviews}
                  ></CardX>
                ))}
              </div>
            )
          ) : (
            <div className="-mt-[160px]">
              <EmptyState restQuery={restQuery}></EmptyState>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
