import Slider from "react-slick";
import NextArrow from "../../components/Arrow/NextArrow";
import PrevArrow from "../../components/Arrow/PrevArrow";

const data = [
    { name: 'kamal', age: 55 },
    { name: 'kamall', age: 55 },
    { name: 'kamalll', age: 55 },
    { name: 'kamallll', age: 55 },
    { name: 'kamallll', age: 55 },
    { name: 'kamalll', age: 55 },
  ];
  
  // Function to split the data into chunks of 3
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one slide at a time (since each slide contains 3 items vertically)
    slidesToScroll: 1, // Scroll one slide at a time
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  
  const SliderComponent = () => {
    // Split the data into chunks of 3 items
    const chunkedData = chunkArray(data, 3);
  
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {chunkedData.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col w-36 h-full space-y-4">
              {group.map((item, idx) => (
                <div key={idx} className="w-full h-36 bg-black text-white flex flex-col justify-center items-center">
                  <h4>{item.name}</h4>
                  <p>{item.age}</p>
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default SliderComponent;
  