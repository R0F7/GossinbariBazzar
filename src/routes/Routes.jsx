import { createBrowserRouter, Navigate } from "react-router-dom";
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
import UPdateProfile from "../pages/UpdateProfile/UpdateProfile";
import DashboardLayout from "../layout/DashboardLayout";
import MyAccount from "../pages/Dashboard/MyAccount/MyAccount";
import Profile from "../pages/Dashboard/MyAccount/Profile/Profile";
import Settings from "../pages/Dashboard/MyAccount/Settings/Settings";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import Payment from "../pages/Dashboard/Payment/Payment";
import Support from "../pages/Dashboard/Support/Support";
import OrderHistory from "../pages/Dashboard/MyOrders/OrderHistory";
import Wishlist from "../pages/Wishlist/Wishlist";
import PaymentInfo from "../pages/Dashboard/MyAccount/PaymentInfo/PaymentInfo";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import Invoices from "../pages/Dashboard/Payment/Invoices/Invoices";
import Notifications from "../pages/Dashboard/Support/Notifications/Notifications";
import HelpAndSupport from "../pages/Dashboard/Support/HelpAndSupport/HelpAndSupport";
import SavedAddress from "../pages/Dashboard/MyAccount/SavedAddress/SavedAddress";
import Checkout from "../pages/Checkout/Checkout";
import OrderDetails from "../pages/Dashboard/MyOrders/OrderDetails";
import Invoice from "../pages/Dashboard/Payment/Invoices/Invoice";
import PrivateRoute from "./PrivateRoute";
import ProductManagement from "@/pages/Dashboard/Vendor/ProductManagement/ProductManagement";
import AddNewProducts from "@/pages/Dashboard/Vendor/ProductManagement/AddNewProducts/AddNewProducts";
import ManageInventory from "@/pages/Dashboard/Vendor/ProductManagement/ManageInventory/ManageInventory";
import ViewProductReviews from "@/pages/Dashboard/Vendor/ProductManagement/ViewProductReviews/ViewProductReviews";
import OrderManagement from "@/pages/Dashboard/Vendor/OrderManagement/OrderManagement";
import OrdersReceived from "@/pages/Dashboard/Vendor/OrderManagement/OrdersReceived/OrdersReceived";
import ShippingUpdates from "@/pages/Dashboard/Vendor/OrderManagement/ShippingUpdates/ShippingUpdates";
import ReturnsDisputes from "@/pages/Dashboard/Vendor/OrderManagement/ReturnsDisputes/ReturnsDisputes";
import Analytics from "@/pages/Dashboard/Vendor/Analytics/Analytics";
import SalesAnalytics from "@/pages/Dashboard/Vendor/Analytics/SalesAnalytics/SalesAnalytics";
import RevenueReports from "@/pages/Dashboard/Vendor/Analytics/RevenueReports/RevenueReports";
import BestsellingProducts from "@/pages/Dashboard/Vendor/Analytics/BestsellingProducts/BestsellingProducts";
import SupportTools from "@/pages/Dashboard/Vendor/SupportTools/SupportTools";
import VendorGuidelines from "@/pages/Dashboard/Vendor/SupportTools/VendorGuidelines/VendorGuidelines";
import HelpAndSupportX from "@/pages/Dashboard/Vendor/SupportTools/HelpAndSupport/HelpAndSupport";
import UpdateProductInfo from "@/pages/Dashboard/Vendor/ProductManagement/ManageInventory/UpdateProductInfo/UpdateProductInfo";

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
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
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
      {
        path: "/update-profile",
        element: <UPdateProfile></UPdateProfile>,
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

  // dashboard route
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="my-account" />, // Redirect to my-account by default
      },
      {
        // index: true,
        path: "my-account",
        element: <MyAccount></MyAccount>,
        children: [
          {
            path: "",
            element: <Profile></Profile>,
          },
          {
            path: "savedAddress",
            element: <SavedAddress></SavedAddress>,
          },
          {
            path: "paymentInfo",
            element: <PaymentInfo></PaymentInfo>,
          },
          {
            path: "settings",
            element: <Settings></Settings>,
          },
        ],
      },
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
        children: [
          {
            path: "",
            element: <Cart dashboard={true}></Cart>,
          },
          {
            path: "order-history",
            element: <OrderHistory></OrderHistory>,
          },
          {
            path: "order-details/:id",
            element: <OrderDetails></OrderDetails>,
          },
          {
            path: "wishlist",
            element: <Wishlist></Wishlist>,
          },
        ],
      },
      {
        path: "payment",
        element: <Payment></Payment>,
        children: [
          {
            path: "",
            element: <PaymentHistory></PaymentHistory>,
          },
          {
            path: "invoices",
            element: <Invoices></Invoices>,
          },
          {
            path: "invoice/:id",
            element: <Invoice></Invoice>,
          },
        ],
      },
      {
        path: "support",
        element: <Support></Support>,
        children: [
          {
            path: "",
            element: <HelpAndSupport></HelpAndSupport>,
          },
          {
            path: "notifications",
            element: <Notifications></Notifications>,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },
      // {
      //   path: "profile",
      //   element: <Profile></Profile>,
      // },

      // vendor route
      {
        path: "product-management",
        element: <ProductManagement></ProductManagement>,
        children: [
          {
            path: "",
            element: <AddNewProducts></AddNewProducts>,
          },
          {
            path: "manage-inventory",
            element: <ManageInventory></ManageInventory>,
          },
          {
            path: "update-product/:id",
            element: <UpdateProductInfo></UpdateProductInfo>,
          },
          {
            path: "view-product-reviews",
            element: <ViewProductReviews></ViewProductReviews>,
          },
        ],
      },
      {
        path: "order-management",
        element: <OrderManagement></OrderManagement>,
        children: [
          {
            path: "",
            element: <OrdersReceived></OrdersReceived>,
          },
          {
            path: "shipping-updates",
            element: <ShippingUpdates></ShippingUpdates>,
          },
          {
            path: "returns-disputes",
            element: <ReturnsDisputes></ReturnsDisputes>,
          },
        ],
      },
      {
        path: "analytics",
        element: <Analytics></Analytics>,
        children: [
          {
            path: "",
            element: <SalesAnalytics></SalesAnalytics>,
          },
          {
            path: "revenue-reports",
            element: <RevenueReports></RevenueReports>,
          },
          {
            path: "bestselling-products",
            element: <BestsellingProducts></BestsellingProducts>,
          },
        ],
      },
      {
        path: "support-tools",
        element: <SupportTools></SupportTools>,
        children: [
          {
            path: "",
            element: <VendorGuidelines></VendorGuidelines>,
          },
          {
            path: "help-and-support",
            element: <HelpAndSupportX></HelpAndSupportX>,
          },
          {
            path: "notifications",
            element: <Notifications></Notifications>,
          },
        ],
      },
    ],
  },
]);
