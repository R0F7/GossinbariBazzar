import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import NextArrow from "../../Arrow/NextArrow";
import PrevArrow from "../../Arrow/PrevArrow";
import Card from "../../Card/Card";

const TopBestSelling = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["topBestSelling"],
    queryFn: async () => {
      return fetch("./flashSales.json").then((data) => data.json());
    },
  });
  console.log(products);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="container mx-auto pb-12">
      <div className="mb-6">
        <div className="flex items-center gap-5 mb-1.5">
          <h4 className="text-2xl font-semibold text-[#202A35]">
            Top Best Selling
          </h4>
          <Link to="/shop" className="text-[#2E8DD8] font-semibold">
            Shop all
          </Link>
        </div>
        <p className="text-[#637381]">
          Discover a selection of the most popular and highest-selling products
          across various categories.
        </p>
      </div>
      <div className="bg-white">
      <Slider {...settings}>
        {
            products.map((product)=> <Card key={product._id} item={product}></Card>)
        }
      </Slider>
      </div>
    </section>
  );
};

export default TopBestSelling;
