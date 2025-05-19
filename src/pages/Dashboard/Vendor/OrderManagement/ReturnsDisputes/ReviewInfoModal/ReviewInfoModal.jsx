import useGetData from "@/hooks/useGetData";
import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const ReviewInfoModal = ({ isOpen, setIsOpen, data }) => {
  const productId = data?.productSummery?.id;

  const product = useGetData(
    "product_finding",
    productId ? `/product/${productId}` : null
  );
  // console.log(product);

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
              className="w-full max-w-md rounded-xl bg-[#FBFBFB] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div>
                <div className="flex">
                  <div className="flex-1">
                    <h4>Reason: <span className="font-semibold">{data?.reason}</span></h4>
                    <p>Description: {data?.description}</p>
                  </div>
                  <img className="w-20 h-16 rounded-md" src={data?.image} alt="" />
                </div>

                <table className="table-auto w-full border-collapse border border-gray-300 mt-4 text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="border border-gray-300 px-2.5 py-1.5">
                        Image
                      </th>
                      <th className="border border-gray-300 px-2.5 py-1.5">
                        Title
                      </th>
                      <th className="border border-gray-300 px-2.5 py-1.5">
                        Quantity
                      </th>
                      <th className="border border-gray-300 px-2.5 py-1.5">
                        Unit
                      </th>
                      <th className="border border-gray-300 px-2.5 py-1.5">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2.5 py-1.5">
                        <div className="w-14 h-12 overflow-hidden rounded-md">
                          <img
                            className="w-full h-full object-cover"
                            src={product?.image}
                            alt={product?.title}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2.5 py-1.5">
                        {product?.title}
                      </td>
                      <td className="border border-gray-300 px-2.5 py-1.5">
                        {data?.productSummery?.quantity}
                      </td>
                      <td className="border border-gray-300 px-2.5 py-1.5">
                        {product?.unit}
                      </td>
                      <td className="border border-gray-300 px-2.5 py-1.5">
                        ${data?.productSummery?.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

ReviewInfoModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  data: PropTypes.object,
};

export default ReviewInfoModal;
