import useGetData from "@/hooks/useGetData";
import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { IoCall, IoChatboxEllipsesOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";

const ContactModal = ({ isOpen, setIsOpen, data }) => {
//   console.log(data);

  const user = useGetData(
    "get-user-for-contact",
    `/user/${data?.order_owner_info.email}`
  );
//   console.log(user);

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-[#FBFBFB] p-6 shadow backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <ul className="flex justify-evenly">
                <li className="flex flex-col items-center">
                  <Link to="/dashboard/support/live-chat">
                    <IoChatboxEllipsesOutline
                      title="Live Chat"
                      className="w-12 h-12 border p-2.5 rounded-full text-gray-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                    />
                  </Link>
                  <h4 className="font-semibold mt-1">Live Chat</h4>
                </li>

                {/* TODO: Integrate automated email template generation (e.g., Mailgun or similar service) */}
                <li className="flex flex-col items-center">
                  <a
                    href={`mailto:${data.order_owner_info.email}`}
                    className="flex flex-col items-center group"
                  >
                    <TfiEmail
                      className="w-12 h-12 border p-2.5 rounded-full text-gray-600 group-hover:text-white group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer"
                      title="Send Email"
                    />
                    <h4 className="font-semibold mt-1 group-hover:text-blue-500 transition-all">
                      Email
                    </h4>
                  </a>
                </li>

                <li className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (user?.number) {
                        window.location.href = `tel:+88${user.number}`;
                      }
                    }}
                    disabled={!user?.number}
                    title={!user?.number ? "number not found" : "call"}
                    className={`rounded-full w-12 h-12 border p-2.5 ${
                      !user?.number
                        ? "text-red-400 border-red-400 bg-opacity-40 cursor-not-allowed"
                        : "text-gray-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110"
                    }`}
                  >
                    <IoCall className="w-full h-full" />
                  </button>

                  <h4 className="font-semibold mt-1">Call</h4>
                </li>
              </ul>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

ContactModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  data: PropTypes.object,
};

export default ContactModal;
