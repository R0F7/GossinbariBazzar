import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const ViewDetails = ({ isOpenModal, setIsOpenModal, product }) => {
  if (!isOpenModal || !product) return null;

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
        <DialogPanel className="w-full max-w-5xl rounded-xl bg-white p-6 shadow-xl ax-h-[90vh] overflow-y-auto">
          <Card key={product._id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">
                    Submitted by: <strong>{product.vendor_info.name}</strong>
                  </p>
                </div>
                <div className="space-x-2">
                  <Badge>{product.category}</Badge>
                  <Badge variant="outline">{product.sub_category}</Badge>
                </div>
              </div>
              <p>{product.description}</p>
              <div className="flex space-x-4">
                {product.additionalImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span>
                  <strong>Price:</strong> $
                  {product?.discount_price || product.price}
                </span>
                <span>
                  <strong>Discount:</strong> {product.discount_percent}%
                </span>
                <div className="flex gap-2">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* <Textarea placeholder="Add admin note or feedback (optional)..." /> */}

              {/* TODO: active */}
              {/* <div className="flex gap-3 justify-end">
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Reject
                </Button>
                <Button variant="outline">Request Edits</Button>
                <Button className="bg-blue-500 hover:bg-blue-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                  Approve
                </Button>
              </div> */}
            </CardContent>
          </Card>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

ViewDetails.propTypes = {
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  product: PropTypes.object,
};

export default ViewDetails;
