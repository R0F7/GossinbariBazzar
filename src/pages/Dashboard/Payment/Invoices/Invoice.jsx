import { useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";

const Invoice = () => {
  const { id } = useParams();
  const data = useGetData("invoice", `/order-details/${id}`);
  const products = data.products || [];

  return (
    <section className="bg-[#F9FAFF] min-h-screen">
      <div>
        <table className="w-[70%] text-left borde m-10">
          <thead className="border border-[#DDE9FB] border-collapse">
            <tr>
              <th className="py-2 pl-6 first:rounded-tl-md last:rounded-tr-md">#</th>
              <th className="">Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Vat %</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              (product, idx) => (
                <tr key={product._id} className="border border-[#DDE9FB]">
                  <td className="py-2 pl-6">{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>{product.unit}</td>
                  <td>0</td>
                  <td>${product.quantity * product.price}</td>
                </tr>
              )
              //   console.log(item)
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Invoice;
