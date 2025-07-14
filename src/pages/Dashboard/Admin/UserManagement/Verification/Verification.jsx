import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Verification = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const { data: all_users, refetch } = useGetSecureData(
    "user-for-verification",
    `/users`
  );
  //   console.log(all_users);

  const vendor_requested_users = all_users.filter(
    (user) => user.status !== "Verified"
  );
  console.log(vendor_requested_users);

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),

    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),

    columnHelper.accessor((row) => row.vendor_info?.vendor_name || "N/A", {
      id: "vendorName",
      header: "Vendor Name",
      cell: (info) => <span>{info.getValue()}</span>,
    }),

    columnHelper.accessor("vendor_info", {
      header: "Application Date",
      cell: (info) => {
        const rawDate = info.getValue()?.requestedAt;
        const formattedDate = rawDate
          ? new Date(rawDate).toLocaleDateString("en-GB")
          : "N/A";

        return <span>{formattedDate}</span>;
      },
    }),

    columnHelper.accessor("email", {
      id: "action",
      header: "",
      cell: (info) => {
        const email = info.getValue();
        const row = info.row.original;

        const handleAction = async (val) => {
          const check = await axiosSecure.patch(`/user-role/${email}`, {
            status: val,
            role: "seller",
          });
          if (check.data.acknowledged) {
            refetch();
            toast.success("status update successfully");
          }
        };

        return (
          <Select value={row?.status} onValueChange={handleAction}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Requested">Requested</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    }),
  ];

  return (
    <section className="p-4">
      <h1 className="font-semibold text-2xl mb-8">Verification</h1>

      <Table columns={columns} data={vendor_requested_users}></Table>
    </section>
  );
};

export default Verification;
