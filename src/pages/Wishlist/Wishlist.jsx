import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Card from "../../components/Card/Card";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import emptyImg from "../../assets/empty wishlist.png";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const axiosCommon = useAxiosCommon();
  const { user, cartAddedProducts, addProductInCard } = useAuth();

  const { data: wishlist = [], refetch: wishlistUpdate } = useQuery({
    queryKey: ["wishlist_collection", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/wishlist/${user?.email}`);
      return data;
    },
  });
  //   console.log(wishlist);

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosCommon.delete(`/wishlist`, { data: info });
      return data;
    },
    onSuccess: () => {
      wishlistUpdate();
      toast.success("item remove successfully");
    },
  });

  const updateQuantity = (product) => (product ? product.quantity + 1 : 1);
  const handleAddToCard = async (id) => {
    const find_product = cartAddedProducts.find((product) => product.id === id);
    const quantity = updateQuantity(find_product);

    const product_info = {
      id,
      order_owner_info: {
        name: user?.displayName,
        email: user?.email,
      },
      quantity,
    };

    try {
      await addProductInCard(product_info);
    } catch (error) {
      console.error("Failed to add product to the cart:", error);
    }
  };

  const { data: reviews = [] } = useQuery({
    queryKey: ["card_reviews_fetch"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/reviews");
      return data;
    },
  });
  //   console.log(reviews);

  const handleRemove = async (id) => {
    const info = {
      id,
      email: user?.email,
    };

    try {
      await removeItem(info);
    } catch (error) {
      console.error("Failed to add product to the cart:", error);
    }
  };

  return (
    <section className="">
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-5 p-4">
          {wishlist.map((item) => (
            <Card
              key={item._id}
              item={item}
              handleAddToCard={handleAddToCard}
              handleRemove={handleRemove}
              reviews={reviews}
              wishlist={true}
            ></Card>
          ))}
        </div>
      ) : (
        <div className="border min-h-screen flex flex-col justify-center items-center">
          <div>
            <img src={emptyImg} alt="emptyImg" />
          </div>
          <h1 className="text-4xl font-bold text-[#E13E4F] mb-2">Your Wishlist is empty!</h1>
          <p className="text-center text-[#5F83AE] text-2xl tracking-wider mb-6">seems like you don't have wishes here. <br /> Make a wish!</p>
          <Link to="/shop" className="bg-[#3897EE] text-white py-3 w-[300px] text-center font-semibold rounded shadow-md scale-100 active:scale-95 transition duration-300">Start Shopping</Link>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
