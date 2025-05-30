import useAuth from "@/hooks/useAuth";

const PriceRangeSlider = () => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useAuth();

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) setMaxPrice(value);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-gray-700 font-semibold mb-2.5">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>

      <div className="relative h-">
        {/* Slider Track */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1.5 bg-gray-300 rounded"></div>

        {/* Range track between min and max */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-1.5 bg-blue-500 rounded"
          style={{
            left: `${(minPrice / 2000) * 100}%`,
            width: `${((maxPrice - minPrice) / 2000) * 100}%`,
          }}
        ></div>

        {/* Min slider */}
        <input
          type="range"
          min="0"
          max="2000"
          value={minPrice}
          onChange={handleMinChange}
          className="range-thumb pointer-events-auto absolute w-full z-30 bg-transparent appearance-none"
        />

        {/* Max slider */}
        <input
          type="range"
          min="0"
          max="2000"
          value={maxPrice}
          onChange={handleMaxChange}
          className="range-thumb pointer-events-auto absolute w-full z-40 bg-transparent appearance-none"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
