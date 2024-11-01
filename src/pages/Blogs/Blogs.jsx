import { useQuery } from "@tanstack/react-query";
import { GoSearch } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { LiaCommentsSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";

const Blogs = () => {
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetch("./blogs.json").then((res) => res.json()),
  });
  console.log(blogs);

  const recent_blogs = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  console.log(recent_blogs);

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
        <div className="w-1/4 pr-2">
          <form className="flex items-center relative mb-6">
            <input
              type="text"
              name="search"
              id="search"
              className="border border-[#0000001a] w-full py-2 pl-3 shadow rounded-md bg-[#F4F6F8] outline-none"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 font-bold text-xl"
            >
              <GoSearch />
            </button>
          </form>

          {/* blogs categories */}
          <div className="">
            <h4 className="text-lg font-semibold text-[#535A63] mb-3">
              Blog Categories
            </h4>
            <ul className="flex flex-col space-y-3 mb-7">
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[15px] text-[rgb(46,141,216)] "
                    : "text-sm text-[#535A63]"
                }
              >
                Eco Technology <span className="ml-1 text-sm">(3)</span>
              </NavLink>
              <NavLink
                to="/environments"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[15px] text-[rgb(46,141,216)] "
                    : "text-sm text-[#535A63]"
                }
              >
                Environments <span className="ml-1 text-sm">(7)</span>
              </NavLink>
              <NavLink
                to="/family"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[15px] text-[rgb(46,141,216)] "
                    : "text-sm text-[#535A63]"
                }
              >
                Family <span className="ml-1 text-sm">(5)</span>
              </NavLink>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[15px] text-[rgb(46,141,216)] "
                    : "text-sm text-[#535A63]"
                }
              >
                Home <span className="ml-1 text-sm">(5)</span>
              </NavLink>
              <NavLink
                to="/widelife"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[15px] text-[rgb(46,141,216)] "
                    : "text-sm text-[#535A63]"
                }
              >
                widlelife <span className="ml-1 text-sm">(8)</span>
              </NavLink>
            </ul>

            <div>
              <h4 className="text-lg font-semibold text-[#535A63] mb-3">
                Recent Posts
              </h4>
              <div>
                {recent_blogs.map((recent_blog) => (
                  <div key={recent_blog._id} className="flex gap-2 mb-4">
                    <div className="w-14 h-10 mt-1.5">
                      <img
                        className="w-full h-full"
                        src={recent_blog.image}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <h4 className="mb-1 text-[#3A434D]">
                        {recent_blog.title.length > 40
                          ? `${recent_blog.title.slice(0, 40) + "..."}`
                          : recent_blog.title}
                      </h4>
                      <div className="flex text-sm">
                        <h6 className="border-r pr-1.5 text-[#758390] font-mono">
                          {recent_blog.date}
                        </h6>
                        <h6 className="pl-1.5 text-[#515961]">
                          <span>By </span>
                          {recent_blog.posted_by.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="w-3/4 pl-4 border-gray-300 border-l ">
          {blogs.map((blog) => (
            <div key={blog._id} className="mb-6">
              <div className="w-[75%] h-[400px]">
                <img className="w-full h-full" src={blog.image} alt="" />
              </div>
              <div className="flex items-center gap-1 mt-5 mb-3.5">
                {blog.categories.map((category, idx) => (
                  <h4
                    key={idx}
                    className="border rounded-full py-0.5 px-2.5 text-sm"
                  >
                    {category}
                  </h4>
                ))}
              </div>
              <h1 className="text-2xl font-semibold mb-1">{blog.title}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border">
                    <img
                      className="w-full h-full rounded-full"
                      src={blog.posted_by.image}
                      alt=""
                    />
                  </div>
                  <h4>{blog.posted_by.name}</h4>
                </div>
                <h4 className="border-x px-2">{blog.date}</h4>
                <div className="flex items-center gap-1.5">
                  <LiaCommentsSolid />
                  <span>1 comment</span>
                </div>
              </div>
              <p className="w-[75%] mb-1">{blog.long_description}</p>
              <button className="font-bold text-[#3691D9] text-sm">Continue Reading</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
