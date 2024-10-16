import { Link } from "react-router-dom";
import suppliers from "./suppliersData";

const Suppliers = () => {

  return (
    <section className="container mx-auto pt-12">
      <div className="flex items-center gap-5 mb-6">
        <h4 className="text-2xl font-semibold text-[#202A35]">
          Featured Suppliers
        </h4>
        <Link to="/shop" className="text-[#2E8DD8] font-semibold">
          Shop all
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10 bg-white p-6">
        <div className="border h-[400px] bg-[url('https://i.ibb.co.com/vXV1npm/Featured-Fresh.webp')] bg-cover relative shadow">
          <div className="bg-[rgba(0,0,0,0.20)] w-full h-full bg-opacity-15 absolute inset-0">
            <div className="p-5">
              <h4 className="text-xl text-white ext-[#202A35] font-semibold">
                Featured Fresh
              </h4>
              <h2 className="text-2xl font-bold mb-4 ext-green-600 ext-[#01AA55] text-white">
                {/* Up To <span className="text-red-600">30%</span> */}
                Vegetables
              </h2>
              <p className="w-[70%] mb-28 text-white ext-[#202A35]">
                Discover top-quality fresh vegetables from our featured
                suppliers—handpicked for their freshness and reliability!
              </p>
              <button className="h-9 w-24 rounded text-sm font-bold text-white bg-[#F29200] shadow transform duration-150 active:scale-95 scale-100">
                Shop Now
              </button>
            </div>
            <div className="bg-[#F29200] text-white h-20 w-20 absolute top-12 right-5 text-sm rounded-full flex items-center justify-center flex-col font-bold">
              <h4>Up to</h4>
              <p className="">45% Off</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-x-10 items-center">
          {suppliers.map((supplier,idx) => (
            <div key={idx} className="order h-[100px]">
              <img className="w-full h-full" src={supplier.supplierImage} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Suppliers;
