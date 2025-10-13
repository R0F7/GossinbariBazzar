import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(25, "Title must be at least 25 characters")
    .max(60, "Title can't exceed 60 characters"),

  category: Yup.string().required("Category is required"),

  picture: Yup.mixed().required("Picture is required"),
  
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(300, "Description must be at least 300 characters")
    .max(550, "Description can't exceed 550 characters"),

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
