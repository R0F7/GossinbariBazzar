import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  // getAuth,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
// const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("Address Not Available");
  const [category, setCategory] = useState("");
  const axiosCommon = useAxiosCommon();
  const [shippingDetails, setShippingDetails] = useState({});

  //sign in with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //update profile
  const updateUserProfile = (name, photo, number) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
      phoneNumber: number,
    });
  };

  //update password
  const updateUserPassword = (password) => {
    const user = auth.currentUser;
    const newPassword = password;
    return updatePassword(user, newPassword);
  };

  //sign in with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setLoading(true);

    //remove cookies token
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    });

    return signOut(auth);
  };

  //get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // address = `Latitude: ${lat}, Longitude: ${lon}`;

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.address) {
              const placeName = data.display_name.split(",");
              const newAddress = `${placeName[0]},${
                placeName[placeName.length - 1]
              }`;
              setAddress(newAddress);
            } else {
              console.error("No results found.");
            }
          })
          .catch((error) => console.error("Error:", error));
      },
      (error) => {
        console.error("Error getting location: ", error.message);
      }
    );
  }, []);

  //get all users
  const { data: allUsers = [], refetch: allUserRefetch } = useQuery({
    queryKey: ["all_users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users`);
      return data;
    },
  });
  // console.log(allUsers);

  //specific user get
  const { data: user_info_DB = {} } = useQuery({
    queryKey: ["single_user", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  //save user
  // const saveUser = async (user) => {
  //   const userInfo = {
  //     email: user?.email,
  //     role: "customer",
  //     status: "active",
  //     vendor_request: false,
  //   };
  //   const { data } = await axios.put(
  //     `${import.meta.env.VITE_API_URL}/user`,
  //     userInfo
  //   );
  //   return data;
  // };

  //save user
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: async (user) => {
      // const userInfo = {
      //   email: user?.email,
      //   role: "customer",
      //   status: "active",
      //   vendor_request: false,
      // };
      // console.log(user);

      const { data } = await axiosCommon.put(
        `${import.meta.env.VITE_API_URL}/user`,
        user
      );
      return data;
    },
    onSuccess: () => {
      allUserRefetch();
    },
  });

  //isActive update false
  // const { mutateAsync: updateIsActive } = useMutation({
  //   mutationFn: async (email) => {
  //     const isActive = true;
  //     console.log(email);

  //     const { data } = await axiosCommon.put(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/user?email=${email}&isActive=${isActive}`
  //       // user
  //     );
  //     return data;
  //   },
  //   onSuccess: () => {
  //     allUserRefetch();
  //   },
  // });

  //get cartAddedProducts
  
  const {
    data: cartAddedProducts = [],
    refetch: cartAddedProductsRefetch,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["cartAddedProducts", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/products-in-cart/${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });
  // console.log(cartAddedProducts);

  //add product in cart
  const { mutateAsync: addProductInCard } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosCommon.put(
        "/add-product-in-cart",
        product_info
      );
      return data;
    },
    onSuccess: () => {
      // console.log("product added successfully");
      toast.success("product added successfully");
      cartAddedProductsRefetch();
      // setIsOpen(true);
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["getProductsForCart"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/products");
      return data;
    },
  });

  // Nested Loops (for inside for)
  // let cart_products = [];
  // for (const product of products) {
  //   // console.log(product._id);
  //   for (const cartProduct of cartAddedProducts) {
  //     // console.log(cartProduct);
  //     if (product._id === cartProduct.id) {
  //       cart_products.push({ ...product, cartProduct });
  //     }
  //   }
  // }

  // Map-based lookup (filter + map)
  // Create a map for quick lookup
  const cartMap = new Map(cartAddedProducts.map((item) => [item.id, item]));

  // Filter and merge products with cart data efficiently
  const cart_products = products
    .filter((product) => cartMap.has(product._id))
    .map((product) => ({
      ...product,
      cartProduct: cartMap.get(product._id),
    }));

  //get token form server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  // const onAuthStateChange
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getToken(currentUser.email);
        // saveUser(user_info_DB[status]);

        // Retrieve active user data from user_info_DB
        // console.log(Object.keys(user_info_DB));

        // if (user_info_DB && !isEmpty) {
        //   const updateActivity = { ...user_info_DB, isActive: true };
        //   await saveUser(updateActivity);
        //   console.log("hooo");
        // }else {
        //   const updateActivity = { ...user_info_DB, isActive: false };
        //   await saveUser(updateActivity);
        //   console.log("Naa");
        // }

        console.log("--------->", currentUser);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    signInWithGoogle,
    createUser,
    updateUserProfile,
    updateUserPassword,
    signIn,
    logOut,
    cartAddedProducts,
    cartAddedProductsRefetch,
    isLoading,
    isFetched,
    allUsers,
    user_info_DB,
    saveUser,
    address,
    addProductInCard,
    cart_products,
    category,
    setCategory,
    shippingDetails,
    setShippingDetails,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
