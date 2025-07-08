import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const TxnDetailsModal = ({ isOpen, setIsOpen, data }) => {
  //   console.log(data);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
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
              <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-md">
                <h2 className="text-2xl font-bold mb-6">Transaction Details</h2>
                <div className="border rounded-md p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Transaction ID:</strong>{" "}
                    {data.paymentInfo?.transactionId}
                    <br />
                    <strong>Order ID:</strong> {data?.orderID}
                    <br />
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600">
                      {data.paymentInfo?.paymentStatus}
                    </span>
                    <br />
                    <strong>Date:</strong>{" "}
                    {new Date(data.createdAt).toLocaleString()}
                  </div>

                  <div className="mb-2">
                    <strong>Buyer:</strong> {data.order_owner_info?.name} (
                    {data.order_owner_info?.email})
                  </div>

                  <div>
                    <strong>Products:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {(data?.products || []).map((p, i) => (
                        <li key={i}>
                          {p.name} — {p.quantity} × {p.unit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <strong>Total Amount:</strong> ${data.total_price}
                    <br />
                    <strong>Payment Method:</strong>{" "}
                    {data.paymentInfo?.paymentMethod}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

TxnDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  data: PropTypes.object,
};

export default TxnDetailsModal;
