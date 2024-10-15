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
      <div>
        <div className="flex items-center gap-5 mb-6">
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
      <div className="grid grid-cols-5 bg-white">
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
