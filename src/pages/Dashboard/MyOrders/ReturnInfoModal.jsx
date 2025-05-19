import imageUpload from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";

const ReturnInfoModal = ({ isOpen, setIsOpen, data, refetch }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [imageText, setImageText] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  //   console.log(data);

  const { mutateAsync: post_return_info } = useMutation({
    mutationFn: async (return_info) => {
      const { data } = await axiosSecure.patch(
        `/return-order-info/${return_info.orderID}?email=${user?.email}`,
        { returns: return_info }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("return item successfully");
      refetch();
    },
  });

  const handle_post_return_info = async (e) => {
    e.preventDefault();

    const formData = e.target;

    const reason = formData.reason.value;
    const description = formData.textarea.value;
    const file = formData.file.files[0];
    let image = "";

    if (file) {
      image = await imageUpload(file);
    } else {
      return toast.error("image required");
    }

    delete data.productSummery.image;

    const return_info = {
      requestID: `GBR-${Date.now()}`,
      orderID: data.orderID,
      productSummery: data.productSummery,
      reason,
      description,
      image,
      status: "Pending",
      // requestedOn: new Date().toISOString(),
    };
    console.log("ffff");

    await post_return_info(return_info);
    console.log(return_info);

    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <form onSubmit={handle_post_return_info}>
                <div className="flex items-center mb-3 gap-4 ">
                  <img
                    className="w-[75px] h-[75px] rounded-md"
                    src={
                      imagePreview ? imagePreview : data?.productSummery?.image
                    }
                    alt="imagePreview"
                    referrerPolicy="no-referrer"
                  />
                  <label htmlFor="file">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleImage(e.target.files[0])}
                    />
                    <div className="py-1.5 px-4 text-sm font-bold cursor-pointer bg-[#2E8DD8] shadow-md hover:shadow-lg hover:shadow-[rgba(46,141,216,.25)] text-white rounded active:scale-95 scale-100 transform duration-150 flex items-center gap-1">
                      <i className="text-lg font-semibold">
                        <MdOutlineFileUpload />
                      </i>
                      <h4>
                        {imageText.length > 10
                          ? imageText.split(".")[0].slice(0, 10) +
                            "..." +
                            imageText.split(".")[1]
                          : imageText && imageText > 0
                          ? imageText
                          : "Upload Image"}
                      </h4>
                    </div>
                  </label>
                </div>

                <select
                  name="reason"
                  defaultValue=""
                  className="w-full py-1.5 mb-3 rounded-md px-1.5"
                  required
                >
                  <option disabled value="">
                    Reason
                  </option>
                  <option value="Damaged">Damaged</option>
                  <option value=" Wrong Item"> Wrong Item</option>
                </select>
                <textarea
                  name="textarea"
                  id=""
                  placeholder="why return this product"
                  className="w-full rounded-md p-1.5"
                  required
                ></textarea>

                <div className="flex justify-center mt-4">
                  <Button
                    // onClick={close}
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

ReturnInfoModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  data: PropTypes.object,
  refetch: PropTypes.func,
};

export default ReturnInfoModal;
