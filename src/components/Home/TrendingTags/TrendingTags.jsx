import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const TrendingTags = () => {
  const { data = [] } = useQuery({
    queryKey: ["trendingTags"],
    queryFn: async () => {
      const data = await fetch("./trandingTags.json").then((res) => {
        return res.json();
      });
      return data;
    },
  });
  console.log(data);

  return (
    <section className="container mx-auto py-12">
      <div className="flex items-center gap-5 mb-6">
        <h4 className="text-2xl font-semibold text-[#202A35]">Trending Tags</h4>
        <Link to="/shop" className="text-[#2E8DD8] font-semibold">
          Shop all
        </Link>
      </div>
      <div className="grid grid-cols-7 gap-6 bg-white">
        {data.map((item, idx) => (
          <div key={idx} className="text-center p-4">
            <div className="h-36">
              <img
                className="w-full h-full"
                src={item?.image}
                alt={item.tag_name}
              />
            </div>
            <h4 className="mt-2 mb-1 text-[#212B36] font-semibold text-sm">#{item.tag_name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingTags;
