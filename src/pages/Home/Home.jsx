import Categories from "../../components/Home/Categories/Categories";
import Suppliers from "../../components/Home/Suppliers/Suppliers";
import Slider from "../../components/Slider/Slider";

const Home = () => {
    return (
        <div className="">
            <Slider></Slider>
            <Categories></Categories>
            <div className="bg-[#F4F6F8]">
            <Suppliers></Suppliers>
            </div>
        </div>
    );
};

export default Home;