import { useEffect, useState } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";

const Categories = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./categories.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  //   console.log(data);

  return (
    <section className="container mx-auto py-12">
      <div className="flex items-center gap-5 mb-6">
        <h4 className="text-2xl font-semibold text-[#202A35]">
          Featured Categories
        </h4>
        <Link to="/shop" className="text-[#2E8DD8] font-semibold">
          Shop all
        </Link>
      </div>
      <div className=" grid grid-cols-5 gap-y-5">
        {data.map((category, idx) => (
          <Category key={idx} idx={idx} category={category}></Category>
        ))}
      </div>

      <div className="pt-12 grid grid-cols-4 gap-10">
        <div className="border h-[380px] bg-[url('https://i.ibb.co.com/sj2HNJD/fresh-fruits-2.jpg')] bg-cover relative shadow">
          <div className="g-[rgba(0,0,0,0.20)] w-full h-full bg-opacity-15 absolute inset-0">
            <div className="p-5">
              <h4 className="text-xl ext-white text-[#202A35] font-semibold">
                Fresh Fruit Sale
              </h4>
              <h2 className="text-2xl font-bold mb-4 ext-white">
                Up To <span className="text-red-600">30%</span>
              </h2>
              <p className="w-[70%] mb-28 text-[#202A35]">
                Save up to 30% on fresh, delicious fruits—shop now for
                limited-time deals!
              </p>
              <button className="h-9 w-24 rounded text-sm font-bold text-white bg-[#2E8DD8] shadow transform duration-150 active:scale-95 scale-100">
                Shop Now
              </button>
            </div>
            <div className="bg-[#FFB240] text-white h-16 w-16 absolute top-12 right-5 text-sm rounded-full flex items-center justify-center flex-col font-bold">
              <h4>On</h4>
              <p className="-mt-1">sale</p>
            </div>
          </div>
        </div>

        <div className="border h-[380px] bg-[url('https://i.ibb.co.com/HnfnKtc/best-vegetable.jpg')] bg-cover relative shadow">
          <div className="bg-[rgba(0,0,0,0.30)] w-full h-full bg-opacity-15 absolute inset-0">
            <div className="p-5">
              <h4 className="text-xl text-white ext-[#202A35] font-semibold">
                Best Selling
              </h4>
              <h2 className="text-2xl font-bold mb-4 text-white">Vegetables</h2>
              <p className="w-[70%] mb-28 ext-[#282829] text-white">
                Discover our best-selling vegetables—fresh, nutritious, and
                ready to enjoy!
              </p>
              <button className="h-9 w-24 rounded text-sm font-bold text-white bg-[#2E8DD8] shadow transform duration-150 active:scale-95 scale-100">
                Shop Now
              </button>
            </div>
            {/* <div></div> */}
          </div>
        </div>

        <div className="border h-[380px] bg-[url('https://i.ibb.co.com/cgRrnrr/Latest-Fashion.webp')] bg-cover bg-right relative shadow">
          <div className="bg-[rgba(0,0,0,0.30)] w-full h-full bg-opacity-15 absolute inset-0">
            <div className="p-5">
              <h4 className="text-xl text-white ext-[#202A35] font-semibold">
                Latest Fashion
              </h4>
              <h2 className="text-2xl font-bold mb-4 text-white">Clothing</h2>
              <p className="w-[75%] mb-28 ext-[#202A35] text-white">
                Shop the latest fashion trends with stylish, high-quality
                clothing for every occasion!
              </p>
              <button className="h-9 w-24 rounded text-sm font-bold text-white bg-[#2E8DD8] shadow transform duration-150 active:scale-95 scale-100">
                Shop Now
              </button>
            </div>
            {/* <div></div> */}
          </div>
        </div>

        <div className="border h-[380px] bg-[url('https://i.ibb.co.com/KGTxg8g/Meat-Poultry-Sale1.jpg')] bg-cover relative shadow">
          <div className="bg-[rgba(0,0,0,0.20)] w-full h-full bg-opacity-15 absolute inset-0">
            <div className="p-5">
              <h4 className="text-xl text-white ext-[#202A35] font-semibold">
                Meat & Poultry Sale
              </h4>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Up To <span className="text-red-600">50%</span>
              </h2>
              <p className="w-[80%] mb-28 ext-[#202A35] text-white">
                Get up to 50% off on premium meat and poultry—fresh,
                high-quality cuts at unbeatable prices
              </p>
              <button className="h-9 w-24 rounded text-sm font-bold text-white bg-[#2E8DD8] shadow transform duration-150 active:scale-95 scale-100">
                Shop Now
              </button>
            </div>
            {/* <div></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
