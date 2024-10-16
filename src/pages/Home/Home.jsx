import Categories from "../../components/Home/Categories/Categories";
import DailyFlashSales from "../../components/Home/DailyFlashSales/DailyFlashSales";
import Suppliers from "../../components/Home/Suppliers/Suppliers";
import TrendingTags from "../../components/Home/TrendingTags/TrendingTags";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  return (
    <div className="">
      <Slider></Slider>
      <Categories></Categories>
      <div className="bg-[#F4F6F8]">
        <DailyFlashSales></DailyFlashSales>
        <Suppliers></Suppliers>
        <TrendingTags></TrendingTags>
      </div>
    </div>
  );
};

export default Home;
