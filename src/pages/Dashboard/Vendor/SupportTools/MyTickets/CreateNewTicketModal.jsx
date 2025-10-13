import imageUpload from "@/utils";
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
import useAxiosCommon from "@/hooks/useAxiosCommon";
import ticketValidationSchema from "@/validationSchema/ticketValidationSchema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreateNewTicketModal = ({ isOpen, setIsOpen, refetch }) => {
  const { user } = useAuth();
  const [imgPrev, setImgPrev] = useState("");
  const axiosCommon = useAxiosCommon();
  const fileInputRef = useRef(null);

  const { mutateAsync: create_ticket } = useMutation({
    mutationFn: async (ticket_info) => {
      const { data } = await axiosCommon.post("/create-ticket", ticket_info);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Ticket created successfully");
    },
  });

  const initialValues = {
    subject: "",
    picture: null,
    category: "",
    priority: "",
    description: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const image = values.picture ? await imageUpload(values.picture) : null;

    const { picture, ...rest } = values;

    const info = {
      ...rest,
      image,
      ticketID: generateTicketID(),
      vendorInfo: {
        email: user.email,
        image: user.photoURL,
        name: user.displayName,
      },
      status: "Open",
      conversations: [],
    };

    try {
      await create_ticket(info);
      setIsOpen(false);
      setImgPrev("");

      resetForm();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const generateTicketID = () => {
    const tsMs = Date.now();
    return `TKT-${tsMs}`;
  };

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
            <Formik
              initialValues={initialValues}
              validationSchema={ticketValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
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
                <Form className="space-y-2">
                  <div className="w-full space-y-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                      className={
                        errors.subject && touched.subject
                          ? "border-red-500"
                          : ""
                      }
                    ></Input>
                    {errors.subject && touched.subject && (
                      <div className="text-sm text-red-500">
                        {errors.subject}
                      </div>
                    )}
                  </div>

                  <div className="w-full flex items-center gap-4">
                    <div className="w-full space-y-1.5">
                      <Label htmlFor="picture">
                        Picture <span className="text-xs">(optional)</span>
                      </Label>
                      <Input
                        id="picture"
                        type="file"
                        name="picture"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.currentTarget.files[0];
                          setFieldValue("picture", file);
                          setImgPrev(URL.createObjectURL(file));
                        }}
                        className={
                          errors.picture && touched.picture
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors.picture && touched.picture && (
                        <div className="text-sm text-red-500">
                          {errors.picture}
                        </div>
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

                  <div className="flex items-center gap-4">
                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={values.category}
                        onValueChange={(value) =>
                          setFieldValue("category", value)
                        }
                      >
                        <SelectTrigger
                          id="category"
                          className={`w-full ${
                            errors.category && touched.category
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="Product issue">
                              Product issue
                            </SelectItem>
                            <SelectItem value="Payment issue">
                              Payment issue
                            </SelectItem>
                            <SelectItem value="Order problem">
                              Order problem
                            </SelectItem>
                            <SelectItem value="Account problem">
                              Account problem
                            </SelectItem>
                            <SelectItem value="Technical issue">
                              Technical issue
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.category && touched.category && (
                        <div className="text-sm text-red-500">
                          {errors.category}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 w-full">
                      <Label htmlFor="priority">Priority</Label>

                      <Select
                        value={values.priority}
                        onValueChange={(value) =>
                          setFieldValue("priority", value)
                        }
                      >
                        <SelectTrigger
                          id="priority"
                          className={`w-full ${
                            errors.priority && touched.priority
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Levels</SelectLabel>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.priority && touched.priority && (
                        <div className="text-sm text-red-500">
                          {errors.priority}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      name="description"
                      id="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      placeholder="Type your description here."
                      className={`${
                        errors.category && touched.category
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.description && touched.description && (
                      <div className="text-sm text-red-500">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 scale-100 active:scale-95 transition duration-300 w-full"
                  >
                    {isSubmitting ? "Loading..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

CreateNewTicketModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  refetch: PropTypes.func,
};

export default CreateNewTicketModal;
