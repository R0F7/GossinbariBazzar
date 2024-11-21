import Slider from "react-slick";
// Import React Slick core and theme CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const CustomPaging = ({ images = [] }) => {
  const imageList = [
    { src: images[0], alt: "Abstract 1" },
    { src: images[1], alt: "Abstract 2" },
    { src: images[2], alt: "Abstract 3" },
    { src: images[3], alt: "Abstract 4" },
  ];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            className="custom-dot-img mt-10"
            src={imageList[i].src}
            alt={imageList[i].alt}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imageList.map((image, index) => (
          <div key={index}>
            <img className="w-[300px]" src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

CustomPaging.propTypes = {
  images: PropTypes.array,
};

export default CustomPaging;
