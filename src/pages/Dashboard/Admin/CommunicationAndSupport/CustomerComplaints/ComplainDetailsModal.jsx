import { Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";

const ComplainDetailsModal = ({ isOpen, setIsOpen, data }) => {
  if (!data) return null;
  const {
    subject,
    category,
    description,
    attachment,
    complainant: { name, email, image } = {},
  } = data || {};

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
            <div>
              <div className="flex justify-between">
                <div>
                  <h4>subject: {subject}</h4>
                  <h6>category: {category}</h6>
                </div>

                {attachment && (
                  <div className="w-14 h-12">
                    <img
                      className="w-full h-full"
                      src={attachment}
                      alt="attachment"
                    />
                  </div>
                )} 
              </div>

              <p className="my-4">{description}</p>

              <div className="flex items-center gap-1.5">
                <div className="border w-10 h-10 rounded-full">
                  <img
                    className="rounded-full w-full h-full"
                    src={image}
                    alt=""
                  />
                </div>
                <div>
                  <h4>{name}</h4>
                  <p>{email}</p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

ComplainDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ComplainDetailsModal;
