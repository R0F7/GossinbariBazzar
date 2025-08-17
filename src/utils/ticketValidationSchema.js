import * as Yup from "yup";

const ticketValidationSchema = Yup.object({
  subject: Yup.string()
    .trim()
    .required("Subject is required")
    .min(25, "Subject must be at least 25 characters")
    .max(60, "Subject can't exceed 60 characters"),

  category: Yup.string().required("Category is required"),
  priority: Yup.string().required("Priority is required"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters")
    .max(350, "Description can't exceed 350 characters"),
});

export default ticketValidationSchema;
