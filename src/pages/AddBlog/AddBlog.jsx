import imageUpload from "@/api/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import blogCategories from "@/share/blogCategories";
import validationSchema from "@/utils/blogValiditionSchema";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [imgPrev, setImgPrev] = useState("");
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutateAsync: post_blog } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/blog-post", { info });
      return data;
    },
    onSuccess: () => {
      toast.success("Blog posted successfully");
      navigate("/blogs");
    },
  });

  const initialValues = {
    title: "",
    category: "",
    picture: null,
    description: "",
    tags: ["", "", ""],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const mainImageUrl = values.picture
      ? await imageUpload(values.picture)
      : null;

    delete values.picture;

    const info = {
      ...values,
      posted_by: {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
      },
      image: mainImageUrl,
      status: role === "admin" ? "Published" : "Pending",
    };
    // console.log(info);

    try {
      await post_blog(info);
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
    resetForm();
  };

  if (isLoading) return "Loading...";

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form className="max-w-xl mx-auto space-y-4 mt-14">
            <div className="flex justify-between gap-4">
              {/* title */}
              <div className="w-full space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.title && touched.title ? "border-red-500" : ""
                  }
                />
                {errors.title && touched.title && (
                  <div className="text-sm text-red-500">{errors.title}</div>
                )}
              </div>

              {/* category */}
              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => setFieldValue("category", value)}
                  value={values.category}
                >
                  <SelectTrigger
                    className={`w-[180px] ${
                      errors.category && touched.category
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {Object.entries(blogCategories).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.category && touched.category && (
                  <div className="text-sm text-red-500">{errors.category}</div>
                )}
              </div>
            </div>

            {/* picture */}
            <div className="w-full flex justify-between items-center">
              <div className="w-[400px] space-y-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("picture", file);
                    setImgPrev(URL.createObjectURL(file));
                  }}
                  className={
                    errors.picture && touched.picture ? "border-red-500" : ""
                  }
                />
                {errors.picture && touched.picture && (
                  <div className="text-sm text-red-500">{errors.picture}</div>
                )}
              </div>
              {imgPrev && (
                <div className="w-[100px] h-[60px] rounded-md border p-1 shadow relative top-2.5">
                  <img
                    className="w-full h-full rounded"
                    src={imgPrev}
                    alt="preview"
                  />
                </div>
              )}
            </div>

            {/* description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Type your message here."
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.description && touched.description
                    ? "border-red-500"
                    : ""
                }
              />
              {errors.description && touched.description && (
                <div className="text-sm text-red-500">{errors.description}</div>
              )}
            </div>

            {/* tags */}
            <div className="flex gap-4">
              {[0, 1, 2].map((index) => (
                <div className="space-y-1.5" key={index}>
                  <Label htmlFor={`tags.${index}`}>Tag</Label>
                  <Input
                    id={`tags.${index}`}
                    name={`tags.${index}`}
                    placeholder={`Tag ${index + 1}`}
                    value={values.tags?.[index] || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.tags?.[index] && touched.tags?.[index]
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {errors.tags?.[index] && touched.tags?.[index] && (
                    <div className="text-sm text-red-500">
                      {errors.tags[index]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 w-full scale-100 active:scale-95 transition duration-300"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddBlog;
