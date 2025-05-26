import imageUpload from "@/api/utils";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import validationSchema from "@/utils/productValiditionSchema";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateProductInfo = () => {
  const { id } = useParams();
  const { data } = useGetSecureData("single_product", `/product/${id}`);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [main_image_preview, setMain_image_preview] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    title = "",
    image = "",
    additionalImages = [],
    total_product = 0,
    brand_name = "",
    unit = "",
    cost_price = 0,
    price = 0,
    discounted_price = 0,
    discount_percent = 0,
    category = "",
    sub_category = "",
    description = "",
    short_description = "",
    tags = ["", "", ""],
    rating,
    vendor_info,
    sold_by,
    sold_product,
  } = data;

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setMain_image_preview(image);
    setPreviewImages(additionalImages);
  }, [image, additionalImages]);

  const { mutateAsync: update_product_info } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosSecure.put("/product", product_info);
      return data;
    },
    onSuccess: () => {
      toast.success("product update successfully");
    },
  });

  const initialValues = {
    title,
    main_image: image,
    additionalImages,
    total_product,
    brand_name,
    unit,
    cost_price,
    price,
    discounted_price,
    discount_percent,
    category,
    sub_category,
    description,
    short_description,
    tags,
  };

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

  const handleSubmit = async (values, { setSubmitting }) => {
    let mainImageUrl = values.main_image;

    if (typeof values.main_image === "object") {
      mainImageUrl = values.main_image
        ? await imageUpload(values.main_image)
        : null;
    }

    let uploadedImageUrls = values.additionalImages;

    if (
      Array.isArray(values.additionalImages) &&
      values.additionalImages.length &&
      typeof values.additionalImages[0] === "object"
    ) {
      uploadedImageUrls = await handleImageUpload(values.additionalImages);
    }

    // eslint-disable-next-line no-unused-vars
    const { main_image, ...restValues } = values;

    const product_info = {
      _id,
      ...restValues,
      image: mainImageUrl,
      additionalImages: uploadedImageUrls,
      sold_by,
      vendor_info,
      rating,
      sold_product,
    };

    console.table("Form Data:", product_info);

    try {
      await update_product_info(product_info);
      // toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Product update failed!");
      console.error(error.message);
    }

    setSubmitting(false);
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <section className="p-8">
      <Formik
        initialValues={initialValues || {}}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
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
                  <ErrorMessage
                    name="brand_name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Stock Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Pricing & Stock</h3>
              <div className="grid grid-cols-6 gap-4">
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
                  <ErrorMessage
                    name="unit"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* cost price */}
                <div>
                  <label className="block text-sm font-semibold">
                    Cost Price
                  </label>
                  <Field
                    type="number"
                    name="cost_price"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="cost_price"
                    component="p"
                    className="text-red-500 text-sm"
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
                        const percent =
                          ((value - discounted_price) / value) * 100;
                        setFieldValue(
                          "discount_percent",
                          Number(percent.toFixed(2))
                        );
                      } else {
                        setFieldValue("discount_percent", 0);
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-red-500 text-sm"
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

                      // if(Number(value) <1) return toast.error("minimum 1 %")

                      if (price > 0 && value > 0) {
                        const percent = ((price - value) / price) * 100;
                        setFieldValue(
                          "discount_percent",
                          Number(percent.toFixed(2))
                        );
                      } else {
                        setFieldValue("discount_percent", 0);
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="discounted_price"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Discounted percentage */}
                <div>
                  <label className="block text-sm font-semibold">
                    Discounted %
                  </label>
                  <Field
                    type="number"
                    name="discount_percent"
                    className="w-full p-2 border rounded outline-0"
                    readOnly
                  />
                </div>

                {/* Total Products */}
                <div>
                  <label className="block text-sm font-semibold">
                    Total Products
                  </label>
                  <Field
                    type="number"
                    name="total_product"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="total_product"
                    component="p"
                    className="text-red-500 text-sm"
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
                      setFieldValue("main_image", event.currentTarget.files[0]);
                      const previewImages = URL.createObjectURL(
                        event.currentTarget.files[0]
                      );

                      setMain_image_preview(previewImages);
                    }}
                  />
                  <ErrorMessage
                    name="main_image"
                    component="p"
                    className="text-red-500 text-sm"
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
                        event.target.value = null;
                        return;
                      }

                      setFieldValue("additionalImages", files);

                      const previewUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setPreviewImages(previewUrls);
                    }}
                  />
                  <ErrorMessage
                    name="additionalImages"
                    component="p"
                    className="text-red-500 text-sm"
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
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500 text-sm"
                  />
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
                  <ErrorMessage
                    name="sub_category"
                    component="p"
                    className="text-red-500 text-sm"
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
                <ErrorMessage
                  name="short_description"
                  component="p"
                  className="text-red-500 text-sm"
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
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
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
                  <ErrorMessage
                    name="tags[0]"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tag 2</label>
                  <Field
                    type="text"
                    name="tags[1]"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="tags[1]"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tag 3</label>
                  <Field
                    type="text"
                    name="tags[2]"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="tags[2]"
                    component="p"
                    className="text-red-500 text-sm"
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
    </section>
  );
};

export default UpdateProductInfo;
