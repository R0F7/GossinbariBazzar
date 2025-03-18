import { useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import Logo from "../../../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png";
import useAuth from "../../../../hooks/useAuth";
import { IoCallSharp } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { RiPrinterFill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const { id } = useParams();
  const data = useGetData("invoice", `/order-details/${id}`);
  const { user_info_DB } = useAuth();
  const invoiceRef = useRef();
  const products = data.products || [];
  const {
    contactInfo,
    createdAt,
    delivery,
    orderID,
    order_owner_info,
    paymentInfo,
    shippingDetails,
    total_price,
    total_quantity,
  } = data;
  //   console.log(data);

  const handleDownloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imageData, "PNG", 15, 15);
      pdf.save("invoice.pdf");
    });
  };

  const handlePrint = () => {};

  return (
    <section className="bg-[#F9FAFF] min-h-screen relative">
      <div ref={invoiceRef} className="p-10 w-[90%] mx-auto">
        <div className="flex items-center gap-1">
          <img className="w-12 rop-shadow-2xl" src={Logo} alt="" />
          <h4 className="text-logo-font-family text-[#006400] text-lg">
            Gossainbari<span className="text-[#4B0082]">Bazzar</span>
          </h4>
        </div>

        {/* details info */}
        <div className="my-10 flex justify-between">
          {/* customer info*/}
          <div>
            <h1 className="uppercase text-[#2C8C81] font-semibold text-sm">
              {/* {user_info_DB?.role} */}
              customer info
            </h1>
            <h2 className="text-[#1B1C20] text-2xl font-bold mb-1">
              {order_owner_info?.name}
            </h2>
            <div className="text-[#57565B] text-sm font-semibold">
              <p>P. {user_info_DB?.number}</p>
              <p>E. {order_owner_info?.email}</p>
              <p>A. {user_info_DB?.address}</p>
            </div>
          </div>

          {/* Recipient info */}
          <div>
            <h1 className="uppercase text-[#2C8C81] font-semibold text-sm">
              Recipient info
            </h1>
            <h2 className="text-[#1B1C20] text-2xl font-bold mb-1">
              {contactInfo?.name}
            </h2>
            <div className="text-[#57565B] text-sm font-semibold">
              <p>
                <span className="">P.</span> {contactInfo?.phone_number}
              </p>
              <p>
                <span className="">E.</span> {contactInfo?.email}
              </p>
              <p>
                <span className="">A.</span> {shippingDetails?.village},{" "}
                {shippingDetails?.union} <br />{" "}
                {/* {shippingDetails?.locationDetails} */}
              </p>
            </div>
          </div>

          {/* order info */}
          <div>
            <h1 className="uppercase text-[#2C8C81] font-semibold text-sm mb-2">
              order info
            </h1>
            <div className="text-[#57565B] text-sm font-semibold space-y-0.5">
              <p className="flex gap-2.5">
                <span className="w-[110px] flex justify-between">
                  Order ID <span>:</span>{" "}
                </span>
                {orderID}
              </p>
              <p className="flex gap-2.5">
                <span className="w-[110px] flex justify-between">
                  createdAt <span>:</span>{" "}
                </span>
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <p className="flex gap-2.5">
                <span className="w-[110px] flex justify-between capitalize">
                  total quantity <span>:</span>{" "}
                </span>
                {total_quantity}
              </p>
              <p className="flex gap-2.5">
                <span className="w-[110px] flex justify-between">
                  Delivery <span>:</span>{" "}
                </span>
                {delivery?.category}
              </p>
            </div>
          </div>

          {/* paymentInfo */}
          <div>
            <h1 className="uppercase text-[#2C8C81] font-semibold text-sm mb-2">
              payment Info
            </h1>
            <div className="text-[#57565B] text-sm font-semibold space-y-0.5">
              <p className="flex gap-2">
                <span className="w-[120px] flex justify-between">
                  Payment Method <span>:</span>{" "}
                </span>
                {paymentInfo?.paymentMethod}
              </p>
              <p className="flex gap-2">
                <span className="w-[120px] flex justify-between">
                  Payment Status <span>:</span>{" "}
                </span>
                {paymentInfo?.paymentStatus}
              </p>
              <p className="flex gap-2">
                <span className="w-[120px] flex justify-between">
                  Due <span>:</span>{" "}
                </span>
                $0.00
              </p>
              <p className="flex gap-2">
                <span className="w-[120px] flex justify-between">
                  transaction ID <span>:</span>{" "}
                </span>
                {paymentInfo?.transactionId}
              </p>
            </div>
          </div>
        </div>

        <table className="w-full text-left text-[#667487] rounded-md overflow-hidden">
          <thead className="bg-[#333842] text-[#E2E5ED] t-head relative z-50">
            <tr>
              <th className="py-2 pl-6">SL</th>
              <th className="">Product</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>RATE</th>
              {/* <th>Vat %</th> */}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              (product, idx) => (
                <tr key={product._id}>
                  <td className="py-2 pl-6 border-2 border-[#DDE9FB] border-l-0">
                    {idx + 1}
                  </td>
                  <td className="border-2 border-[#DDE9FB] pl-2.5">
                    {product.name}
                  </td>
                  <td className="border-2 border-[#DDE9FB] pl-2.5">
                    {product.unit}
                  </td>
                  <td className="border-2 border-[#DDE9FB] pl-2.5">
                    {product.quantity}
                  </td>
                  <td className="border-2 border-[#DDE9FB] pl-2.5">
                    ${product.price}
                  </td>
                  {/* <td className="border-2 border-[#DDE9FB] pl-2.5">0</td> */}
                  <td className="border-2 border-[#DDE9FB] border-r-0 pl-2.5">
                    ${product.quantity * product.price}
                  </td>
                </tr>
              )
              //   console.log(item)
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <span className="flex items-center gap-4 font-bold text-[#D6E5FC]">
            <h4 className="bg-[#016AAD] w-[150px] py-2.5 text-center">
              Grand Total
            </h4>
            <h4 className="bg-[#0095D3] w-[150px] py-2.5 text-center">
              ${total_price}
            </h4>
          </span>
        </div>

        {/* thankyou message */}
        <div className="text-center w-[500px] space-y-2 mt-6">
          <h1 className="font-bold text-lg text-[#333842]">
            🌿 Thank You for Shopping with Us! 🌿
          </h1>
          <p className="text-[#636267]">
            Your trust means everything! We're dedicated to bringing the best to
            rural life with care and commitment. See you again soon! 🚜💚
          </p>
          <div className="flex gap-2 justify-center">
            <a
              href="http://gossainbari.com"
              target="_blank"
              className="underline hover:font-bold hover:text-blue-700 hover:decoration-wavy font-semibold text-blue-600"
            >
              GossainbariBazzar
            </a>
            <a
              href="https://wa.me/8801612500106?text=Hello%2C%20I%20need%20help!"
              className="underline hover:font-bold hover:text-blue-700 hover:decoration-wavy font-semibold text-blue-600"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* contact info */}
        <div className="flex items-center justify-evenly mt-20">
          <div className="flex items-center gap-3">
            <IoCallSharp className="border w-10 h-10 rounded-full p-2.5 bg-[#0095D3] text-[#E2E5ED]" />
            <div className="flex flex-col font-semibold text-[#333842]">
              <span>+8801612500106</span>
              <span>(33) 555 333 777</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GrContact className="border w-10 h-10 rounded-full p-2.5 bg-[#333842] text-[#E2E5ED]" />
            <div className="flex flex-col font-semibold text-[#333842]">
              <span>gossainbari@bazzar.com</span>
              <span>wwwrafikhan075@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationDot className="border w-10 h-10 rounded-full p-2.5 bg-[#016AAD] text-[#E2E5ED]" />
            <div className="flex flex-col font-semibold text-[#333842]">
              <span>Gossainbari, Dhunat</span>
              <span>Bogura, BD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10">
        <div
          title="Download PDF"
          onClick={handleDownloadPDF}
          className="w-12 h-12 rounded-full pl-1 border flex items-center justify-center text-lg bg-[#333842] text-[#E2E5ED] hover:bg-transparent hover:border-[#333842] hover:text-[#333842] shadow scale-100 active:scale-90 transition duration-300"
        >
          <FaFilePdf />
        </div>
        <RiPrinterFill
          title="Print Invoice"
          onClick={handlePrint}
          className="w-12 h-12 rounded-full p-3 border border-[#333842] text-[#333842] hover:bg-[#333842] hover:text-[#E2E5ED] shadow scale-100 active:scale-90 transition duration-300 mt-3.5"
        />
      </div>
    </section>
  );
};

export default Invoice;
