import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Cart = () => {
  const { cartAddedProducts, cartAddedProductsRefetch, isLoading } = useAuth();
  const axiosCommon = useAxiosCommon();
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
  //   console.log(cart_products);

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

  const { mutateAsync: deleteProduct } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosCommon.delete(
        "/delete-product-in-cart",
        {data:product_info}
      );
      return data;
    },
    onSuccess: () => {
      cartAddedProductsRefetch();
      toast.success("deleted product successfully");
    },
    onError:(error)=>{
        console.error("Error deleting the resource:",error);
    }
  });

  const handleCountMinus = async (product) => {
    const updatedQuantity = product?.quantity - 1;
    // console.log(updatedQuantity);

    // console.log({ ...product, quantity: updatedQuantity });
    await addProductInCard({ ...product, quantity: updatedQuantity });
  };

  const handleCountPlus = async (product) => {
    const updatedQuantity = product?.quantity + 1;
    // console.log(product);
    await addProductInCard({ ...product, quantity: updatedQuantity });
  };

  //   useEffect(())
  const handleDelete = async (product) => {
    console.log(product.cartProduct);
    await deleteProduct(product.cartProduct);
  };

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

      <div className="flex gap-10">
        <div className="border-t w-2/3 -3/4">
          {cart_products.map((product) => (
            <div
              key={product._id}
              className="border-b py-4 flex items-center gap-6"
            >
              <div className="flex gap-3.5 w-[40%]">
                <div className="w-[75px] h-[50px]">
                  <img className="w-full h-full" src={product?.image} alt="" />
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
                </h4>
                <div className="border w-[120px] flex items-center justify-around py-1.5 font-bold rounded-md shadow">
                  <button
                    disabled={product?.cartProduct?.quantity === 1 || isPending}
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
                    ? product?.discounted_price * product?.cartProduct?.quantity
                    : product?.price * product?.cartProduct?.quantity}
                </h4>
              </div>
              <button
                onClick={() => handleDelete(product)}
                className="border p-2 text-gray-700 hover:bg-red-100 hover:text-red-500 hover:border-red-100 rounded-full transition-all duration-300 active:scale-75 scale-100"
              >
                <i>
                  <RiDeleteBin5Fill className="text-xl" />
                </i>
              </button>
            </div>
          ))}
        </div>
        <div className="border w-1/3 -1/4 border-red-700"></div>
      </div>
    </section>
  );
};

export default Cart;
