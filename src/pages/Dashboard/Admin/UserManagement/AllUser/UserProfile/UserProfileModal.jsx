import { Dialog, DialogPanel } from "@headlessui/react";
import Unknown from "../../../../../../assets/unknown Image.jpg";
import PropTypes from "prop-types";

const UserProfileModal = ({ isOpen, setIsOpen, data, isAllVendor }) => {
  if (!data) return null;

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-[#FBFBFB] p-6 shadow-xl backdrop-blur-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                User Profile
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-gray-600 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={data.photo || Unknown}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold">{data.name}</h3>
                <p className="text-sm text-gray-600">{data.email}</p>
                <p className="text-sm text-gray-600">{data.phone}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Address Info */}
              <div className="">
                <h4 className="font-semibold text-gray-700">Address</h4>
                <p className="text-sm text-gray-800">{data.address}</p>
                {/* <p className="text-sm text-gray-800">
                Shipping: {data.shippingAddress}
              </p> */}
                {/* <p className="text-sm text-gray-800">
                Billing: {data.billingAddress}
              </p> */}
              </div>

              {/* Order & Activity Info */}
              <div className="">
                <h4 className="font-semibold text-gray-700">Activity</h4>
                <p className="text-sm text-gray-800">
                  Joined: {data.createdAt}
                </p>
                <p className="text-sm text-gray-800">
                  {/* Total Orders: {data.totalOrders} */}
                  {isAllVendor
                    ? `Total Product ${data.totalProducts}`
                    : `Total Orders: ${data.totalOrders}`}
                </p>
                <p className="text-sm text-gray-800">
                  {!isAllVendor && ` Last Order: ${data.lastOrderDate}`}
                </p>
              </div>

              {/* Status */}
              <div>
                <h4 className="font-semibold text-gray-700">Account Status</h4>
                <p className="text-sm">
                  Status:
                  <span
                    className={`ml-1 font-semibold ${
                      data.status === "Active"
                        ? "text-green-600"
                        : data.status === "Banned"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {data.status}
                  </span>
                </p>
                <p className="text-sm text-gray-800">
                  Last Login: {data.lastLogin}
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

UserProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  data: PropTypes.object,
  isAllVendor: PropTypes.bool,
};

export default UserProfileModal;
