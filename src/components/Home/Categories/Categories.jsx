import { useEffect, useState } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";

const Categories = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./categories.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  //   console.log(data);

  return (
    <section className="container mx-auto py-12">
      <div className="flex items-center gap-5 mb-6">
        <h4 className="text-2xl font-semibold text-[#202A35]">Featured Categories</h4>
        <Link to='/shop' className="text-[#2E8DD8] font-semibold">Shop all</Link>
      </div>
      <div className=" grid grid-cols-5 gap-y-5">
        {data.map((category, idx) => (
          <Category key={idx} idx={idx} category={category}></Category>
        ))}
      </div>
    </section>
  );
};

export default Categories;
