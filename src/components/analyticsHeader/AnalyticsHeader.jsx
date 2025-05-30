import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";
import PriceRangeSlider from "../PriceRange/PriceRange";

const AnalyticsHeader = ({
  title,
  range,
  setRange,
  // groupBy,
  // setGroupBy,
  categories,
  setCategory,
  category,
  restQuery,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formattedRange = `${format(range[0].startDate, "MMM d")} - ${format(
    range[0].endDate,
    "MMM d"
  )}`;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#1C1B20]">{title}</h2>

        <div className="flex gap- items-center relative">
          <div className="">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="border px-3 h-9 rounded-l-md shadow-sm text-sm"
            >
              📅 {formattedRange}
            </button>
            {showCalendar && (
              <div className="absolute z-50 right-0 top-12">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setRange([item.selection])}
                  moveRangeOnFirstSelection={true}
                  ranges={range}
                />
              </div>
            )}
          </div>

          {/* <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-[120px] border-l-0 rounded-l-none focus:ring-0">
              <SelectValue placeholder="Group By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select> */}

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[120px] border-l-0 rounded-l-none focus:ring-0">
              <SelectValue
                placeholder="category"
                className="placeholder:font-semibold"
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, idx) => (
                <SelectItem key={idx} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-4 -mt-3 w-[180px]">
            <PriceRangeSlider></PriceRangeSlider>
          </div>

          <button
            onClick={() => {
              restQuery(), setShowCalendar(false);
            }}
            className="g-blue-500 hover:g-blue-600text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-1.5 shadow-md transition-all duration-300 ease-in-out transform active:scale-95 ml-2.5"
          >
            Rest
          </button>
        </div>
      </div>
    </section>
  );
};

AnalyticsHeader.propTypes = {
  title: PropTypes.string,
  range: PropTypes.array,
  setRange: PropTypes.func,
  categories: PropTypes.array,
  category: PropTypes.string,
  setCategory: PropTypes.func,
  restQuery: PropTypes.func,
};

export default AnalyticsHeader;
