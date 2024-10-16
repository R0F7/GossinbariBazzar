import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import DailyFlashSale from "./DailyFlashSale";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight, FaShippingFast } from "react-icons/fa";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
// import { RiCheckDoubleLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { RiCheckDoubleLine } from "react-icons/ri";

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="bg-[#FFFFFF] h-14 w-14 absolute top-1/2 -right-20 transform -translate-y-1/2 rounded-full text-[#212B36] flex items-center justify-center shadow-md text-xl hover:bg-[#2E8DD8] hover:text-white transition duration-500"
      onClick={onClick}
    >
      <FaAngleRight />
    </div>
  );
};

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="bg-[#FFFFFF] h-14 w-14 absolute top-1/2 -left-20 transform -translate-y-1/2 rounded-full text-[#212B36] flex items-center justify-center shadow-md text-xl hover:bg-[#2E8DD8] hover:text-white transition duration-500 "
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

const DailyFlashSales = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { data: flashSales = [] } = useQuery({
    queryKey: ["flashSales"],
    queryFn: () => {
      return fetch("./flashSales.json").then((res) => res.json());
    },
  });
  //   console.log(data);

  // console.log('rerender check');

  useEffect(() => {
    const countdownDate = new Date("Dec 31, 2024 23:59:59").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeDifference = countdownDate - now;

      if (timeDifference < 0) {
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTime((prevState) => {
        if (
          prevState.days !== days ||
          prevState.hours !== hours ||
          prevState.minutes !== minutes ||
          prevState.seconds !== seconds
        ) {
          return { days, hours, minutes, seconds };
        }
        return prevState;
      });
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="container mx-auto pt-12">
      <div className="flex justify-between mb-6">
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
      <div className="bg-white">
        <Slider {...settings}>
          {/* <div className="grid grid-cols-5 mt-6 bg-white"> */}
          {flashSales.map((flashSale) => (
            <DailyFlashSale
              key={flashSale._id}
              flashSale={flashSale}
            ></DailyFlashSale>
          ))}
          {/* </div> */}
        </Slider>
        <div className="grid grid-cols-3 py-6">
          <div className="flex items-center gap-1.5 justify-center text-[#212B36] font-semibold">
            <i className="text-[#2E8DD8]"><MdVerified /></i>
            <h4>Organic Certificated</h4>
          </div>
          <div className="flex items-center gap-1.5 justify-center text-[#212B36] font-semibold border-x ">
            <i className="text-[#2E8DD8]"><FaShippingFast /></i>
            <h4>Fast & Free Delivery</h4>
          </div>
          <div className="flex items-center gap-1.5 justify-center text-[#212B36] font-semibold">
            <i className="text-[#2E8DD8]"><VscWorkspaceTrusted /></i>
            <h4>Trusted Products</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyFlashSales;
