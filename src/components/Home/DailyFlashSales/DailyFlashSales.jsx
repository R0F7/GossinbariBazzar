import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import DailyFlashSale from "./DailyFlashSale";

const DailyFlashSales = () => {
  const { data: flashSales = [] } = useQuery({
    queryKey: ["flashSales"],
    queryFn: () => {
      return fetch("./flashSales.json").then((res) => res.json());
    },
  });
  //   console.log(data);

  return (
    <section className="container mx-auto py-12">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-5 mb-1.5">
            <h4 className="text-2xl font-semibold text-[#202A35]">
              Daily Flash Sales
            </h4>
            <Link to="/shop" className="text-[#2E8DD8] font-semibold">
              Shop all
            </Link>
          </div>
          <p className="text-[#637381]">
            Grab incredible deals every day with our Daily Flash
            Sales—limited-time offers across all products!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="text-l font-semibold text-[#212B36]">Ends in:</h4>
          <ul className="flex gap-2 text-red-700">
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>15</h6>
              <p>days</p>
            </li>
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>15</h6>
              <p>hours</p>
            </li>
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>15</h6>
              <p>mins</p>
            </li>
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>15</h6>
              <p>secs</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-5 mt-6 bg-white">
        {flashSales.map((flashSale) => (
          <DailyFlashSale
            key={flashSale._id}
            flashSale={flashSale}
          ></DailyFlashSale>
        ))}
      </div>
    </section>
  );
};

export default DailyFlashSales;
