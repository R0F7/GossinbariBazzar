import imageUpload from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useGetData from "@/hooks/useGetData";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import validationSchema from "@/validationSchema/productValidationSchema";

const SliderCustomize = () => {
  const [productID, setProductID] = useState("");
  const [imgPrev, setImgPrev] = useState("");

  const product = useGetData("product for slider", `/product/${productID}`);

  const handleSearchProductID = (e) => {
    e.preventDefault();
    const id = e.target.pro_id.value.trim();
    setProductID(id);
  };

  //   author title topic description image

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const topic = form.topic.value;
    const imageFile = form.picture.files[0];
    const description = form.description.value;
    let image = null;

    try {
      if (imageFile) {
        image = await imageUpload(imageFile);
      }
    } catch (error) {
      console.log(error);
    }

    const productDetails = {
      title,
      topic,
      image,
      description,
    };

    console.table(productDetails);
  };

  //   const validationSchema = {};
  const initialValues = {
    author: "",
    title: "",
    topic: "",
    description: "",
    image: null,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-3">#Banner</h2>
      <div className="flex gap-6">
        {/* made slider by input field */}
        <div className="w-1/2">
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            Made Slider manually
          </h4>

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
              <Form className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="w-full space-y-1.5 col-span-2">
                    <Label htmlFor="title">Title</Label>
                    {/* <Input type="text" id="title" placeholder="Title" /> */}
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      className={
                        errors.title && touched.title ? "border-red-500" : ""
                      }
                    ></Input>
                    {errors.title && touched.title && (
                      <div className="text-sm text-red-500">{errors.title}</div>
                    )}
                  </div>

                  <div className="grid w-full ax-w-sm items-center gap-3 ">
                    <Label htmlFor="topic">Topic</Label>
                    <Input type="text" id="topic" placeholder="Topic" />
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  <div className="grid w-full ax-w-sm items-center gap-3 col-span-4">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const previewUrl = URL.createObjectURL(file);
                          setImgPrev(previewUrl);
                        }
                      }}
                    />
                  </div>
                  <div className="h-[65px] border rounded-md">
                    {imgPrev ? (
                      <img
                        className="h-full w-full rounded-md"
                        src={imgPrev}
                        alt=""
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-blue-600">
                        <FaRegImage size={40} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid w-full ax-w-sm gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    placeholder="Type description here."
                    id="description"
                    className="h-[110px]"
                  />
                </div>

                <Button className="btn">Submit</Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* made slider by product id */}
        <div className="w-1/2">
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            Made Slider by Product ID
          </h4>

          <form
            onSubmit={handleSearchProductID}
            className="flex items-end gap-2"
          >
            <div className="grid w-full ax-w-sm items-center gap-3">
              <Label htmlFor="pro_id">Product ID</Label>
              <Input type="text" id="pro_id" placeholder="Enter Product ID" />
            </div>
            <Button type="submit" className="btn">
              Search
            </Button>
            <Button type="reset" className="" variant="outline">
              Reset
            </Button>
          </form>

          {Object.keys(product).length > 0 && (
            <div>
              <div className="flex ap-2.5 mt-4 border shadow rounded-md">
                <div className="w-[270px] h-[130px] border-r rounded-l-md">
                  <img
                    className="w-full h-full rounded-l-md"
                    src={product?.image}
                    alt=""
                  />
                </div>
                <div className="px-2 pt-2">
                  <h4 className="font-medium text-gray-800 mb-1">
                    {product?.title}
                  </h4>
                  <p className="text-sm font-thin text-gray-800">
                    {product?.short_description}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button type="button" className="btn">
                  Select
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-lg">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Product Info */}
        <div className="absolute bottom-6 left-6 text-white max-w-md">
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>

          <p className="text-sm text-gray-200 mb-2">
            Brand: <span className="font-medium">{product.brand_name}</span>
          </p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-yellow-400">
              ${product.discounted_price}
            </span>
            <span className="line-through text-gray-300">${product.price}</span>
            <span className="text-green-400 text-sm">
              ({product.discount_percent}% OFF)
            </span>
          </div>

          <p className="text-gray-100 text-sm mb-4">
            {product.short_description}
          </p>

          <div className="flex gap-3">
            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition">
              Add to Cart
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded border border-white/40 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCustomize;
