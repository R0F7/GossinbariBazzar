import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const ProductDetailsModal = ({ isOpenModal, setIsOpenModal, product }) => {
  if (!isOpenModal || !product) return null;

  const {
    title,
    image,
    additionalImages = [],
    brand_name,
    description,
    short_description,
    category,
    sub_category,
    price,
    discounted_price,
    cost_price,
    rating,
    total_product,
    unit,
    tags = [],
    sold_by,
    sold_product,
    vendor_info,
    timestamp,
  } = product;

  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString("en-GB")
    : "N/A";

  return (
    <Dialog
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      className="relative z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Centered panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-5xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={() => setIsOpenModal(false)}
              className="text-red-500 hover:text-red-700 text-lg font-bold"
            >
              ✖
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <img
                src={image}
                alt={title}
                className="w-full h-[250px] object-cover rounded"
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {additionalImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Alt-${idx}`}
                    className="h-[60px] w-full object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-2 text-sm">
              <p>
                <strong>Brand:</strong> {brand_name}
              </p>
              <p>
                <strong>Category:</strong> {category} / {sub_category}
              </p>
              <p>
                <strong>Unit:</strong> {unit}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                <span className={discounted_price > 0 ? "line-through" : ""}>
                  ${price}
                </span>{" "}
                {discounted_price > 0 && (
                  <span className="text-green-600 font-semibold">
                    ${discounted_price}
                  </span>
                )}
              </p>
              <p>
                <strong>Cost Price:</strong> ${cost_price}
              </p>
              <p>
                <strong>Stock Quantity:</strong> {total_product}
              </p>
              <p>
                <strong>Sold:</strong> {sold_product}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {rating}/5
              </p>
              <p>
                <strong>Vendor:</strong> {vendor_info?.name} (
                {vendor_info?.email})
              </p>
              <p>
                <strong>Sold By:</strong> {sold_by}
              </p>
              <p>
                <strong>Date Added:</strong> {formattedDate}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                <span className="text-gray-600">
                  {tags.map((tag, i) => (
                    <span key={i} className="mr-2">
                      #{tag}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-1">Short Description:</h3>
            <p className="text-sm text-gray-700">{short_description}</p>

            <h3 className="text-md font-semibold mt-4 mb-1">
              Full Description:
            </h3>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

ProductDetailsModal.propTypes = {
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  product: PropTypes.object,
};

export default ProductDetailsModal;
