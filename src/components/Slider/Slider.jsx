// import Groceries from "../../assets/slider/Groceries.jpg";
// import Clothing from "../../assets/slider/Clothing & Apparel.webp";
// import juwelier from "../../assets/slider/juwelier producy.jpg";
// import Furniture from "../../assets/slider/Furniture & Home Decor.jpg";
// import "../Slider/Slider.css";
// import { useEffect } from "react";
// import sliderUtilityFunction from "./sliderUtilityFunction";

// const Slider = () => {
//   useEffect(() => {
//     sliderUtilityFunction();
//   }, []);

//   return (
//     <>
//       <div className="carousel">
//         {/* list item */}
//         <div className="list">
//           <div className="item">
//             <img src={Groceries} alt="" />
//             <div className="content">
//               <div className="author">ROF7</div>
//               <div className="title">DESIGN SLIDER</div>
//               <div className="topic">Product</div>
//               <div className="description">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Repellendus quibusdam a molestiae veniam similique maiores,
//                 mollitia cupiditate placeat earum eum?
//               </div>
//               <div className="button">
//                 <button>SEE MORE</button>
//                 <button>SUBCRIBE</button>
//               </div>
//             </div>
//           </div>

//           <div className="item">
//             <img src={Clothing} alt="" />
//             <div className="content">
//               <div className="author">ROF7</div>
//               <div className="title">DESIGN SLIDER</div>
//               <div className="topic">Product</div>
//               <div className="description">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Repellendus quibusdam a molestiae veniam similique maiores,
//                 mollitia cupiditate placeat earum eum?
//               </div>
//               <div className="button">
//                 <button>SEE MORE</button>
//                 <button>SUBCRIBE</button>
//               </div>
//             </div>
//           </div>

//           <div className="item">
//             <img src={juwelier} alt="" />
//             <div className="content">
//               <div className="author">ROF7</div>
//               <div className="title">DESIGN SLIDER</div>
//               <div className="topic">Product</div>
//               <div className="description">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Repellendus quibusdam a molestiae veniam similique maiores,
//                 mollitia cupiditate placeat earum eum?
//               </div>
//               <div className="button">
//                 <button>SEE MORE</button>
//                 <button>SUBCRIBE</button>
//               </div>
//             </div>
//           </div>

//           <div className="item">
//             <img src={Furniture} alt="" />
//             <div className="content">
//               <div className="author">ROF7</div>
//               <div className="title">DESIGN SLIDER</div>
//               <div className="topic">Product</div>
//               <div className="description">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Repellendus quibusdam a molestiae veniam similique maiores,
//                 mollitia cupiditate placeat earum eum?
//               </div>
//               <div className="button">
//                 <button>SEE MORE</button>
//                 <button>SUBCRIBE</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* thumbnail */}
//         <div className="thumbnail">
//           <div className="item">
//             <img src={Groceries} alt="" />
//             <div className="content">
//               <div className="title">Name Slider</div>
//               <div className="des">Description</div>
//             </div>
//           </div>

//           <div className="item">
//             <img src={Clothing} alt="" />
//             <div className="content">
//               <div className="title">Name Slider</div>
//               <div className="des">Description</div>
//             </div>
//           </div>

//           <div className="item">
//             <img src={juwelier} alt="" />
//             <div className="content">
//               <div className="title">Name Slider</div>
//               <div className="des">Description</div>
//             </div>
//           </div>

//           <div className="item">
//             <img src={Furniture} alt="" />
//             <div className="content">
//               <div className="title">Name Slider</div>
//               <div className="des">Description</div>
//             </div>
//           </div>
//         </div>
//         {/* arrows */}
//         <div className="arrows">
//           <button id="next">&lt;</button> {/* < symbol */}
//           <button id="prev">&gt;</button> {/* > symbol */}
//         </div>
//         <div className="time"></div>
//       </div>
//     </>
//   );
// };

// export default Slider;

