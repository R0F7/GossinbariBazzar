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
// import HelpAndSupportX from "@/pages/Dashboard/Vendor/SupportTools/HelpAndSupport/HelpAndSupport";
import UpdateProductInfo from "@/pages/Dashboard/Vendor/ProductManagement/ManageInventory/UpdateProductInfo/UpdateProductInfo";
import ViewReviews from "@/pages/Dashboard/Vendor/ProductManagement/ViewProductReviews/ViewReviews/ViewReviews";

import UserManagement from "@/pages/Dashboard/Admin/UserManagement/UserManagement";
import AllUser from "@/pages/Dashboard/Admin/UserManagement/AllUser/AllUser";
import AllVendor from "@/pages/Dashboard/Admin/UserManagement/AllVendor/AllVendor";
import Verification from "@/pages/Dashboard/Admin/UserManagement/Verification/Verification";
import RolesPermissions from "@/pages/Dashboard/Admin/UserManagement/RolesPermissions/RolesPermissions";
import AllProductsOverview from "@/pages/Dashboard/Admin/ProductAndCategory/AllProductsOverview/AllProductsOverview";
import ProductAndCategory from "@/pages/Dashboard/Admin/ProductAndCategory/ProductAndCategory";
import ApproveNewProducts from "@/pages/Dashboard/Admin/ProductAndCategory/ApproveNewProducts/ApproveNewProducts";
import CategoriesAndSubcategories from "@/pages/Dashboard/Admin/ProductAndCategory/CategoriesAndSubcategories/CategoriesAndSubcategories";
import AddEditDeleteProducts from "@/pages/Dashboard/Admin/ProductAndCategory/AddEditDeleteProducts/AddEditDeleteProducts";
import AdminOrderManagement from "@/pages/Dashboard/Admin/AdminOrderManagement/AdminOrderManagement";
import AllOrders from "@/pages/Dashboard/Admin/AdminOrderManagement/AllOrders/AllOrders";
import ReturnsAndRefunds from "@/pages/Dashboard/Admin/AdminOrderManagement/ReturnsAndRefunds/ReturnsAndRefunds";
import TrackOrders from "@/pages/Dashboard/Admin/AdminOrderManagement/TrackOrders/TrackOrders";
import TransactionAndPayment from "@/pages/Dashboard/Admin/TransactionAndPayment/TransactionAndPayment";
import AllTransactions from "@/pages/Dashboard/Admin/TransactionAndPayment/AllTransactions/AllTransactions";
import VendorPaymentHistory from "@/pages/Dashboard/Admin/TransactionAndPayment/VendorPaymentHistory/VendorPaymentHistory";
import CustomerRefundLogs from "@/pages/Dashboard/Admin/TransactionAndPayment/CustomerRefundLogs/CustomerRefundLogs";
import CommissionReports from "@/pages/Dashboard/Admin/TransactionAndPayment/CommissionReports/CommissionReports";
import AnalyticsAndInsights from "@/pages/Dashboard/Admin/AnalyticsAndInsights/AnalyticsAndInsights";
import UserAndVendorGrowthStats from "@/pages/Dashboard/Admin/AnalyticsAndInsights/UserAndVendorGrowthStats/UserAndVendorGrowthStats";
import SalesPerformance from "@/pages/Dashboard/Admin/AnalyticsAndInsights/SalesPerformance/SalesPerformance";
import TrafficAndEngagement from "@/pages/Dashboard/Admin/AnalyticsAndInsights/TrafficAndEngagement/TrafficAndEngagement";
import ContentAndBlog from "@/pages/Dashboard/Admin/ContentAndBlog/ContentAndBlog";
import AllBlogPosts from "@/pages/Dashboard/Admin/ContentAndBlog/AllBlogPosts/AllBlogPosts";
import VendorBlogApproval from "@/pages/Dashboard/Admin/ContentAndBlog/VendorBlogApproval/VendorBlogApproval";
import TagsAndCategories from "@/pages/Dashboard/Admin/ContentAndBlog/TagsAndCategories/TagsAndCategories";
import CommunicationAndSupport from "@/pages/Dashboard/Admin/CommunicationAndSupport/CommunicationAndSupport";
import ContactMessages from "@/pages/Dashboard/Admin/CommunicationAndSupport/ContactMessages/ContactMessages";
import VendorSupportTickets from "@/pages/Dashboard/Admin/CommunicationAndSupport/VendorSupportTickets/VendorSupportTickets";
import CustomerComplaints from "@/pages/Dashboard/Admin/CommunicationAndSupport/CustomerComplaints/CustomerComplaints";
import SystemAndSettings from "@/pages/Dashboard/Admin/SystemAndSettings/SystemAndSettings";
import SiteSettings from "@/pages/Dashboard/Admin/SystemAndSettings/SiteSettings/SiteSettings";
import NotificationSettings from "@/pages/Dashboard/Admin/SystemAndSettings/NotificationSettings/NotificationSettings";
import SEOAndMetaInfo from "@/pages/Dashboard/Admin/SystemAndSettings/SEOAndMetaInfo/SEOAndMetaInfo";
import MaintenanceModeToggle from "@/pages/Dashboard/Admin/SystemAndSettings/MaintenanceModeToggle/MaintenanceModeToggle";
import ViewVendorProducts from "@/pages/Dashboard/Admin/UserManagement/AllVendor/ViewVendorProducts/ViewVendorProducts";

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
          // {
          //   path: ":x",
          //   element: <HelpAndSupport></HelpAndSupport>,
          // },
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
          {
            path: "view-reviews/:id",
            element: <ViewReviews></ViewReviews>,
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
            path: "help-and-support/:x",
            element: <HelpAndSupport></HelpAndSupport>,
          },
          {
            path: "notifications",
            element: <Notifications></Notifications>,
          },
        ],
      },

      // admin route
      {
        path: "user-management",
        element: <UserManagement></UserManagement>,
        children: [
          {
            path: "",
            element: <AllUser></AllUser>,
          },
          {
            path: "view-all-vendor",
            element: <AllVendor></AllVendor>,
          },
          {
            path: "products/:email",
            element: <ViewVendorProducts></ViewVendorProducts>,
          },
          {
            path: "vendor-verification",
            element: <Verification></Verification>,
          },
          {
            path: "roles-permissions",
            element: <RolesPermissions></RolesPermissions>,
          },
        ],
      },

      {
        path: "product-and-category",
        element: <ProductAndCategory></ProductAndCategory>,
        children: [
          {
            path: "",
            element: <AllProductsOverview></AllProductsOverview>,
          },
          {
            path: "approve-new-products",
            element: <ApproveNewProducts></ApproveNewProducts>,
          },
          {
            path: "categories-and-subcategories",
            element: <CategoriesAndSubcategories></CategoriesAndSubcategories>,
          },
          {
            path: "add-edit-delete-products",
            element: <AddEditDeleteProducts></AddEditDeleteProducts>,
          },
        ],
      },
      {
        path: "admin-order-management",
        element: <AdminOrderManagement></AdminOrderManagement>,
        children: [
          {
            path: "",
            element: <AllOrders></AllOrders>,
          },
          {
            path: "return-and-refund",
            element: <ReturnsAndRefunds></ReturnsAndRefunds>,
          },
          {
            path: "track-orders",
            element: <TrackOrders></TrackOrders>,
          },
        ],
      },
      {
        path: "transaction-and-payment",
        element: <TransactionAndPayment></TransactionAndPayment>,
        children: [
          {
            path: "",
            element: <AllTransactions></AllTransactions>,
          },
          {
            path: "vendor-payment-history",
            element: <VendorPaymentHistory></VendorPaymentHistory>,
          },
          {
            path: "customer-refund-logs",
            element: <CustomerRefundLogs></CustomerRefundLogs>,
          },
          {
            path: "commission-reports",
            element: <CommissionReports></CommissionReports>,
          },
        ],
      },
      {
        path: "analytics-and-insights",
        element: <AnalyticsAndInsights></AnalyticsAndInsights>,
        children: [
          {
            path: "",
            element: <UserAndVendorGrowthStats></UserAndVendorGrowthStats>,
          },
          {
            path: "sales-performance",
            element: <SalesPerformance></SalesPerformance>,
          },
          {
            path: "traffic-and-engagement",
            element: <TrafficAndEngagement></TrafficAndEngagement>,
          },
        ],
      },
      {
        path: "content-and-blog",
        element: <ContentAndBlog></ContentAndBlog>,
        children: [
          {
            path: "",
            element: <AllBlogPosts></AllBlogPosts>,
          },
          {
            path: "vendor-blog-approval",
            element: <VendorBlogApproval></VendorBlogApproval>,
          },
          {
            path: "tags-categories",
            element: <TagsAndCategories></TagsAndCategories>,
          },
        ],
      },
      {
        path: "communication-and-support",
        element: <CommunicationAndSupport></CommunicationAndSupport>,
        children: [
          {
            path: "",
            element: <ContactMessages></ContactMessages>,
          },
          {
            path: "vendor-support-tickets",
            element: <VendorSupportTickets></VendorSupportTickets>,
          },
          {
            path: "customer-complaints",
            element: <CustomerComplaints></CustomerComplaints>,
          },
        ],
      },
      {
        path: "system-settings",
        element: <SystemAndSettings></SystemAndSettings>,
        children: [
          {
            path: "",
            element: <SiteSettings></SiteSettings>,
          },
          {
            path: "notification-settings",
            element: <NotificationSettings></NotificationSettings>,
          },
          {
            path: "SEO-&-meta-info",
            element: <SEOAndMetaInfo></SEOAndMetaInfo>,
          },
          {
            path: "maintenance-mode-toggle",
            element: <MaintenanceModeToggle></MaintenanceModeToggle>,
          },
        ],
      },
    ],
  },
]);
