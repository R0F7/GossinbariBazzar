import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Shop from "../pages/Shop/Shop";
// import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import FlashSales from "../pages/FlashSales/FlashSales";
import Blogs from "../pages/Blogs/Blogs";
import Pages from "../pages/Pages/Pages";
import ContactUs from "../pages/ContactUs/ContactUs";
import TermOfUse from "../pages/TermOfUse/TermOfuse";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import Articles from "../components/Articles/Articles";
import Article from "../components/Article/Article";
import Cart from "../pages/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path:"/cart",
        element:<Cart></Cart>
      },
      {
        path: "/pages",
        element: <Pages></Pages>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/flash-sales",
        element: <FlashSales></FlashSales>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/term-of-use",
        element: <TermOfUse></TermOfUse>,
      },
      {
        path: "/help-center",
        element: <HelpCenter></HelpCenter>,
      },
      {
        path: "/articles/:id",
        element: <Articles></Articles>,
        // loader: async () => await fetch("./helpCenter.json").then((res) => res.json()),
        loader: async () => {
          try {
            const response = await fetch("/helpCenter.json");
            if (!response.ok) throw new Error("Failed to fetch articles data");
            return response.json();
          } catch (error) {
            console.error("Error loading articles:", error);
            return [];
          }
        },
      },
      {
        path: "/article/:id/:articleId",
        element: <Article />,
        loader: async () => {
          try {
            const response = await fetch("/helpCenter.json");
            if (!response.ok) throw new Error("Failed to fetch articles data");
            return response.json();
          } catch (error) {
            console.error("Error loading articles:", error);
            return [];
          }
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
]);