import { useEffect } from "react";
import "../Slider/Slider.css";
import useGetSecureData from "@/hooks/useGetSecureData";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Slider = () => {
  const { cartAddedProducts, addProductInCard, user } = useAuth();
  const { data: products, isLoading } = useGetSecureData(
    "product for slider",
    "/products"
  );

  useEffect(() => {
    if (!products || products.length === 0) return;

    const nextDom = document.getElementById("next");
    const prevDom = document.getElementById("prev");
    const carouselDom = document.querySelector(".carousel");
    const listItemDom = document.querySelector(".carousel .list");
    const thumbnailDom = document.querySelector(".carousel .thumbnail");

    if (!nextDom || !prevDom || !carouselDom || !listItemDom || !thumbnailDom)
      return;

    const timeRunning = 3000;
    const timeAutoNext = 7000;
    let runTimeOut;
    let runAutoRun;

    const showSlider = (type) => {
      const itemSlider = document.querySelectorAll(".carousel .list .item");
      const itemThumbnail = document.querySelectorAll(
        ".carousel .thumbnail .item"
      );

      if (itemSlider.length === 0 || itemThumbnail.length === 0) return;

      if (type === "next") {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add("next");
      } else {
        const positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runAutoRun);
      runAutoRun = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    };

    nextDom.onclick = () => showSlider("next");
    prevDom.onclick = () => showSlider("prev");

    runAutoRun = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runAutoRun);
    };
  }, [products]);

  const updateQuantity = (product) => (product ? product.quantity + 1 : 1);
  const handleAddToCard = async (item) => {
    const find_product = cartAddedProducts.find(
      (product) => product.id === item._id
    );
    const quantity = updateQuantity(find_product);
    // console.log(find_product);

    const product_info = {
      id: item._id,
      order_owner_info: {
        name: user?.displayName,
        email: user?.email,
      },
      vendor_info: item.vendor_info,
      quantity,
    };

    try {
      await addProductInCard(product_info);
    } catch (error) {
      console.error("Failed to add product to the cart:", error);
    }
  };

  return (
    <div className="carousel w-full h-[calc(100vh-175px)] overflow-hidden relative">
      {isLoading ? (
        <div className="w-full h-full animate-pulse bg-black bg-opacity-25 relative">
          <div className="thumbnail absolute bottom-[50px] left-1/2 w-max z-50 flex gap-5">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="item w-[150px] h-[220px] shrink-0 relative border rounded-[20px] shadow-md"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* list item */}
          <div className="list">
            {products.map((product) => (
              <div key={product._id} className="item absolute inset-0">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent overlay"></div>

                {/* Product Info */}
                <div className="content absolute top-[20%] left-1/2 w-[1300px] max-w-[80%] -translate-x-1/2 r-[30%] box-border text-white ">
                  <h2 className="text-3xl font-semibold mb-2 title">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-200 mb-2 topic">
                    Brand:{" "}
                    <span className="font-medium">{product.brand_name}</span>
                  </p>

                  <div className="flex items-center gap-2 mb-3 pricing">
                    <span className="text-3xl font-bold text-yellow-400">
                      $
                      {product.discounted_price
                        ? product.discounted_price
                        : product.price}
                    </span>
                    {product.discounted_price > 0 && (
                      <>
                        <span className="line-through text-gray-300 text-lg">
                          ${product.price}
                        </span>
                        <span className="text-green-400 text-sm">
                          ({product.discount_percent}% OFF)
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-100 text-sm mb-4 w-[40%] description">
                    {product.short_description}
                  </p>

                  <div className="flex gap-3 button">
                    <button
                      onClick={() => handleAddToCard(product)}
                      className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition scale-100 active:scale-95 duration-300"
                    >
                      Add to Cart
                    </button>
                    <Link to={`/product/${product._id}`}>
                      <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded border border-white/40 transition scale-100 active:scale-95 duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* thumbnail */}
          <div className="thumbnail absolute bottom-[50px] left-1/2 w-max z-50 flex gap-5">
            {[...products.slice(1), products[0]].map((product) => (
              <div
                key={product._id}
                className="item w-[150px] h-[220px] shrink-0 relative overflow-hidden group"
              >
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover rounded-[20px]"
                />
                <div className="content absolute bottom-0 pl-2.5 pb-2.5 pt-1.5 rounded-[20px] water-glass-bg max-h-[61px] group-hover:max-h-full overflow-hidden transition-all duration-300">
                  <div className="title font-bold text-white">
                    {product.title}
                  </div>
                  <div className="brand_name text-sky-200">
                    {product.brand_name}
                  </div>
                  <div className="description text-gray-900 text-sm font-">
                    {product.short_description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* arrows */}
          <div className="arrows absolute top-[80%] right-[52%] w-[300px] flex gap-2.5 items-center">
            <button id="next">&lt;</button>
            <button id="prev">&gt;</button>
          </div>
          <div className="time"></div>
        </>
      )}
    </div>
  );
};

export default Slider;
