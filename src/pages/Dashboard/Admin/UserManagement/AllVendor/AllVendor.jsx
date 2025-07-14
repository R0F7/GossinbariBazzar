import Table from "@/components/Table/Table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetData from "@/hooks/useGetData";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
// import TotalOrderCell from "./TotalSale/TotalSale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import UserProfileModal from "../AllUser/UserProfile/UserProfileModal";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const AllVendor = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [vendorSales, setVendorSales] = useState({});

  const { data: all_vendor = [], refetch } = useGetSecureData(
    "all_vendor_for_admin",
    "/users?role=seller"
  );
  //   console.log(all_vendor);

  const { data: all_products } = useGetSecureData(
    "all_product_for_admin",
    "/products"
  );

  useEffect(() => {
    const fetchSalesData = async () => {
      const sales = {};
      for (const vendor of all_vendor) {
        const { data } = await axiosSecure(`/orders-receive/${vendor.email}`);
        const products = data.flatMap((o) => o.products);
        const total_sale = products.reduce((acc, order) => {
          return (
            acc + Number(order.discounted_price || order.price) * order.quantity
          );
        }, 0);
        sales[vendor.email] = total_sale || 0;
      }
      setVendorSales(sales);
    };

    if (all_vendor.length > 0) {
      fetchSalesData();
    }
  }, [all_vendor, axiosSecure]);

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),

    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),

    // columnHelper.accessor("", {
    //   cell: (info) => <span>{"Shop Name"}</span>,
    //   header: "Shop Name",
    // }),

    columnHelper.accessor("number", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone Number",
    }),

    columnHelper.accessor("email", {
      id: "totalProducts",
      cell: (info) => {
        const email = info.getValue();
        const findUserOrder = all_products.filter(
          (product) => product.vendor_info.email === email
        );

        return <span>{findUserOrder.length}</span>;
      },
      header: "Total Products",
    }),

    columnHelper.accessor("email", {
      id: "totalSales",
      cell: (info) => {
        const email = info.getValue();
        const total = vendorSales[email];
        return <span>${total !== undefined ? total : 0}</span>;
      },
      header: "Total Sales",
    }),

    columnHelper.accessor("_id", {
      id: "action",
      header: "",
      cell: (info) => {
        const id = info.getValue();
        const row = info.row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [action, setAction] = useState(row?.action || "");

        const handleAction = async (val) => {
          setAction(val); // still update state if needed for UI
          const check = await axiosSecure.patch(`/user/${id}`, { action: val });
          if (check.data.acknowledged) {
            refetch();
            toast.success("action update successfully");
          }
        };

        return (
          <Select value={action} onValueChange={handleAction}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem> */}
                <SelectItem value="unblock">Unblock</SelectItem>
                <SelectItem value="block">
                  <span className="text-red-500 font-semibold">Blocked</span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    }),

    columnHelper.accessor("email", {
      id: "viewProfile",
      cell: (info) => {
        const email = info.getValue();

        const matchedUser = all_vendor.find((user) => user.email === email);
        const matchedOrders = all_products.filter(
          (order) => order?.vendor_info.email === email
        );

        const userData = {
          name: matchedUser?.name || "N/A",
          email: matchedUser?.email || "N/A",
          phone: matchedUser?.number || "N/A",
          photo: matchedUser?.image_url || "",
          address: matchedUser?.address || "N/A",
          totalProducts: matchedOrders.length,
          createdAt: new Date(matchedUser?.timestamp).toLocaleDateString(
            "en-GB"
          ),
          lastLogin: matchedUser?.lastLogin
            ? new Date(matchedUser?.lastLogin).toLocaleDateString("en-GB")
            : "N/A",
          status: matchedUser?.isActive ? "Active" : "Inactive",
        };

        return (
          <button
            onClick={() => {
              setIsOpen(true);
              setUserInfo(userData);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            {/* <FaEye /> Info */}
            <CgProfile />
          </button>
        );
      },
      header: "Profile",
    }),

    columnHelper.accessor("email", {
      cell: (info) => {
        const email = info.getValue();
        return (
          <Link to={`/dashboard/user-management/products/${email}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <FaEye /> Products
            </button>
          </Link>
        );
      },
      header: "",
    }),
  ];

  return (
    <section className="p-6">
      <h1 className="font-semibold text-2xl mb-8">All Vendors</h1>
      <Table columns={columns} data={all_vendor}></Table>

      <UserProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={userInfo}
        isAllVendor={true}
      ></UserProfileModal>
    </section>
  );
};

export default AllVendor;
