import Groceries from "../../assets/slider/Groceries.jpg";
import Clothing from "../../assets/slider/Clothing & Apparel.webp";
import juwelier from "../../assets/slider/juwelier producy.jpg";
import Furniture from "../../assets/slider/Furniture & Home Decor.jpg";
import "../Slider/Slider.css";

const Slider = () => {
  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");
  let carouselDom = document.querySelector(".carousel");
  let listItemDom = document.querySelector(".carousel .list");
  let thumbnailDom = document.querySelector(".carousel .thumbnail");

  function showSlider(type) {
    let itemSlider = document.querySelectorAll(".carousel .list .item");
    let itemThumbnail = document.querySelectorAll(".carousel .thumbnail .item");

    if (type === "next") {
      listItemDom.appendChild(itemSlider[0]);
      thumbnailDom.appendChild(itemThumbnail[0]);
      carouselDom.classList.add("next");
    }
  }
//   nextDom.onclick = function () {
//     showSlider("next");
//   };

  return (
    <>
      <div className="carousel">
        {/* list item */}
        <div className="list">
          <div className="item">
            <img src={Groceries} alt="" />
            <div className="content">
              <div className="author">ROF7</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">Product</div>
              <div className="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus quibusdam a molestiae veniam similique maiores,
                mollitia cupiditate placeat earum eum?
              </div>
              <div className="button">
                <button>SEE MORE</button>
                <button>SUBCRIBE</button>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={Clothing} alt="" />
            <div className="content">
              <div className="author">ROF7</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">Product</div>
              <div className="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus quibusdam a molestiae veniam similique maiores,
                mollitia cupiditate placeat earum eum?
              </div>
              <div className="button">
                <button>SEE MORE</button>
                <button>SUBCRIBE</button>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={juwelier} alt="" />
            <div className="content">
              <div className="author">ROF7</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">Product</div>
              <div className="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus quibusdam a molestiae veniam similique maiores,
                mollitia cupiditate placeat earum eum?
              </div>
              <div className="button">
                <button>SEE MORE</button>
                <button>SUBCRIBE</button>
              </div>
            </div>
          </div>

          <div className="item">
            <img src={Furniture} alt="" />
            <div className="content">
              <div className="author">ROF7</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">Product</div>
              <div className="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus quibusdam a molestiae veniam similique maiores,
                mollitia cupiditate placeat earum eum?
              </div>
              <div className="button">
                <button>SEE MORE</button>
                <button>SUBCRIBE</button>
              </div>
            </div>
          </div>
        </div>
        {/* thumbnail */}
        <div className="thumbnail">
          <div className="item">
            <img src={Groceries} alt="" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>

          <div className="item">
            <img src={Clothing} alt="" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>

          <div className="item">
            <img src={juwelier} alt="" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>

          <div className="item">
            <img src={Furniture} alt="" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>
        </div>
        {/* arrows */}
        <div className="arrows">
          <button id="prev">&gt;</button> {/* > symbol */}
          <button id="next" onClick={()=> showSlider('next')}>&lt;</button> {/* < symbol */}
        </div>
        <div className="time"></div>
      </div>
    </>
  );
};

export default Slider;
