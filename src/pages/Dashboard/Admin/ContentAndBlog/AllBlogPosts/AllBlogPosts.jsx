import Table from "@/components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useGetSecureData from "@/hooks/useGetSecureData";
import { AiOutlineDelete } from "react-icons/ai";

const AllBlogPosts = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useGetSecureData("blogs-for-admin", "/blogs");

  const { mutateAsync: deleteBlog } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/blog/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Blog deleted Successfully");
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Title",
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
      header: "Posted On",
    }),

    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Status",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => (
        <button
          onClick={() => handleDelete(info.getValue())}
          className="border p-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300 scale-100 active:scale-90 shadow-sm"
        >
          <AiOutlineDelete />
        </button>
      ),
      header: "",
    }),
  ];

  if (isLoading) return "Loading...";

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-6">📚 All Blog Posts</h1>

      <Table columns={columns} data={blogs}></Table>
    </section>
  );
};

export default AllBlogPosts;
