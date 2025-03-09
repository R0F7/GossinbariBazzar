import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutModal = ({ closeModal, isOpen, orderInfo,setTransactionId }) => {
  
  // if(Object.keys(orderInfo.contactInfo).length < 1) return closeModal(true)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  {/* Review Info Before Order */}
                </DialogTitle>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Total Product items: {orderInfo.total_quantity}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Location: {orderInfo.shippingDetails.village},{" "}
                    {orderInfo.shippingDetails.union}
                  </p>
                </div> */}
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500 flex gap-1">
                    <span>Contact Info:</span>
                    <div className="flex flex-col">
                      <span>Name: {orderInfo.contactInfo.name}</span>
                      <span>Number: {orderInfo.contactInfo.phone_number}</span>
                      <span>Email: {orderInfo.contactInfo.email}</span>
                    </div>
                  </p>
                </div> */}

                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    From: {format(new Date(orderInfo.from), 'PP')} - To:{' '}
                    {format(new Date(orderInfo.to), 'PP')}
                    time
                  </p>
                </div> */}

                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Price: ${orderInfo.total_price}
                  </p>
                </div> */}
                {/* <hr className="mt-8 " /> */}
                {/* checkout form */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm closeModal={closeModal} orderInfo={orderInfo} setTransactionId={setTransactionId}></CheckoutForm>
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

CheckoutModal.propTypes = {
  orderInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  setTransactionId: PropTypes.func,
};

export default CheckoutModal;
