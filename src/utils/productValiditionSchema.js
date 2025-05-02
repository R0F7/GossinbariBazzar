import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  // .matches(/^[a-zA-Z0-9 () - ]+$/, "Only letters, numbers & spaces allowed."),

  main_image: Yup.mixed().test(
    "fileExists",
    "Main image is required",
    (value) => {
      if (!value) return false;
      if (typeof value === "string") return true;
      if (value instanceof File) return true;
      return false;
    }
  ),

  additionalImages: Yup.mixed()
    .required("Additional images are required")
    .test("fileCount", "Exactly 4 images are required", (value) => {
      return value && value.length === 4;
    })
    .test("allAreValid", "All must be valid image files or URLs", (value) => {
      return (
        value &&
        Array.from(value).every(
          (item) =>
            (item instanceof File && item.type.startsWith("image/")) ||
            (typeof item === "string" && item.startsWith("http"))
        )
      );
    }),

  total_product: Yup.number()
    .required("Total Product is required")
    .positive("Value must be positive")
    .integer("Value must be an integer"),

  brand_name: Yup.string()
    .trim()
    .required("Brand Name is required")
    .matches(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers & spaces allowed."),

  unit: Yup.string()
    .trim()
    .required("Unit is required")
    .matches(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers & spaces allowed."),

  price: Yup.number()
    .required("Price is required")
    .positive("Value must be positive"),

  discounted_price: Yup.number().nullable().min(0, "Value must be 0 or more"),
  // .positive("Value must be positive"),

  category: Yup.string()
    .required("Category is required")
    .notOneOf([""], "Please select a valid category"),

  sub_category: Yup.string()
    .trim()
    .required("Sub Category is required")
    .matches(/^[a-zA-Z0-9- ]+$/, "Only letters, numbers & spaces allowed."),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(450, "Description must be at least 450 characters")
    .max(1000, "Description can't exceed 1000 characters"),
  // .matches(
  //   /^[a-zA-Z0-9 _-]+$/,
  //   "Only letters, numbers, space, _ and - allowed."
  // ),

  short_description: Yup.string()
    .trim()
    .required("Short Description is required")
    .min(100, "Short Description must be at least 100 characters")
    .max(220, "Short Description can't exceed 220 characters"),
  // .matches(
  //   /^[a-zA-Z0-9 _-]+$/,
  //   "Only letters, numbers, space, _ and - allowed."
  // ),

  tags: Yup.array()
    .required("Tags are required")
    .length(3, "Exactly 3 tags are required")
    .of(
      Yup.string()
        .trim()
        .min(2, "Tag must be at least 2 characters")
        .max(20, "Tag must be at most 20 characters")
        .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - allowed.")
        .required("Tag cannot be empty")
    ),
});

export default validationSchema;
