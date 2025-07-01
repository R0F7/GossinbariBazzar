import { Dialog, DialogPanel } from "@headlessui/react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useState } from "react";
import imageUpload from "@/api/utils";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const UpdateCategoryModal = ({
  isOpenModal,
  setIsOpenModal,
  data,
  refetch,
}) => {
  const [iconPreview, setIconPreview] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleIconPreview = (e) => {
    const file = e.target.files[0];
    if (file) setIconPreview(URL.createObjectURL(file));
  };

  const handleImgPreview = (e) => {
    const file = e.target.files[0];
    if (file) setImgPreview(URL.createObjectURL(file));
  };

  const handleFormInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const categoryName = form.category_name.value;
    const iconFile = form.category_icon.files[0];
    const imageFile = form.category_img.files[0];

    const icon_link = iconFile ? await imageUpload(iconFile) : data.icon;
    const categoryImage_link = imageFile
      ? await imageUpload(imageFile)
      : data.categoryImage;

    const category_info = {
      id: data._id,
      categoryName,
      icon: icon_link,
      categoryImage: categoryImage_link,
    };

    // console.log(category_info);

    try {
      const res = await axiosSecure.patch("/category", category_info);
      if (res.data.acknowledged) {
        toast.success("Category updated successfully");
        setIsOpenModal(false);
        refetch();
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
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
            <form onSubmit={handleFormInfo}>
              <label htmlFor="vendor_name">
                <h4 className="text-sm font-medium">Category Name:</h4>
                <input
                  type="text"
                  name="category_name"
                  id=""
                  placeholder="Category Name"
                  className="border rounded w-full my-1.5 px-2 py-1.5 shadow-sm placeholder:text-sm outline-blue-500"
                  defaultValue={data.categoryName}
                />
              </label>

              <label htmlFor="category_icon">
                <h4 className="text-sm font-medium mb-2">Category Icon:</h4>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={iconPreview || data.icon}
                    alt=""
                    className="w-[70px] h-[50px]"
                  />
                  <input
                    type="file"
                    name="category_icon"
                    onChange={handleIconPreview}
                  />
                </div>
              </label>

              <label htmlFor="number">
                <h4 className="text-sm font-medium mb-2">Category Img:</h4>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={imgPreview || data.categoryImage}
                    alt=""
                    className="w-[70px] h-[50px]"
                  />
                  <input
                    type="file"
                    name="category_img"
                    onChange={handleImgPreview}
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold border border-blue-500 rounded-md px-6 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-2"
              >
                {isLoading ? "loading..." : "Submit"}
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

UpdateCategoryModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object,
  refetch: PropTypes.func,
};

export default UpdateCategoryModal;
