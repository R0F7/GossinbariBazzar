import Card from "@/components/Card/Card";
import useGetSecureData from "@/hooks/useGetSecureData";
import EmptyState from "@/pages/EmptyState/EmptyState";
import { useNavigate, useParams } from "react-router-dom";

const ViewVendorProducts = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const { data: vendor_products } = useGetSecureData(
    "vendor_product_for_admin",
    `/vendor-products/${email}`
  );

  if (vendor_products.length < 1) {
    return <EmptyState restQuery={() => navigate(-1)}></EmptyState>;
  }

  return (
    <section className="grid grid-cols-4 gap-4 p-4">
      {vendor_products.map((product) => (
        <Card key={product._id} item={product}></Card>
      ))}
    </section>
  );
};

export default ViewVendorProducts;
