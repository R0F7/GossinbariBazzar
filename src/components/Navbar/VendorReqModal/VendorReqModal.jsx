import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const VendorReqModal = ({ isOpenModal, setIsOpenModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user_info_DB } = useAuth();
  // const all_status = [
  //   "New Vendor",
  //   "Good Vendor",
  //   "Best Vendor",
  //   "Suspended",
  //   "Blocked",
  // ];
  // console.log(user_info_DB.status);

  const handleVendorInfoForm = async (e) => {
    e.preventDefault();

    const form = e.target;
    const vendor_name = form.vendor_name.value;
    const bank_account = form.number.value;

    // if (bank_account > ) {

    // }

    const vendor_info = {
      vendor_name,
      bank_account,
      // vendor_request: true,
      status: "Requested", //"New Vendor" Verified, Good Vendor, Best Vendor, Suspended,Blocked
      requestedAt: new Date(),
    };

    const res = await axiosSecure.patch(`user/${user_info_DB?._id}`, {
      vendor_info,
    });
    console.log(res);

    if (res.data.acknowledged) {
      toast.success("Request has been successfully");
      setIsOpenModal(false);
    }
  };

  return (
    <Dialog
      open={isOpenModal}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpenModal(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-[#FBFBFB] p-6 shadow-xl backdrop-blur-2xl">
            {user_info_DB.status === "Requested" ? (
              "already applied"
            ) : (
              <form onSubmit={handleVendorInfoForm}>
                <label htmlFor="vendor_name">
                  <h4 className="text-sm font-medium">Vendor Name:</h4>
                  <input
                    type="text"
                    name="vendor_name"
                    id=""
                    placeholder="Vendor Name"
                    className="border rounded w-full my-1.5 px-2 py-1.5 shadow-sm placeholder:text-sm outline-blue-500"
                    required
                  />
                </label>

                <label htmlFor="number">
                  <h4 className="text-sm font-medium">Bank Account</h4>
                  <input
                    type="number"
                    name="number"
                    id=""
                    placeholder="1111 2222 3333 4444"
                    className="border rounded w-full mt-1.5 px-2 py-1.5 shadow-sm placeholder:text-sm outline-blue-500"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold border border-blue-500 rounded-md px-6 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-2"
                >
                  Submit
                </button>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

VendorReqModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object,
  isAllVendor: PropTypes.bool,
};

export default VendorReqModal;
