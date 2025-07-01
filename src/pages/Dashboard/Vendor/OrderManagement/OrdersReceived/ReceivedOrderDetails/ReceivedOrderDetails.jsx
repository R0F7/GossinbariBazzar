import { useState } from "react";
import PropTypes from "prop-types";

const ReceivedOrderDetails = ({ products }) => {
  const [open, setOpen] = useState(false);
  // console.log(products);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        View
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md max-w-md w-full space-y-3 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-2">Ordered Products</h2>
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-3 border-b py-2"
              >
                <img
                  src={product.image}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <h1 className="font-semibold">{product.name}</h1>
                  <ul className="flex gap-4 list-disc space-x-2.5 text-sm font-semibold text-[rgb(101,113,129)] mt-0.5">
                    <li> Qty: {product.quantity}</li>
                    <li> Unit: {product.unit}</li>
                    <li>Price: ${product.price}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

ReceivedOrderDetails.propTypes = {
    products: PropTypes.array,
};

export default ReceivedOrderDetails;
