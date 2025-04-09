import imageUpload from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewProducts = () => {
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [main_image_preview, setMain_image_preview] = useState(null);
  const { user } = useAuth();
  // console.log(user.displayName);

  // product input fields
  // title
  // image
  // additionalImages(4)
  // total_product
  // brand_name
  // unit
  // price
  // discounted_price
  // discount_percent
  // category
  // sub_category
  // description
  // short_description
  // tags * 3

  // sold_by
  // vendor_info {name,email}
  // sold_product
  // rating -
  // timestamp

  //   const validationSchema = {};

  const initialValues = {
    title: "",
    image: null,
    additionalImages: [],
    total_products: 0,
    brand_name: "",
    unit: "",
    price: 0,
    discounted_price: 0,
    discounted_percentage: 0,
    category: "",
    sub_category: "",
    description: "",
    short_description: "",
    tags: ["", "", ""],
  };

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Submit Function

  // handle 4 image file to link (promise)
  const handleImageUpload = async (files) => {
    const uploadImages = files.map((image) => imageUpload(image));

    try {
      const imageUrls = await Promise.all(uploadImages);
      return imageUrls;
    } catch (error) {
      console.error("Image upload failed:", error);
      return [];
    }
  };

  // async function handleImageUpload(files) {
  //   const uploadPromises = files.map((file) => imageUpload(file));

  //   try {
  //     const results = await Promise.allSettled(uploadPromises);
  //     const imageUrls = results
  //       .filter((result) => result.status === "fulfilled")
  //       .map((result) => result.value);

  //     console.log("Successfully uploaded images:", imageUrls);
  //     return imageUrls;
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //     return [];
  //   }
  // }

  const handleSubmit = async (values, { setSubmitting }) => {
    const mainImageUrl = values.image ? await imageUpload(values.image) : null;

    if (values.additionalImages.length !== 4) {
      toast.error("You must upload 4 additional images.");
      setSubmitting(false);
      return;
    }

    const uploadedImageUrls = await handleImageUpload(values.additionalImages);

    console.table("Form Data:", {
      ...values,
      sold_by: user?.displayName,
      vendor_info: { name: user?.displayName, email: user?.email },
      image: mainImageUrl,
      additionalImages: uploadedImageUrls,
      sold_product: 0,
      rating: 0,
      timestamp: new Date(),
    });

    setSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 my-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, setFieldValue, handleChange }) => (
          <Form className="space-y-6">
            {/* Basic Details Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold"
                  >
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Brand Name */}
                <div>
                  <label className="block text-sm font-semibold">
                    Brand Name
                  </label>
                  <Field
                    type="text"
                    name="brand_name"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Stock Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Pricing & Stock</h3>
              <div className="grid grid-cols-5 gap-4">
                {/* Unit */}
                <div>
                  <label className="block text-sm font-semibold">
                    Unit{" "}
                    <span className="text-xs">(e.g., 250gm, 1kg, etc.)</span>
                  </label>
                  <Field
                    type="text"
                    name="unit"
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold">Price</label>
                  <Field
                    type="number"
                    name="price"
                    onChange={(e) => {
                      handleChange(e);
                      const value = Number(e.target.value);
                      const discounted_price = values.discounted_price;

                      if (value > 0 && discounted_price > 0) {
                        const percent = ((value - discounted_price) / value) * 100;
                        setFieldValue(
                          "discounted_percentage",
                          Number(percent.toFixed(2))
                        );
                      } else {
                        setFieldValue("discounted_percentage", 0);
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Discounted Price */}
                <div>
                  <label className="block text-sm font-semibold">
                    Discounted Price
                  </label>
                  <Field
                    type="number"
                    name="discounted_price"
                    onChange={(e) => {
                      handleChange(e);
                      const value = Number(e.target.value);
                      const price = values.price;

                      if (price > 0 && value > 0) {
                        const percent = ((price - value) / price) * 100;
                        setFieldValue(
                          "discounted_percentage",
                          Number(percent.toFixed(2))
                        );
                      } else {
                        setFieldValue("discounted_percentage", 0);
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Discounted percentage */}
                <div>
                  <label className="block text-sm font-semibold">
                    Discounted %
                  </label>
                  <Field
                    type="number"
                    name="discounted_percentage"
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Total Products */}
                <div>
                  <label className="block text-sm font-semibold">
                    Total Products
                  </label>
                  <Field
                    type="number"
                    name="total_products"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Images & Category Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Images & Categories
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Main Image */}
                <div>
                  <label className="block text-sm font-semibold">
                    Main Image
                  </label>
                  <input
                    type="file"
                    name="main_image"
                    accept="image/*"
                    className="w-full p-2 border rounded"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                      const previewImages = URL.createObjectURL(
                        event.currentTarget.files[0]
                      );

                      setMain_image_preview(previewImages);
                    }}
                  />
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {main_image_preview && (
                      <img
                        src={main_image_preview}
                        alt="Main Preview"
                        className="w-full h-24 object-cover rounded"
                      />
                    )}
                  </div>
                </div>

                {/* Additional Images (Max 4) */}
                <div>
                  <label className="block text-sm font-semibold">
                    Additional Images (Max 4)
                  </label>
                  <input
                    type="file"
                    name="additionalImages"
                    multiple
                    accept="image/*"
                    className="w-full p-2 border rounded"
                    onChange={(event) => {
                      const files = Array.from(event.currentTarget.files);
                      if (files.length > 4) {
                        alert("You can only upload up to 4 images.");
                        event.target.value = null; // Clear selected files
                        return;
                      }

                      setFieldValue("additionalImages", files);

                      const previewUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setPreviewImages(previewUrls);
                    }}
                  />
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {previewImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`preview-${idx}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Category & Sub-category */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-sm font-semibold">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    defaultValue=""
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category, idx) => (
                      <option key={idx} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  {/* <label className="block text-sm font-semibold">
                    Sub-category
                  </label>
                  <Field
                    // as="select"
                    type="text"
                    name="sub_category"
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Sub-category</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="laptops">Laptops</option>
                  </Field> */}
                  <label
                    htmlFor="sub_category"
                    className="block text-sm font-semibold"
                  >
                    Sub Category
                  </label>
                  <Field
                    type="text"
                    name="sub_category"
                    id="sub_category"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Descriptions & Tags Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Descriptions & Tags
              </h3>
              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold">
                  Short Description
                </label>
                <Field
                  as="textarea"
                  name="short_description"
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Full Description */}
              <div className="mt-3">
                <label className="block text-sm font-semibold">
                  Full Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>

              {/* Tags */}
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <label className="block text-sm font-semibold">Tag 1</label>
                  <Field
                    type="text"
                    name="tags[0]"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tag 2</label>
                  <Field
                    type="text"
                    name="tags[1]"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tag 3</label>
                  <Field
                    type="text"
                    name="tags[2]"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewProducts;
