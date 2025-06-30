import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import ViewDetails from "./ViewDetails/ViewDetails";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApproveNewProducts = () => {
  const columnHelper = createColumnHelper();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [product, setProduct] = useState({});
  const axiosSecure = useAxiosSecure();

  const { data: pendingProducts, refetch } = useGetSecureData(
    "pending-products",
    "/products?status=Pending"
  );
  //   console.log(pendingProducts);

  const { mutateAsync: handleApprove } = useMutation({
    mutationFn: async ({ _id, status }) => {
      //   console.log(_id, status);
      const { data } = await axiosSecure.put(`/product`, { _id, status });
      return data;
    },
    onSuccess: (_, variables) => {
      refetch();
      Swal.fire({
        title: `${variables.status} Successfully`,
        icon: "success",
        draggable: true,
        timer: 2000,
      });
    },
  });

  const columns = [
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          className="w-[80px] h-[50px] rounded-md"
          src={info.getValue()}
          alt=""
        />
      ),
      header: "",
    }),

    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Product Name",
    }),

    columnHelper.accessor("unit", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Unit",
    }),

    columnHelper.accessor("price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Price",
    }),

    columnHelper.accessor("discounted_price", {
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Discount Price",
    }),

    // columnHelper.accessor("_id", {
    //   id: "price",
    //   cell: (info) => {
    //     const row = info.row.original;

    //     return <span>${row?.discounted_price || row?.price}</span>;
    //   },
    //   header: "Price",
    // }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("sub_category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Subcategory",
    }),

    columnHelper.accessor("vendor_info.name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Submitted by",
    }),

    columnHelper.accessor("_id", {
      id: "Details",
      cell: (info) => {
        const row = info.row.original;

        const find_product = pendingProducts.find((p) => p._id === row._id);

        return (
          <Button
            onClick={() => {
              setProduct(find_product), setIsOpenModal(true);
            }}
            className="bg-white text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Details
          </Button>
        );
      },
      header: "",
    }),

    columnHelper.accessor("_id", {
      id: "Approve",
      cell: (info) => {
        const row = info.row.original;

        return (
          //   <Button
          //     onClick={() => handleApprove({ _id: row._id, status: "approve" })}
          //     className="bg-blue-500 hover:bg-blue-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          //   >
          //     Approve
          //   </Button>

          <Select
            value={row.status}
            onValueChange={(val) =>
              handleApprove({ _id: row._id, status: val })
            }
          >
            <SelectTrigger className="w-[110px] ">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approve">Approve</SelectItem>
                <SelectItem value="Request Edit">Request Edit</SelectItem>
                <SelectItem value="Reject">
                  <span className="text-red-500 font-semibold">Reject</span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
      header: "",
    }),

    // columnHelper.accessor("_id", {
    //   id: "Reject",
    //   cell: (info) => (
    //     <Button className="bg-red-500 hover:bg-blue-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
    //       Reject
    //     </Button>
    //   ),
    //   header: "",
    // }),
  ];

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        🧾 Approve New Vendor Products
      </h1>

      <Table columns={columns} data={pendingProducts}></Table>

      {/* view product details modal */}
      <ViewDetails
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        product={product}
      ></ViewDetails>
    </section>
  );
};

export default ApproveNewProducts;

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import useGetSecureData from "@/hooks/useGetSecureData";

// export default function ApproveVendorProducts() {
//   const { data: pendingProducts=[] } = useGetSecureData(
//     "pending-products",
//     "/products?status=pending"
//   );
//     console.log(pendingProducts);

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-semibold">🧾 Approve New Vendor Products</h2>
//       <p className="text-muted-foreground">
//         Pending Products List submitted by vendors waiting for admin approval.
//       </p>

//       {pendingProducts.map((product) => (
//         <Card key={product.id}>
//           <CardContent className="p-6 space-y-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-semibold">{product.title}</h3>
//                 <p className="text-sm text-gray-500">
//                   Submitted by: <strong>{product.vendor_info.name}</strong>
//                 </p>
//               </div>
//               <div className="space-x-2">
//                 <Badge>{product.category}</Badge>
//                 <Badge variant="outline">{product.sub_category}</Badge>
//               </div>
//             </div>

//             <p>{product.description}</p>

//             <div className="flex space-x-4">
//               {product.additionalImages.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt="Product"
//                   className="w-24 h-24 object-cover rounded-lg border"
//                 />
//               ))}
//             </div>

//             <div className="flex flex-wrap items-center gap-4 text-sm">
//               <span>
//                 <strong>Price:</strong> ৳{product.price}
//               </span>
//               <span>
//                 <strong>Discount:</strong> {product.discounted_price}%
//               </span>
//               <div className="flex gap-2">
//                 {product.tags.map((tag, idx) => (
//                   <Badge key={idx} variant="secondary">
//                     #{tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <Textarea placeholder="Add admin note or feedback (optional)..." />

//             <div className="flex gap-3 justify-end">
//               <Button variant="destructive">Reject</Button>
//               <Button variant="outline">Request Edits</Button>
//               <Button>Approve</Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
