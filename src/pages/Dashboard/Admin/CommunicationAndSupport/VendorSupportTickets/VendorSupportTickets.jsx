import Table from "@/components/Table/Table";
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
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { BiConversation } from "react-icons/bi";
import { Link } from "react-router-dom";

const VendorSupportTickets = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const { data: tickets, refetch } = useGetSecureData("tickets", `/tickets`);

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch("/ticket", info);
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
    columnHelper.accessor("ticketID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Ticket ID",
    }),

    columnHelper.accessor("vendorInfo.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Vendor Name",
    }),

    columnHelper.accessor("subject", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Subject",
    }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => {
        const value = info.getValue();
        const formatDate = new Date(value).toLocaleString();
        return <span>{formatDate}</span>;
      },
      header: "Created Date & Time",
    }),

    columnHelper.accessor("status", {
      cell: (info) => {
        const row = info.row.original;

        return (
          <Select
            value={row.status}
            // disabled={row.status === "Closed"}
            onValueChange={(val) => handleStatus({ _id: row._id, status: val })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
      header: "Status",
    }),

    columnHelper.accessor("vendorInfo.email", {
      cell: (info) => {
        const row = info.row.original;

        const ticketDetails = {
          toEmail: row.vendorInfo.email,
          ticket_id: row._id,
          status: row.status,
        };

        return (
          <Link
            to={`/dashboard/communication-and-support/ticket-conversation`}
            state={ticketDetails}
            className="border w-10 h-9 flex justify-center items-center rounded-md shadow-sm hover:bg-blue-500 hover:text-white hover:shadow-md hover:rounded-full transition duration-300 ease-in-out active:scale-90 scale-100 group"
          >
            <BiConversation size={19} />
            {/* <BiSolidConversation size={19} className="group-hover:visible" /> */}
          </Link>
        );
      },
      header: "",
    }),
  ];

  return (
    <section className="p-6">
      <Table columns={columns} data={tickets}></Table>
    </section>
  );
};

export default VendorSupportTickets;
