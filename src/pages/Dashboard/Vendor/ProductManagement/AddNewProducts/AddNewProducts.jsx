import imageUpload from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import validationSchema from "@/utils/productValiditionSchema";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

const AddNewProducts = () => {
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [main_image_preview, setMain_image_preview] = useState(null);
  const { user, user_info_DB } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

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

  const { mutateAsync: submit_product_in_DB } = useMutation({
    mutationFn: async (product_info) => {
      const { data } = await axiosSecure.put("/product", product_info);
      return data;
    },
    onSuccess: () => {
      toast.success("product added successfully");
    },
  });

  const initialValues = {
    title: "",
    main_image: "",
    additionalImages: [],
    total_product: 0,
    brand_name: "",
    unit: "",
    cost_price: 0,
    price: 0,
    discounted_price: 0,
    discount_percent: 0,
    category: "",
    sub_category: "",
    description: "",
    short_description: "",
    tags: ["", "", ""],
  };

  // const validationSchema = Yup.object({
  //   title: Yup.string()
  //     .trim()
  //     .required("Title is required")
  //     .matches(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers & spaces allowed."),

  //   main_image: Yup.mixed()
  //     .required("Main image is required")
  //     .test("fileExists", "Main image is required", (value) => {
  //       return value && value instanceof File;
  //     }),

  //   additionalImages: Yup.mixed()
  //     .required("Additional images are required")
  //     .test("fileCount", "Exactly 4 images are required", (value) => {
  //       return value && value.length === 4;
  //     })
  //     .test("allAreFiles", "All must be valid image files", (value) => {
  //       return (
  //         value &&
  //         Array.from(value).every(
  //           (file) => file instanceof File && file.type.startsWith("image/")
  //         )
  //       );
  //     }),

  //   total_product: Yup.number()
  //     .required("Total Product is required")
  //     .positive("Value must be positive")
  //     .integer("Value must be an integer"),

  //   brand_name: Yup.string()
  //     .trim()
  //     .required("Brand Name is required")
  //     .matches(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers & spaces allowed."),

  //   unit: Yup.string()
  //     .trim()
  //     .required("Unit is required")
  //     .matches(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers & spaces allowed."),

  //   price: Yup.number()
  //     .required("Price is required")
  //     .positive("Value must be positive")
  //     .integer("Value must be an integer"),

  //   discounted_price: Yup.number().nullable().min(0, "Value must be 0 or more"),
  //   // .positive("Value must be positive"),

  //   category: Yup.string()
  //     .required("Category is required")
  //     .notOneOf([""], "Please select a valid category"),

  //   sub_category: Yup.string()
  //     .trim()
  //     .required("Sub Category is required")
  //     .matches(/^[a-zA-Z0-9- ]+$/, "Only letters, numbers & spaces allowed."),

  //   description: Yup.string()
  //     .trim()
  //     .required("Description is required")
  //     .min(450, "Description must be at least 450 characters")
  //     .max(1000, "Description can't exceed 1000 characters"),
  //   // .matches(
  //   //   /^[a-zA-Z0-9 _-]+$/,
  //   //   "Only letters, numbers, space, _ and - allowed."
  //   // ),

  //   short_description: Yup.string()
  //     .trim()
  //     .required("Short Description is required")
  //     .min(100, "Short Description must be at least 100 characters")
  //     .max(220, "Short Description can't exceed 220 characters"),
  //   // .matches(
  //   //   /^[a-zA-Z0-9 _-]+$/,
  //   //   "Only letters, numbers, space, _ and - allowed."
  //   // ),

  //   tags: Yup.array()
  //     .required("Tags are required")
  //     .length(3, "Exactly 3 tags are required")
  //     .of(
  //       Yup.string()
  //         .trim()
  //         .min(2, "Tag must be at least 2 characters")
  //         .max(20, "Tag must be at most 20 characters")
  //         .matches(
  //           /^[a-zA-Z0-9_-]+$/,
  //           "Only letters, numbers, _ and - allowed."
  //         )
  //         .required("Tag cannot be empty")
  //     ),
  // });

  const handleSubmit = async (values, { setSubmitting }) => {
    const mainImageUrl = values.main_image
      ? await imageUpload(values.main_image)
      : null;

    if (values.additionalImages.length !== 4) {
      toast.error("You must upload 4 additional images.");
      setSubmitting(false);
      return;
    }

    const uploadedImageUrls = await handleImageUpload(values.additionalImages);

    delete values.main_image;

    const product_info = {
      ...values,
      // sold_by: user?.displayName,
      sold_by: user_info_DB?.vendor_info?.vendor_name,
      vendor_info: { name: user?.displayName, email: user?.email },
      image: mainImageUrl,
      additionalImages: uploadedImageUrls,
      sold_product: 0,
      rating: 0,
      status: "Pending"
      // timestamp: new Date(),
    };

    // console.table("Form Data:", product_info);

    try {
      await submit_product_in_DB(product_info);
      navigate("/dashboard/product-management/manage-inventory");
    } catch (error) {
      console.log(error.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 my-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <Formik
        initialValues={initialValues}
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
                    {/* <span className="text-xs">(e.g., 250gm, 1kg, etc.)</span> */}
                  </label>
                  <Field
                    type="text"
                    name="unit"
                    placeholder="250gm, 1kg, etc."
                    className="w-full p-2 border rounded placeholder:text-xs"
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
                        const finalDiscount = Math.min(percent, 99.99);
                        setFieldValue(
                          "discount_percent",
                          Number(finalDiscount.toFixed(2))
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
                        const finalDiscount = Math.min(percent, 99.99);
                        setFieldValue(
                          "discount_percent",
                          Number(finalDiscount.toFixed(2))
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
    </div>
  );
};

export default AddNewProducts;
