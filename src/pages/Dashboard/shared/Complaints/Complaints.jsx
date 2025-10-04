import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import imageUpload from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useGetSecureData from "@/hooks/useGetSecureData";

const Complaints = () => {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: complaints = [], refetch } = useGetSecureData(
    "complaints",
    `/complaints/${user.email}`
  );

  const handleMouseLeave = (e) => {
    // Radix select portal ignore
    if (e.relatedTarget?.closest("[data-radix-select-content]")) {
      return;
    }
    setToggle(false);
  };

  const { mutateAsync: handleComplainPost } = useMutation({
    mutationKey: ["complain"],
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("complain", info);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Complain submitted successfully");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const subject = form.subject.value;
    const description = form.description.value;
    const imageFile = form.picture.files[0];
    let attachment = null;

    if (!subject) {
      setLoading(false);
      return toast.error("subject is required");
    } else if (!category) {
      setLoading(false);
      return toast.error("category is required");
    } else if (!description) {
      setLoading(false);
      return toast.error("description is required");
    }

    try {
      if (imageFile) attachment = await imageUpload(imageFile);
    } catch (error) {
      console.log(error);
    }

    const info = {
      subject,
      category,
      attachment,
      description,
      status: "Pending",
      complaintId: `CMP-${Date.now()}`,
      complainant: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      await handleComplainPost(info);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    form.reset();
    setCategory("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-700 p-10 w-[80%] h-[600px] rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">My Complaints</h1>

        <div className="flex h-[80%] border overflow-hidden relative">
          {/* cards */}
          {complaints ? (
            <div className="w-[80%] grid grid-cols-2 gap-4 pr-11 p-2.5 overflow-y-scroll">
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow -[132px]"
                >
                  <h2 className="font-semibold text-green-800">
                    {complaint.subject}
                  </h2>
                  <p className="text-green-700 mt-1">
                    {complaint.description.length < 120
                      ? complaint.description
                      : complaint.description.slice(0, 120) + "..."}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-[74%] bg-white bg-opacity-75 m-2.5 rounded-md flex items-center justify-center font-semibold">
              <p>No complain available</p>
            </div>
          )}

          {/* form */}
          <div
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={handleMouseLeave}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white g-opacity-85 h-full absolute right-0 transform duration-1000 rounded-l-md p-4"
              style={{ width: `${toggle ? "38%" : "24%"}` }}
            >
              <div className="space-y-3">
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                  />
                </div>

                <div className={`grid ${toggle && "grid-cols-5"} gap-4`}>
                  <div
                    className={`grid w-full items-center gap-3 ${
                      toggle ? "col-span-3" : "col-span-5"
                    }`}
                  >
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" name="picture" type="file" />
                  </div>

                  <div
                    className={`grid w-full items-center gap-3 ${
                      toggle ? "col-span-2" : "col-span-5"
                    }`}
                  >
                    <Label htmlFor="category">Category</Label>
                    <Select
                      id="category"
                      value={category}
                      onValueChange={(val) => setCategory(val)}
                      className="border border-red-700"
                    >
                      <SelectTrigger className="w-full text-sm">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Order Issue">
                            Order Issue
                          </SelectItem>
                          <SelectItem value="Payment">Payment</SelectItem>
                          <SelectItem value="Delivery">Delivery</SelectItem>
                          <SelectItem value="Product Quality">
                            Product Quality
                          </SelectItem>
                          <SelectItem value="Vendor Behavior">
                            Vendor Behavior
                          </SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Type your message here."
                    className={`${toggle && "h-[140px]"}`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 scale-100 active:scale-95 transition duration-300 disabled:cursor-not-allowed"
                >
                  {loading ? "loading..." : "Submit Complaint"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
