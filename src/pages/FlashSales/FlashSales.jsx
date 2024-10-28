import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Card from "../../components/Card/Card";

const FlashSales = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["flashSales"],
    queryFn: () => fetch("./flashSales.json").then((res) => res.json()),
  });
  console.log(products);

  return (
    <section className="container mx-auto ">
      <div className="flex gap-2 mt-3">
        <h4>Home</h4>
        <span>/</span>
        <h4>Page</h4>
      </div>
      <div className="flex items-end justify-between my-4">
        <div>
          <h1 className="font-bold text-2xl mb-2">Shop Flash Sales</h1>
          <p className="text-gray-500">
            Daily updates of all special deals. Bookmark this page & come back
            often.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="text-l font-semibold text-[#212B36]">Ends in:</h4>
          <ul className="flex gap-2 text-red-700">
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>{time?.days}</h6>
              <p>days</p>
            </li>
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>{time?.hours}</h6>
              <p>hours</p>
            </li>
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>{time?.minutes}</h6>
              <p>mins</p>
            </li>
            <li className="text-center px-3 py-1.5 border border-red-700 rounded-xl">
              <h6>{time?.seconds}</h6>
              <p>secs</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {products.map((product) => (
          <Card key={product._id} item={product}></Card>
        ))}
      </div>
    </section>
  );
};

export default FlashSales;
