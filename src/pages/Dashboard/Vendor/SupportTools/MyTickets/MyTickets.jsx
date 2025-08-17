import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import CreateNewTicketModal from "./CreateNewTicketModal";
import useGetSecureData from "@/hooks/useGetSecureData";
import useAuth from "@/hooks/useAuth";
import Table from "@/components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";

const MyTickets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const columnHelper = createColumnHelper();
  const { data: tickets } = useGetSecureData(
    "tickets",
    `/tickets/${user.email}`
  );
  console.log(tickets);

  const getStatusTickets = (status) => {
    const findTickets = tickets.filter((ticket) => ticket.status === status);
    return findTickets.length;
  };

  const columns = [
    columnHelper.accessor("ticketID", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Ticket ID",
    }),

    columnHelper.accessor("subject", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Subject",
    }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span>
          {new Date(info.getValue()).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
      header: "Created Date",
    }),
  ];

  return (
    <section className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">📩 My Support Tickets</h1>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 px-2 py-5 hover:bg-blue-600 scale-100 active:scale-90 transition duration-300 "
        >
          <TiPlusOutline />
          Create New Ticket
        </Button>
      </div>
      <ul className="flex gap-4 text-lg font-semibold my-6">
        <li>Open ({getStatusTickets("Open")})</li>
        <li>In Progress (1)</li>
        <li>Resolved (2)</li>
        <li>Closed (2)</li>
        <li>All Tickets</li>
      </ul>
      table
      <div>| Ticket ID | Subject | Status | Last Updated |</div>
      <Table columns={columns} data={tickets}></Table>
      <CreateNewTicketModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></CreateNewTicketModal>
    </section>
  );
};

export default MyTickets;
