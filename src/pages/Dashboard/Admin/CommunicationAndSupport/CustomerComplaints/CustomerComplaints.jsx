import Table from "@/components/Table/Table";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ComplainDetailsModal from "./ComplainDetailsModal";

const CustomerComplaints = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [complainID, setComplainID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: complaints, refetch } = useGetSecureData(
    "complaints",
    "/complaints"
  );
  const { data: complain } = useGetSecureData(
    "complain",
    `/complain/${complainID}`
  );

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch("/complaints", info);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Status Update Successfully");
    },
  });

  const handleStatus = (info) => {
    try {
      updateStatus(info);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    columnHelper.accessor("subject", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Subject",
    }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("complainant.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => <span>{new Date(info.getValue()).toDateString()}</span>,
      header: "createdAt",
    }),

    columnHelper.accessor("status", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <Select
            value={row.status}
            onValueChange={(val) => handleStatus({ _id: row._id, status: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
      header: "Status",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => (
        <Button
          onClick={() => {
            setComplainID(info.getValue()), setIsOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 scale-100 active:scale-90 transition duration-300"
        >
          Detail View
        </Button>
      ),
      header: "",
    }),
  ];

  return (
    <section className="p-6">
      <Table columns={columns} data={complaints}></Table>

      <ComplainDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={complain}
      ></ComplainDetailsModal>
    </section>
  );
};

export default CustomerComplaints;
