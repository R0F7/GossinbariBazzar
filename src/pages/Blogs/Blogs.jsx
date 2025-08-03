import { Button } from "@/components/ui/button";
import useGetData from "@/hooks/useGetData";
import useRole from "@/hooks/useRole";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import BlogDetailsModal from "./BlogDetailsModal";
import blogCategories from "@/share/blogCategories";
import emptyImg from "../../assets/empty for blog.webp";

const Blogs = () => {
  const [role, isLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setDate] = useState({});
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const blogs = useGetData(
    "blogs",
    `/blogs?category=${category}&&search=${searchText}`
  );

  const recent_blogs = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // .slice(0, 4);

  if (isLoading) {
    return "loading...";
  }

  return (
    <section className="container mx-auto">
      {/* page location  */}
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-1.5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Eco Technology</h4>
        </div>
        <div className="flex items-center gap-1">
          <i>
            <IoIosArrowBack />
          </i>
          <h4>Previous page</h4>
        </div>
      </div>

      <div className="flex">
        {/* left part */}
        <div className="w-1/5 pr-2 sticky top-[185px] h-screen border-r mr-2">
          <div className="mb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault(), setSearchText(e.target.search.value);
              }}
              className="flex items-center relative mb-2.5"
            >
              <input
                type="text"
                name="search"
                id="search"
                className="border border-[#0000001a] w-full py-1.5 pl-3 pr-9 shadow rounded-md bg-[#F4F6F8] outline-none"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 font-bold text-xl"
              >
                <GoSearch />
              </button>
            </form>

            {role !== "customer" && (
              <Link to="/add-blog">
                <Button className="bg-blue-500 hover:bg-blue-600 w-full py-5 scale-100 active:scale-95 transition duration-300">
                  <ImBlog />
                  Write a Blog
                </Button>
              </Link>
            )}
          </div>

          {/* blogs categories */}
          <div className="">
            <h4 className="text-lg font-semibold text-[#535A63] mb-3">
              Blog Categories
            </h4>
            <ul className="flex flex-col space-y-3 mb-7">
              {Object.entries(blogCategories).map(([key, value], idx) => {
                const countBlg = blogs.filter((blog) => blog.category === key);

                return (
                  <li
                    key={idx}
                    onClick={() => setCategory(key)}
                    className={`text-[#535A63] cursor-pointer select-none ${
                      category === key && "font-semibold"
                    }`}
                  >
                    {value} ({countBlg.length})
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* right part */}
        <div className="w-4/5 grid grid-cols-3 gap-6">
          {recent_blogs.length !== 0 ? (
            recent_blogs.map((blog) => (
              <div
                key={blog?._id}
                onClick={() => {
                  setIsOpen(true), setDate(blog);
                }}
                className="rounded-lg border group overflow-hidden shadow-sm hover:shadow-md h-fit"
              >
                <div className="h-[220px] group-hover:scale-105 transition duration-300">
                  <img
                    className="w-full h-full rounded-t-lg "
                    src={blog?.image}
                    alt=""
                  />
                </div>

                <div className="m-4">
                  <h4 className="border inline-block px-3 py-0.5 text-sm font-semibold rounded-full">
                    {blog?.category}
                  </h4>
                  <h2 className="text-xl font-semibold mt-1 mb-2.5">
                    {blog?.title}
                  </h2>
                  <p>{blog?.description?.slice(0, 100)}...</p>

                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full">
                      <img src={blog?.posted_by?.image} alt="" />
                    </div>

                    <div>
                      <h4 className="font-semibold">{blog?.posted_by?.name}</h4>
                      <p className="text-sm">
                        {blog?.date &&
                          new Date(blog?.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center -mt-48">
              <div className="w-[500px]">
                <img className="" src={emptyImg} alt="" />
              </div>

              <Button
                onClick={() => {
                  setSearchText(""), setCategory("");
                }}
                className="bg-blue-500 hover:bg-blue-600 shadow scale-100 active:scale-95 transition duration-300"
              >
                Rest All Query
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* blog details modal */}
      <BlogDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
      ></BlogDetailsModal>
    </section>
  );
};

export default Blogs;
