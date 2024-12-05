import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  updatePassword,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

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

  //get token form server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

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
  const { data: user_info_DB } = useQuery({
    queryKey: ["single_user", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user/${user?.email}`);
      return data;
    },
  });
  // console.log(data);

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
      const userInfo = {
        email: user?.email,
        role: "customer",
        status: "active",
        vendor_request: false,
      };
      const { data } = await axiosCommon.put(
        `${import.meta.env.VITE_API_URL}/user`,
        userInfo
      );
      return data;
    },
    onSuccess: () => {
      allUserRefetch();
    },
  });

  //get cartAddedProducts
  const {
    data: cartAddedProducts = [],
    refetch: cartAddedProductsRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["cartAddedProducts", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/products-in-cart/${user?.email}`
      );
      return data;
    },
  });
  // console.log(cartAddedProducts);

  // const onAuthStateChange
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getToken(currentUser.email);
        saveUser(currentUser);
        console.log("--------->", currentUser);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, [saveUser]);

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
    allUsers,
    user_info_DB,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
