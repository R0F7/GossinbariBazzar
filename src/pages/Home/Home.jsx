import Banner from "../../components/Home/Banner/Banner";
import Categories from "../../components/Home/Categories/Categories";
import DailyFlashSales from "../../components/Home/DailyFlashSales/DailyFlashSales";
import Recommended from "../../components/Home/Recommended/Recommended";
import Suppliers from "../../components/Home/Suppliers/Suppliers";
import TopBestSelling from "../../components/Home/topBestSelling/topBestSelling";
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
        <TopBestSelling></TopBestSelling>
        <Banner></Banner>
        <Recommended></Recommended>
      </div>
    </div>
  );
};

export default Home;
