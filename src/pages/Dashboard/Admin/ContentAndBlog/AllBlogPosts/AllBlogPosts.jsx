import { createColumnHelper } from "@tanstack/react-table";

const AllBlogPosts = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Title",
    }),

    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Posted By",
    }),

    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Posted On",
    }),

    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),

    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Actions",
    }),
  ];

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">📚 All Blog Posts</h1>

      
    </section>
  );
};

export default AllBlogPosts;
