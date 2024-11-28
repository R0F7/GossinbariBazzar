import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiCalendarExclamation } from "react-icons/bi";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";

const Cart = () => {
  const { cartAddedProducts, cartAddedProductsRefetch, isLoading } = useAuth();
  const axiosCommon = useAxiosCommon();
  const [isOpen, setIsOpen] = useState(false);
  //   const [percentage,setPercentage]=useState(0);
  //   console.log(cartAddedProducts);

  const { data: products = [] } = useQuery({
    queryKey: ["getProductsForCart"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/products");
      return data;
    },
  });
  //   console.log(products);

  let cart_products = [];
  for (const product of products) {
    // console.log(product._id);
    for (const cartProduct of cartAddedProducts) {
      // console.log(cartProduct);
      if (product._id === cartProduct.id) {
        cart_products.push({ ...product, cartProduct });
      }
    }
  }
  // console.log(cart_products);

  const { mutateAsync: addProductInCard, isPending } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosCommon.put(
        "/add-product-in-cart",
        product_info
      );
      return data;
    },
    onSuccess: () => {
      // console.log("product added successfully");
      toast.success("quantity updated successfully");
      cartAddedProductsRefetch();
    },
  });

  const { mutateAsync: deleteProduct, isPending: deletePending } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosCommon.delete("/delete-product-in-cart", {
        data: product_info,
      });
      return data;
    },
    onSuccess: () => {
      cartAddedProductsRefetch();
      toast.success("deleted product successfully");
    },
    onError: (error) => {
      console.error("Error deleting the resource:", error);
    },
  });

  const handleCountMinus = async (product) => {
    const updatedQuantity = product?.quantity - 1;
    // console.log(updatedQuantity);
    setIsOpen(true);

    // console.log({ ...product, quantity: updatedQuantity });
    await addProductInCard({ ...product, quantity: updatedQuantity });
  };

  const handleCountPlus = async (product) => {
    const updatedQuantity = product?.quantity + 1;
    setIsOpen(true);

    // console.log(product);
    await addProductInCard({ ...product, quantity: updatedQuantity });
  };

  //   useEffect(())
  const handleDelete = async (product) => {
    console.log(product.cartProduct);
    await deleteProduct(product.cartProduct);
  };

  const total_price = cart_products.reduce((total, product) => {
    //way 1
    // const priceToAdd = product.discounted_price * product.cartProduct.quantity || product.price * product.cartProduct.quantity;
    // return total + priceToAdd;

    //way 2
    const price =
      product.discounted_price !== undefined
        ? product.discounted_price * product.cartProduct.quantity
        : product.price * product.cartProduct.quantity;
    return total + price;
  }, 0);
  //   console.log(total_price);

  const percentage = ((total_price / 1000) * 100).toFixed(2);
  // console.log(percentage);

  //   useEffect(()=>{
  //     const percentage = (total_price / 1000) * 100;
  //     setPercentage(percentage)
  // },[total_price])

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
  }, [isOpen]);

  // useEffect(() => {
  //   if (isOpen) {
  //     const timer = setTimeout(() => {
  //       setIsOpen(false);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-176px)]">
        <GridLoader color="#2E8DD8" />
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <div className="flex items-center gap-2 text-[#212B36] mb-6 mt-5">
        <h4>Shop</h4>
        <span>/</span>
        <h4>Cart</h4>
      </div>
      <h2 className="text-2xl font-bold mb-6">Cart</h2>

      <div>
        <div
          className={`bg-[#F6F5F8] flex items-center gap-2 border-t-[3px] border-[#2E8DD8] px-4 ${
            isOpen
              ? "scale-y-100 origin-top py-5 mb-6"
              : "scale-y-0 origin-top py-0 h-0 overflow-hidden mb-0 border-none"
          }  transition-all duration-500`}
        >
          {/* <div className="flex items-center gap-2 border-t-[3px] mb-7 border-[#2e8dd8] bg-[#F6F5F8] p-5"> */}
          <i>
            <FaCheckCircle className="text-[#00AB55]" />
          </i>
          <h6>Cart updated.</h6>
        </div>
      </div>

      {cart_products.length > 0 ? (
        <div className="flex gap-10">
          <div className="border-t w-2/3 -3/4">
            {cart_products.map((product) => (
              <div
                key={product._id}
                className="border-b py-4 flex items-center gap-6"
              >
                <div className="flex gap-3.5 w-[40%]">
                  <div className="w-[75px] h-[50px]">
                    <img
                      className="w-full h-full"
                      src={product?.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="mb-0.5">{product?.title}</h4>
                    <h6 className="text-gray-500 text-sm font-light">
                      Vendor:{" "}
                      <span className="font-normal">{product?.sold_by}</span>
                    </h6>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-[45%]">
                  <h4 className="text-red-500 font-bold">
                    $
                    {product?.discounted_price
                      ? product?.discounted_price
                      : product?.price}
                    .00
                  </h4>
                  <div className="border w-[120px] flex items-center justify-around py-1.5 font-bold rounded-md shadow">
                    <button
                      disabled={
                        product?.cartProduct?.quantity === 1 || isPending
                      }
                      className="text- active:scale-75 scale-100 duration-200"
                    >
                      <FiMinus
                        onClick={() => handleCountMinus(product?.cartProduct)}
                      />
                    </button>
                    <span>{product?.cartProduct?.quantity}</span>
                    <button
                      className="active:scale-75 scale-100 duration-200"
                      disabled={
                        product?.cartProduct?.quantity ===
                          product?.total_product || isPending
                      }
                    >
                      <FiPlus
                        onClick={() => handleCountPlus(product?.cartProduct)}
                      />
                    </button>
                  </div>
                  <h4 className="text-red-500 font-bold">
                    $
                    {product?.discounted_price
                      ? product?.discounted_price *
                        product?.cartProduct?.quantity
                      : product?.price * product?.cartProduct?.quantity}
                    .00
                  </h4>
                </div>
                <button
                  onClick={() => handleDelete(product)}
                  className="border p-2 text-gray-700 hover:bg-red-100 hover:text-red-500 hover:border-red-100 rounded-full transition-all duration-300 active:scale-75 scale-100"
                  disabled={deletePending}
                >
                  <i>
                    <RiDeleteBin5Fill className="text-xl" />
                  </i>
                </button>
              </div>
            ))}
            <button className="mt-3 mb-10 py-1.5 hover:px-3.5 rounded-md hover:bg-[#2e8ed81f] hover:shadow-md hover:shadow-[#2e8ed81f] transition-all duration-200 active:scale-95 scale-100 font-semibold underline hover:no-underline">
              <Link to="/shop" className="text-[#2E8DD8]">
                Continue Shopping
              </Link>
            </button>
            <div>
              <div className="bg-[#EDEDED] h-[18px] relative">
                <div
                  className={`bg-[#2E8DD8] h-full absolute top-0 left-0 text-white font-bold text-xs transition-all duration-1000`}
                  style={{
                    width: percentage >= 100 ? "100%" : `${percentage}%`,
                  }}
                >
                  <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    {percentage >= 100 ? "100" : percentage}%
                  </h4>
                </div>
              </div>
              <div className="text-center mt-7">
                {total_price && total_price >= 1000 ? (
                  <h4>
                    Congratulations! You get free shipping with your order
                    greater{" "}
                    <strong className="text-[#2E8DD8]">$1,000.00.</strong>
                  </h4>
                ) : (
                  <p>
                    Spend{" "}
                    <strong className="text-[#2E8DD8]">
                      ${1000 - total_price}.00
                    </strong>{" "}
                    more to reach <strong>FREE SHIPPING!</strong> <br />
                    to add more products to your cart and receive free shipping
                    for order{" "}
                    <strong className="text-[#2E8DD8]">$1,000.00</strong>.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" w-1/3 -1/4 border-red-700 ">
            <div className="bg-[#F4F6F8] p-6 rounded-md space-y-4">
              <h4 className="text-[#586068] font-bold text-lg">Cart totals</h4>
              <div className="flex items-center justify-between">
                <h6 className="font-bold">Subtotal</h6>
                <span className="text-red-500 font-bold">
                  ${total_price}.00
                </span>
              </div>
              <div className="flex justify-between">
                <h6 className="w-1/2">
                  <span className="font-bold">Shipping:</span>{" "}
                  <span className="text-[#586068] font-semibold">John Doe</span>
                </h6>
                <p className="w-1/2 text-end ">
                  Enter your address to view shipping options.
                </p>
              </div>
              <div className="text-end">
                <details>
                  <summary>Calculate shipping</summary>
                  <form>
                    <input type="text" name="" id="" />
                  </form>
                </details>
              </div>
              <div className="bg-gray-300 h-px"></div>
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Total</h4>
                <span className="text-red-500 font-bold">
                  ${total_price}.00
                </span>
              </div>
            </div>
            <button className="bg-[#2e8dd8] text-white text-s font-bold w-full mt-4 py-2.5 rounded-md active:scale-95 scale-100 transition-all duration-200">
              Proceed To Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 border-t-[3px] border-[#2e8dd8] bg-[#F6F5F8] p-5">
            <i>
              <BiCalendarExclamation className="text-xl text-[#2e8dd8]" />
            </i>
            <h6>Your cart is currently empty.</h6>
          </div>
          <button className="mt-5 mb-10 py-2.5 px-3 rounded-md bg-[#2e8ed81f] hover:shadow-md hover:shadow-[#2e8ed81f] transition-all duration-200 active:scale-95 scale-100 font-semibold">
            <Link to="/shop" className="text-[#2E8DD8] flex items-center gap-2">
              <i>
                <TiArrowBackOutline />
              </i>
              <span>Continue Shopping</span>
            </Link>
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
