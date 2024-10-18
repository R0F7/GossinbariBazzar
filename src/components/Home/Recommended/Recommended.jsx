import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";

const Recommended = () => {
    const { data: recommended = [] } = useQuery({
        queryKey: ["flashSales"],
        queryFn: () => {
          return fetch("./flashSales.json").then((res) => res.json());
        },
      });
    
  return (
    <section className="container mx-auto pb-12">
      <div className="flex items-center gap-5 mb-6">
        <h4 className="text-2xl font-semibold text-[#202A35]">Recommended For You</h4>
        <Link to="/shop" className="text-[#2E8DD8] font-semibold">
          Shop all
        </Link>
      </div>
      <div className="grid grid-cols-5 bg-white">
        {
            recommended.map((item)=> <Card key={item._id} item={item}></Card>)
        }
      </div>
    </section>
  );
};

export default Recommended;
