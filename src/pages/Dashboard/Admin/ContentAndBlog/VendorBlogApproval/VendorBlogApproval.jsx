import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BlogDetailsModal from "@/pages/Blogs/BlogDetailsModal";

const VendorBlogApproval = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setDate] = useState({});

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useGetSecureData("blogs-for-approval", "/blogs");

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch("/blog", { info });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Status Update Successfully");
    },
  });

  const handleStatus = async (info) => {
    try {
      await updateStatus(info);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Blog Title",
    }),

    columnHelper.accessor("posted_by.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Posted By",
    }),

    columnHelper.accessor("date", {
      cell: (info) => {
        const date = new Date(info.getValue()).toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return <span>{date}</span>;
      },
      header: "Submitted On",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <Button
            onClick={() => {
              setIsOpen(true), setDate(row);
            }}
            className="bg-blue-500 hover:bg-blue-600"
          >
            View Preview
          </Button>
        );
      },
      header: "Preview",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <Select
            value={row.status}
            onValueChange={(val) => handleStatus({ id: row._id, status: val })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Published">Approve</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Reject">Reject</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
      header: "Actions",
    }),
  ];

  if (isLoading) return "Loading...";

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-6">📝 Vendor Blog Approval</h1>

      <Table columns={columns} data={blogs}></Table>

      {/* blog details modal */}
      <BlogDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
      ></BlogDetailsModal>
    </section>
  );
};

export default VendorBlogApproval;
