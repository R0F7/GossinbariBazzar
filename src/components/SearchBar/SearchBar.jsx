import { IoSearch } from "react-icons/io5";
import PropTypes from "prop-types";

const SearchBar = ({
  setIsFocus,
  setSearchTerm,
  isFocus,
  placeholderText,
}) => {
  return (
    <div className="flex justify-between">
      <div className="relative">
        <input
          type="search"
          name="search"
          id="search"
          className="peer border border-[#0DAFD8] text-[#0DAFD8] font-medium outline-[#0DAFD8] shadow-sm w-[452px] pl-9 py-2.5 rounded-full"
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => {
            if (e.target.value === "") setIsFocus(false);
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-[#0DAFD8] pointer-events-none" />
        <span
          className={`absolute top-3 left-10 text-gray-600 text-xs transition-all duration-300 ${
            isFocus && "-mt-5 ml-[150px] bg-[#0DAFD8] text-white"
          } px-1.5 py-0.5 rounded-md pointer-events-none`}
        >
          {placeholderText}
        </span>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  setIsFocus: PropTypes.func,
  setSearchTerm: PropTypes.func,
  isFocus: PropTypes.bool,
  placeholderText: PropTypes.string,
};

export default SearchBar;
