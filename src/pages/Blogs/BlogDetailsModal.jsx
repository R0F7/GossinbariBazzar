import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";

const BlogDetailsModal = ({ isOpen, setIsOpen, data }) => {
  const {
    title,
    image: mainImage,
    description,
    date,
    tags,
    category,
    posted_by: { name, image: userImg } = {},
  } = data;

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/40">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-[#FBFBFB] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div>
                <h1 className="text-xl font-semibold mb-3">{title}</h1>

                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full">
                      <img src={userImg} alt="" />
                    </div>

                    <div>
                      <h4 className="font-semibold">{name}</h4>
                      <p className="text-sm">
                        {new Date(date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <ul className="flex gap-2">
                    <li>
                      <a href="#">
                        <FaFacebookF className="border border-blue-950 text-blue-950  w-9 h-9 rounded-full p-2" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaXTwitter className="border border-blue-950 text-blue-950  w-9 h-9 rounded-full p-2" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoShareSocialSharp className="border border-blue-950 text-blue-950  w-9 h-9 rounded-full p-2" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mb-3 h-[220px]">
                  <img className="w-full h-full" src={mainImage} alt="" />
                </div>

                <div className="flex justify-between items-center mb-3">
                  <h4 className="border inline-block px-3 py-0.5 text-sm font-semibold rounded-full shadow-sm">
                    {category}
                  </h4>

                  <div className="space-x-2.5">
                    {(tags || []).map((tag, idx) => (
                      <span key={idx} className={idx === 1 && "border-x px-2"}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p>{description}</p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

BlogDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  data: PropTypes.object,
};

export default BlogDetailsModal;
