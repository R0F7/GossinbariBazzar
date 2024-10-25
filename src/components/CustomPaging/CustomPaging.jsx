// import React, { Component } from "react";
// import Slider from "react-slick";
// import { baseUrl } from "./config";

// const CustomPaging = () => {
//   const settings = {
//     customPaging: function (i) {
//       return (
//         <a>
//           <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
//         </a>
//       );
//     },
//     dots: true,
//     dotsClass: "slick-dots slick-thumb",
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         <div>
//           <img src={baseUrl + "/abstract01.jpg"} />
//         </div>
//         <div>
//           <img src={baseUrl + "/abstract02.jpg"} />
//         </div>
//         <div>
//           <img src={baseUrl + "/abstract03.jpg"} />
//         </div>
//         <div>
//           <img src={baseUrl + "/abstract04.jpg"} />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// export default CustomPaging;

// import React from "react";
// import Slider from "react-slick";
// // Import React Slick core and theme CSS
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


// // Dynamic array of image paths or URLs
// const imageList = [
//   { src: "https://i.ibb.co.com/dcSM3yF/Fresh-Red-Apples.png", alt: "Abstract 1" },
//   { src: "https://i.ibb.co.com/LZLcY9T/Professional-Soccer-Ball.webp", alt: "Abstract 2" },
//   { src: "https://i.ibb.co.com/dcSM3yF/Fresh-Red-Apples.png", alt: "Abstract 3" },
//   { src: "https://i.ibb.co.com/LZLcY9T/Professional-Soccer-Ball.webp", alt: "Abstract 4" },
// ];

// const CustomPaging = () => {
//   const settings = {
//     customPaging: function (i) {
//       return (
//         <div className="w-10 flex gap-9">
//           <img className="border" src={imageList[i].src} alt={imageList[i].alt} />
//         </div>
//       );
//     },
//     dots: true,
//     dotsClass: "slick-dots slick-thumb",
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         {imageList.map((image, index) => (
//           <div key={index}>
//             <img className="w-[300px]" src={image.src} alt={image.alt} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default CustomPaging;

import Slider from "react-slick";
// Import React Slick core and theme CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import "./CustomPaging.css"; 

// Dynamic array of image paths or URLs
const imageList = [
  { src: "https://i.ibb.co/dcSM3yF/Fresh-Red-Apples.png", alt: "Abstract 1" },
  { src: "https://i.ibb.co/LZLcY9T/Professional-Soccer-Ball.webp", alt: "Abstract 2" },
  { src: "https://i.ibb.co/dcSM3yF/Fresh-Red-Apples.png", alt: "Abstract 3" },
  { src: "https://i.ibb.co/LZLcY9T/Professional-Soccer-Ball.webp", alt: "Abstract 4" },
];

const CustomPaging = () => {
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
            <img
              className="w-[300px]"
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomPaging;


