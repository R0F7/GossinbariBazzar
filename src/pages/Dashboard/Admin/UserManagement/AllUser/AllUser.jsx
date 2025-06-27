import Table from "@/components/Table/Table";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import UserProfileModal from "./UserProfile/UserProfileModal";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: all_users = [], refetch } = useGetSecureData(
    "all-user-for-admin",
    "/users?role=customer"
  );
  const columnHelper = createColumnHelper();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { data: orderData = [] } = useGetSecureData(
    "order-data-for-admin",
    `/order-for-admin`
  );
  // console.log(orderData);

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosSecure.delete(
        `/delete-user-by-email/${email}`
      );
      return data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      refetch();
    },
  });

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const value = info.getValue();
        const full_name = value.split(" ");

        return (
          <span className="text-sm">
            {full_name[0] + " " + full_name[full_name.length - 1]}
          </span>
        );
      },
      header: "Name",
    }),

    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),

    columnHelper.accessor("number", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Mobile Number",
    }),

    columnHelper.accessor("timestamp", {
      cell: (info) => {
        const date = new Date(info.getValue());
        const formatted = date.toLocaleDateString("en-GB");
        return <span>{formatted}</span>;
      },
      header: "Join Date",
    }),

    columnHelper.accessor("email", {
      id: "totalOrders",
      cell: (info) => {
        const email = info.getValue();
        const findUserOrder = orderData.filter(
          (order) => order.order_owner_info.email === email
        );

        return <span>{findUserOrder.length}</span>;
      },
      header: "Total Orders",
    }),

    columnHelper.accessor("isActive", {
      cell: (info) => {
        const value = info.getValue();
        const row = info.row.original;

        if (row?.action === "block") {
          return (
            <div className="flex items-center gap-1 border border-red-500 px-2 py-1 rounded-lg shadow-md">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-xs font-semibold text-red-500">Block</span>
            </div>
          );
        }

        return (
          <div className="w-fit ">
            {value ? (
              <div className="flex items-center gap-1 border border-green-500 px-2 py-1 rounded-lg shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-semibold text-green-500">
                  Active
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 border border-red-500 px-2 py-1 rounded-lg shadow-md">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>

                <span className="text-xs font-semibold text-red-500">
                  Inactive
                </span>
              </div>
            )}
          </div>
        );
      },
      header: "Status",
    }),

    columnHelper.accessor("email", {
      id: "viewProfile",
      cell: (info) => {
        const email = info.getValue();

        const matchedUser = all_users.find((user) => user.email === email);
        const matchedOrders = orderData.filter(
          (order) => order?.order_owner_info.email === email
        );

        const userData = {
          name: matchedUser?.name || "N/A",
          email: matchedUser?.email || "N/A",
          phone: matchedUser?.number || "N/A",
          photo: matchedUser?.image_url || "",
          shippingAddress: matchedUser?.address || "N/A",
          totalOrders: matchedOrders.length,
          lastOrderDate: matchedOrders[matchedOrders.length - 1]?.createdAt
            ? new Date(
                matchedOrders[matchedOrders.length - 1]?.createdAt
              ).toLocaleDateString()
            : "N/A",
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
            <FaEye /> View
          </button>
        );
      },
      header: "Profile",
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
                <SelectItem value="block">
                  <span className="text-red-500 font-semibold">Block</span>
                </SelectItem>
                <SelectItem value="unblock">Unblock</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    }),

    columnHelper.accessor("email", {
      id: "delete",
      cell: (info) => {
        const email = info.getValue();

        return (
          <button
            onClick={() => {
              deleteUser(email);
            }}
            className="bg-blue-500 hover:bg-red-500 text-white text-sm font-semibold border border-blue-500 hover:border-red-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <RiDeleteBinLine />
          </button>
        );
      },
      header: "",
    }),
  ];

  return (
    <section className="p-6">
      <h1 className="font-semibold text-2xl mb-4">All Users</h1>
      <Table columns={columns} data={all_users}></Table>
      <UserProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={userInfo}
      ></UserProfileModal>
    </section>
  );
};

export default AllUser;
