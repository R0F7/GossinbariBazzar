import { useState } from "react";

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default sorting");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    "Sort by popularity",
    "Sort by average rating",
    "Sort by latest",
    "Sort by price: low to high",
    "Sort by price: high to low",
  ];

  return (
    <div className="relative inline-block">
      <button
        className="outline-none text-[#333] px-2 py-1 border border-gray-300 rounded"
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 border border-gray-300 bg-white rounded shadow-md z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-red-500"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
