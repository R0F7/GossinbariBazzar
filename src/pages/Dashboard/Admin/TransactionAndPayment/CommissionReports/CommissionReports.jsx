import Table from "@/components/Table/Table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecureData from "@/hooks/useGetSecureData";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const CommissionReports = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  const { data: vendors = [], } = useGetSecureData(
    "all_vendor_for_admin",
    "/users?role=seller"
  );
  //   console.log(vendors);

  useEffect(() => {
    const fetchAllVendorSales = async () => {
      if (!vendors.length) return;

      const result = await Promise.all(
        vendors.map(async (vendor) => {
          const vendor_orders = await axiosSecure.get(
            `/orders-receive/${vendor.email}`
          );
          const orders = vendor_orders.data;

          const totalProductPrice = orders.reduce((orderTotal, order) => {
            const productTotal =
              order.products?.reduce((sum, product) => {
                return sum + product.price * product.quantity;
              }, 0) || 0;

            return orderTotal + productTotal;
          }, 0);

          return {
            vendor_info: { name: vendor.name, email: vendor.email },
            totalSale: totalProductPrice,
          };
        })
      );

    //   console.log(result);
      setData(result);
    };

    fetchAllVendorSales();
  }, [axiosSecure, vendors]);

  //   console.log(vendorOrders);

  const columns = [
    columnHelper.accessor("vendor_info", {
      cell: (info) => <span>{info.getValue().name}</span>,
      header: "Vendor Name",
    }),

    columnHelper.accessor("totalSale", {
      id: "totalSale",
      cell: (info) => <span>${info.getValue()}</span>,
      header: "Total Sales",
    }),

    columnHelper.accessor("", {
      cell: () => <span>2%</span>,
      header: "Commission Rate (%)",
    }),

    columnHelper.accessor("totalSale", {
      id: "commission",
      cell: (info) => <span>${(info.getValue() * 0.02).toFixed(2)}</span>,
      header: "Commission Earned",
    }),
    // columnHelper.accessor("", {
    //   cell: (info) => <span>{info.getValue()}</span>,
    //   header: "",
    // }),
  ];

  return (
    <section className="px-8 py-5">
      <h1 className="font-semibold text-2xl mb-4">Commission Reports</h1>

      <Table columns={columns} data={data}></Table>
    </section>
  );
};

export default CommissionReports;