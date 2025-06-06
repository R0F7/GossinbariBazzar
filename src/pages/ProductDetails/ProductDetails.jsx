import { IoCameraSharp, IoSearch } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import CustomPaging from "../../components/CustomPaging/CustomPaging";
import { FaCheckCircle, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import Slider from "react-slick";
import NextArrow from "../../components/Arrow/NextArrow";
import PrevArrow from "../../components/Arrow/PrevArrow";
// import SliderComponent from "./SliderComponent";
import { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import Rating from "react-rating";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import imageUpload from "../../api/utils";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { format } from "date-fns";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import Spinier from "@/components/Spinier/Spinier";

const ProductDetails = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const axiosCommon = useAxiosCommon();
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, cartAddedProducts, addProductInCard } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartToast, setCartToast] = useState(false);
  // console.log(user);

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

  //get single product data
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/product/${id}`);
      return data;
    },
  });
  // console.log(product);

  //post review info
  const { mutateAsync: post_review_info } = useMutation({
    mutationFn: async (review_info) => {
      const { data } = await axiosCommon.post("/review", review_info);
      return data;
    },
    onSuccess: () => {
      // console.log("review save successfully");
      toast.success("review added successfully");
      setLoading(false);
      refetch();
    },
  });

  // update rating
  const { mutateAsync: update_product_info } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosCommon.put("/product", product_info);
      return data;
    },
  });

  //get specific reviews
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", product?._id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/reviews/${product?._id}`);
      return data;
    },
  });
  // console.log(reviews);

  //add product in cart
  // const { mutateAsync: addProductInCard } = useMutation({
  //   mutationFn: async (product_info) => {
  //     const { data } = await axiosCommon.put(
  //       "/add-product-in-cart",
  //       product_info
  //     );
  //     return data;
  //   },
  //   onSuccess: () => {
  //     // console.log("product added successfully");
  //     toast.success("product added successfully");
  //     cartAddedProductsRefetch();
  //     setIsOpen(true);
  //   },
  // });

  // const { data: cartAddedProducts = [], refetch: cartAddedProductsRefetch } =
  //   useQuery({
  //     queryKey: ["cartAddedProducts", user?.email],
  //     queryFn: async () => {
  //       const { data } = await axiosCommon.get(
  //         `/products-in-cart/${user?.email}`
  //       );
  //       return data;
  //     },
  //   });
  // console.log(cartAddedProducts);

  const find_product = cartAddedProducts.find((product) => product.id === id);
  const quantity = find_product?.quantity;
  // console.log(quantity);
  // console.log(count);

  useEffect(() => {
    if (find_product) {
      setCount(quantity);
      setIsOpen(true);
    }
  }, [find_product, quantity]);

  const handleAddToCard = async (item) => {
    // const updateCount = count + 1;
    // setCount(updateCount);

    if (quantity === count) {
      setCartToast(true);
      return toast.error("if you want more! update quantity");
    } else {
      setCartToast(false);
    }

    const product_info = {
      id: item._id,
      order_owner_info: {
        name: user?.displayName,
        email: user?.email,
      },
      vendor_info: item.vendor_info,
      quantity: count,
    };

    await addProductInCard(product_info);

    // console.log(product_info);
  };

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = parseFloat((totalRatings / reviews.length).toFixed(2));
  // console.log(averageRating);
  // const averageRating =Math.round(totalRatings / reviews.length);

  const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((review) => {
    const rating = review.rating;
    if (ratingCount[rating] !== undefined) {
      ratingCount[rating]++;
    }
  });
  // console.log(ratingCount);

  //for relational product
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/flashSales.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    // const name = form.name.value;
    // const email = form.email.value;
    const image = form.file.files[0];
    const review = form.review.value;
    const name = user?.displayName;
    const email = user?.email;
    const user_image = user?.photoURL;

    // console.table(name,email,image,review)

    if (rating === 0) {
      setLoading(false);
      return toast.error("rating is required");
    }
    
    const averageRating = parseFloat(
      ((totalRatings + rating) / (reviews.length + 1)).toFixed(2)
    );
    console.log(averageRating);
    

    try {
      let image_url = null;
      if (image) image_url = await imageUpload(image);

      const review_info = {
        product_id: id,
        name,
        email,
        user_image,
        image_url,
        rating,
        review,
        date: new Date(),
      };
      // console.log(review_info);

      //save review in db
      const save_review = await post_review_info(review_info);

      if (save_review.acknowledged) {
        await update_product_info({ _id: id, rating: averageRating });
      }

      //clear old data
      form.reset();
      setRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Spinier></Spinier>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 text-[#212B36] mb-6 mt-5">
        <h4>Shop</h4>
        <span>/</span>
        <h4>{product?.category}</h4>
      </div>
      {/* add product to cart toast*/}
      {/* {isOpen && ( */}
      <div
        className={`bg-[#F6F5F8] border-t-[3px] border-[#2E8DD8]  px-4 mb-4 ${
          isOpen
            ? "scale-y-100 origin-top py-5"
            : "scale-y-0 origin-top py-0 h-0 overflow-hidden mb-0 border-none"
        }  transition-all duration-500`}
      >
        {cartToast ? (
          <div className="flex items-center justify-between text-red-600">
            <div className="flex items-center gap-1">
              <i>
                <HiMiniExclamationTriangle className="text-xl" />
              </i>
              <h4 className="">
                <span>{quantity > 1 && quantity + "x "}</span>
                <span className="font-semibold">
                  &quot;{product?.title}&quot;
                </span>
                <span>
                  {" "}
                  already has been added to your cart.If you want more update
                  quantity
                </span>
              </h4>
            </div>
            <Link
              to="/cart"
              className="uppercase flex items-center gap-1 bg-[#2E8DD8] text-white text-xs font-bold py-3 px-4 rounded-md active:scale-95 scale-100 transition-all duration-200 hover:gap-2.5 hover:duration-500"
            >
              view cart
              <i>
                <FaArrowRight />
              </i>
            </Link>
          </div>
        ) : (
          <div className="flex justify-between">
            <h4 className="flex items-center gap-1.5 text-[#6C6C6D]">
              <i>
                <FaCheckCircle className="text-[#00AB55]" />
              </i>
              <span>{quantity > 1 && quantity + "x"}</span>
              <span className="font-semibold">
                &quot;{product?.title}&quot;
              </span>
              has been added to your cart
            </h4>
            <Link
              to="/cart"
              className="uppercase flex items-center gap-1 bg-[#2E8DD8] text-white text-xs font-bold py-3 px-4 rounded-md active:scale-95 scale-100 transition-all duration-200 hover:gap-2.5 hover:duration-500"
            >
              view cart
              <i>
                <FaArrowRight />
              </i>
            </Link>
          </div>
        )}
      </div>
      {/* )} */}

      {/* title */}
      <div>
        <div>
          <div className="flex items-end gap-2  mb-3">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <h6 className="text-[#637381] font-semibold">{product.unit}</h6>
          </div>
          <div className="space-x-3">
            <Rating
              style={{ maxWidth: 180 }}
              initialRating={averageRating}
              fullSymbol={<FaStar className="mr-1 text-yellow-500"></FaStar>}
              emptySymbol={
                <FaRegStar className="mr-1 text-yellow-500"></FaRegStar>
              }
              readonly
            />
            {/* TODO: dynamic customer review & sold count */}
            <span className="text-[#637381]">
              {reviews && reviews.length > 0 ? reviews.length : 0} customer
              review{" "}
            </span>
            <span className="text-[#637381] border-x px-3">
              Sold: {product?.sold_product}{" "}
            </span>

            <span className="text-[#637381]">
              <span className="text-[#919eab]">Sold by:</span>{" "}
              {product.vendor_info?.name}
            </span>
          </div>
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
            <CustomPaging images={product?.additionalImages}></CustomPaging>
          </div>
        </div>
        {/* product details */}
        <div className="x-4">
          <div className="flex items-center justify-between text-xl font-bold ">
            {product?.discounted_price ? (
              <div className="flex items-center gap-4">
                <del className="text-gray-600">${product?.price}</del>
                <h4 className="text-red-600">${product?.discounted_price}</h4>
              </div>
            ) : (
              <h4 className="text-red-600">${product?.price}</h4>
            )}
            <i>
              <FaRegHeart />
            </i>
          </div>
          <p className="text-[#666D74] my-4">{product.short_description}</p>
          {/* TODO:replace dynamic */}
          <h4 className="">
            Availability:{" "}
            <span className="font-semibold text-green-500">
              {product?.total_product}
            </span>
          </h4>
          <div className="border w-[130px] flex items-center justify-around py-1.5 text-lg font-bold rounded-md shadow my-3.5">
            <button
              disabled={count === 1}
              className="text- active:scale-75 scale-100 duration-200"
            >
              <FiMinus onClick={() => setCount(count - 1)} />
            </button>
            <span>{count}</span>
            <button
              className="active:scale-75 scale-100 duration-200"
              disabled={count === product?.total_product}
            >
              <FiPlus onClick={() => setCount(count + 1)} />
            </button>
          </div>
          <div className="flex flex-col space-y-2 mb-6">
            <button
              onClick={() => handleAddToCard(product)}
              className="g-[#76c893] bg-[#0077b6] text-white py-2.5 rounded-lg font-bold -[65%] shadow active:scale-95 scale-100 duration-200"
              disabled={count === product?.total_product}
            >
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
              <Link>{product?.category}</Link>
            </h6>
            <h6>
              <span className="font-semibold">Tags:</span>{" "}
              {product?.tags.map((tag, idx) => (
                <span key={idx} className="capitalize mr-1">
                  {tag},
                </span>
              ))}
            </h6>
            {product?.brand_name && (
              <h6>
                <span className="font-semibold">Brand:</span>{" "}
                <Link>{product?.brand_name}</Link>
              </h6>
            )}
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
                        {/* <h4>{item.title}</h4> */}
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
      <hr className="my-10" />
      {/* Frequently Bought Together */}
      <div className="flex ">
        <div className="w-1/2">
          <h4 className="font-semibold text-lg text-[#666D74]">
            Frequently Bought Together
          </h4>
          <div className="flex items-center gap-2 text-2xl w-28 h-28 mt-1 mb-6">
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
          <ul className="list-disc text-[#666D74] space-y-2.5">
            <li>
              <strong>Tescot durian : </strong>
              {/* <span>-</span> */}
              <span className="font-bold text-red-500">$60.00</span>
            </li>
            <li>
              <strong>Tescot durian : </strong>
              {/* <span className="text-xl font-bold"> - </span> */}
              <span className="font-bold text-red-500">$60.00</span>
            </li>
            <li>
              <strong>Tescot durian : </strong>
              {/* <span>-</span> */}
              <span className="font-bold text-red-500">$60.00</span>
            </li>
          </ul>
        </div>
        <div className="w-1/2">
          <h6 className="text-[#666D74] font-bold mb-2">
            <strong>Price for all : </strong>
            <span className="text-red-500">$260.00</span>
          </h6>
          <button className="bg-[#0077B6] text-white py-2.5 px-4 font-semibold text-sm rounded-md border-none shadow active:scale-95 scale-100 duration-200">
            Add all to Cart
          </button>
        </div>
      </div>
      <hr className="my-10" />
      {/* product description  */}
      <div>
        <h4 className="text-[#666D74] text-lg font-bold mb-2">
          Product Description
        </h4>
        <p className="w-[65%] text-[#666D74] mb-2.5">{product?.description}</p>
      </div>

      {/* review for product */}
      <div className="my-10">
        <div>
          <h4 className="text-2xl font-bold text-[#666D74] mb-0.5">
            {reviews && reviews.length > 0 ? reviews.length : 0} review for{" "}
            {product?.title}
          </h4>
          <span className="flex items-center mb-4">
            <strong className="text-yellow-500 font-black mr-2">
              {averageRating ? averageRating : 0}
            </strong>
            <p className="text-[#666D74]">
              ( Based on {reviews && reviews.length > 0 ? reviews.length : 0}{" "}
              review )
            </p>
          </span>
        </div>
        {/* rating */}
        <div>
          <ul>
            <li className="grid grid-cols-12 items-center gap-6 w-[70%]">
              <span className="flex items-center gap-1.5 text-[#FFB600] col-span-2">
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
              </span>
              <div className="border w-full h-3 bg-gray-100 col-span-7 progressbar rounded-full relative">
                <div className="w-[100%] h-full absolute top-0 left-0 bg-[#FFB600] rounded-full"></div>
              </div>
              <span className="col-span-1 font-bold">{ratingCount[5]}</span>
            </li>
            <li className="grid grid-cols-12 items-center gap-6 w-[70%]">
              <span className="flex items-center gap-1.5 text-[#FFB600] col-span-2">
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
              </span>
              <div className="border w-full h-3 bg-gray-100 col-span-7 progressbar rounded-full relative">
                <div className="w-[80%] h-full absolute top-0 left-0 bg-[#FFB600] rounded-full"></div>
              </div>
              <span className="col-span-1 font-bold">{ratingCount[4]}</span>
            </li>
            <li className="grid grid-cols-12 items-center gap-6 w-[70%]">
              <span className="flex items-center gap-1.5 text-[#FFB600] col-span-2">
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
              </span>
              <div className="border w-full h-3 bg-gray-100 col-span-7 progressbar rounded-full relative">
                <div className="w-[60%] h-full absolute top-0 left-0 bg-[#FFB600] rounded-full"></div>
              </div>
              <span className="col-span-1 font-bold">{ratingCount[3]}</span>
            </li>
            <li className="grid grid-cols-12 items-center gap-6 w-[70%]">
              <span className="flex items-center gap-1.5 text-[#FFB600] col-span-2">
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
              </span>
              <div className="border w-full h-3 bg-gray-100 col-span-7 progressbar rounded-full relative">
                <div className="w-[40%] h-full absolute top-0 left-0 bg-[#FFB600] rounded-full"></div>
              </div>
              <span className="col-span-1 font-bold">{ratingCount[2]}</span>
            </li>
            <li className="grid grid-cols-12 items-center gap-6 w-[70%]">
              <span className="flex items-center gap-1.5 text-[#FFB600] col-span-2">
                <i>
                  <FaStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
                <i>
                  <FaRegStar />
                </i>
              </span>
              <div className="border w-full h-3 bg-gray-100 col-span-7 progressbar rounded-full relative">
                <div className="w-[20%] h-full absolute top-0 left-0 bg-[#FFB600] rounded-full"></div>
              </div>
              {/* reviewer count */}
              <span className="col-span-1 font-bold">{ratingCount[1]}</span>
            </li>
          </ul>
        </div>
        {/* buttons */}
        <div className="my-10 flex gap-4">
          <button className="bg-[#EEEEEE] ext-[#666D74] flex items-center py-2 px-2.5 gap-1 text-sm font-bold rounded-md active:scale-95 scale-100 duration-200 shadow hover:bg-[#FFFFFF] border hover:border-[#2E8DD8] hover:text-[#2E8DD8] transition ">
            <i>
              <IoCameraSharp />
            </i>
            <h4> With images</h4>
            <span>({reviews && reviews.length > 0 ? reviews.length : 0})</span>
          </button>
          <button className="bg-[#EEEEEE] flex items-center py-2 px-2.5 gap-1 text-sm font-bold rounded-md active:scale-95 scale-100 duration-200 shadow hover:bg-[#FFFFFF] border hover:border-[#2E8DD8] hover:text-[#2E8DD8] transition ">
            <i>
              <MdVerifiedUser />
            </i>
            <h4>Verified</h4>
            <span>(0)</span>
          </button>
          <button className="bg-[#EEEEEE] flex items-center py-2 px-2.5 gap-1 text-sm font-bold rounded-md active:scale-95 scale-100 duration-200 shadow hover:bg-[#FFFFFF] border hover:border-[#2E8DD8] hover:text-[#2E8DD8] transition ">
            <i>
              <FaStar />
            </i>
            <h4> All stars</h4>
            <span>({ratingCount[5]})</span>
          </button>
        </div>
        <hr className="" />
        {/* reviews */}
        <div>
          {reviews &&
            reviews.map((review) => (
              <div
                key={review._id}
                className="border-b flex justify-between w-[65%] gap-4 py-6"
              >
                <div className="flex gap-4">
                  <div className="-[90px]">
                    <div className="w-[50px] h-[50px] border border-[#FFB600] rounded-full">
                      <img
                        className="w-full h-full rounded-full p-"
                        src={review?.user_image}
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <h4 className="font-semibold -mb-1">{review?.name}</h4>
                    <span className="text-xs text-[#B0B9C2] font-semibold">
                      {format(review?.date, "MMMM dd, yyyy")}
                    </span>
                    <p className="mt-2 text-sm text-[#666D74]">
                      {review?.review}
                    </p>
                  </div>
                </div>
                <div className=" min-w-[130px] text-end">
                  <Rating
                    style={{ maxWidth: 180 }}
                    initialRating={review?.rating}
                    fullSymbol={
                      <FaStar className="mr-1 text-yellow-500"></FaStar>
                    }
                    emptySymbol={
                      <FaRegStar className="mr-1 text-yellow-500"></FaRegStar>
                    }
                    readonly
                  />
                </div>
              </div>
            ))}
          {/* <div className="border-b flex justify-between w-[55%] gap-4 py-6">
            <div className="w-[90px]">
              <div className="w-[55px] h-[55px] border border-[#FFB600] rounded-full">
                <img
                  className="w-full h-full rounded-full p-"
                  src="https://i.ibb.co.com/MZqW3Th/trend-01.jpg"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold -mb-1">admin</h4>
              <span className="text-xs text-[#B0B9C2] font-semibold">
                August 26, 2021
              </span>
              <p className="mt-2 text-sm text-[#666D74]">
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using ‘Content
                here, content here’, making it look like readable English
              </p>
            </div>
            <div className="flex gap-1 text-[#FFB600]">
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
            </div>
          </div>
          <div className="border-b flex justify-between w-[55%] gap-4 py-6">
            <div className="w-[90px]">
              <div className="w-[55px] h-[55px] border border-[#FFB600] rounded-full">
                <img
                  className="w-full h-full rounded-full p-"
                  src="https://i.ibb.co.com/MZqW3Th/trend-01.jpg"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold -mb-1">admin</h4>
              <span className="text-xs text-[#B0B9C2] font-semibold">
                August 26, 2021
              </span>
              <p className="mt-2 text-sm text-[#666D74]">
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using ‘Content
                here, content here’, making it look like readable English
              </p>
            </div>
            <div className="flex gap-1 text-[#FFB600]">
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
              <i>
                <FaStar></FaStar>
              </i>
            </div>
          </div> */}
        </div>
      </div>
      {/* review field */}
      <div className="bg-[#F4F6F8] w-[55%] p-6 rounded-md shadow">
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <h4 className="font-bold text-[17px] mb-0.5">Add a review</h4>
            <p className="text-sm text-[#666D74] font-medium mb-0.5">
              Review now to get coupon!
            </p>
            <p className="text-sm text-[#666D74]">
              Your email address will not be published. Required fields are
              marked *
            </p>
          </div>

          <div className="mb-3">
            <h4 className="font-bold mb-0.5">
              Your rating <span className="text-red-500">*</span>
            </h4>
            <div>
              <Rating
                style={{ maxWidth: 180 }}
                value={rating}
                onChange={setRating}
                fullSymbol={<FaStar className="mr-1 text-[#FFB600]"></FaStar>}
                emptySymbol={
                  <FaRegStar className="mr-1 text-[#FFB600]"></FaRegStar>
                }
                // fractions={2} // Allows half-star ratings
                isRequired={true}
              />
            </div>
          </div>

          <div className="">
            {/* <div className="grid grid-cols-2 gap-6 mb-3">
              <label htmlFor="name">
                <h4 className="text-[#666D74] text-sm font-bold mb-1.5">
                  Name <span className="text-red-500">*</span>
                </h4>
                <input
                  className="w-full rounded-md py-2 px-2.5 text-sm font-semibold text-[#666D74] outline-none placeholder:text-xs"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name"
                  defaultValue={user?.displayName}
                  required
                />
              </label>
              <label htmlFor="email">
                <h4 className="text-[#666D74] text-sm font-bold mb-1.5">
                  Email <span className="text-red-500">*</span>
                </h4>
                <input
                  className="w-full rounded-md py-2 px-2.5 text-sm font-semibold text-[#666D74] outline-none placeholder:text-xs"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  defaultValue={user?.email}
                  required
                />
              </label>
            </div> */}

            <label htmlFor="file">
              <h4 className="text-[#666D74] text-sm font-bold mb-1.5">
                Choose pictures <span className="text-red-500">*</span>{" "}
                <span className="text-xs">(maxsize: 2000kB, max files: 2)</span>
              </h4>
              <input
                className="mb-3 text-sm"
                type="file"
                name="file"
                id="file"
                accept="image/*"
                // required
              />
            </label>

            <label htmlFor="review" className="">
              <h4 className="text-[#666D74] text-sm font-bold mb-1.5">
                Your review <span className="text-red-500">*</span>
              </h4>
              <textarea
                className="w-full h-[120px] rounded-md mb-2 outline-none py-1 px-2 text-[#666D74] placeholder:text-sm"
                name="review"
                id="review"
                placeholder="Write review message"
                required
              ></textarea>
            </label>

            <label
              htmlFor="checkbox"
              className="flex items-center gap-1.5 text-[#666D74] text-xs font-bold mb-3"
            >
              <input
                className=""
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <h4>
                Save my name, email, and website in this browser for the next
                time I comment.
              </h4>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2E8DD8] text-white px-10 py-2 ext-sm font-bold rounded-md active:scale-95 scale-100 duration-200"
          >
            {loading ? (
              <CgSpinnerTwoAlt className="animate-spin m-auto" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
