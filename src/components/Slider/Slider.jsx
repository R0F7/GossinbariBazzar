import Groceries from "../../assets/slider/Groceries.jpg";
import Clothing from "../../assets/slider/Clothing & Apparel.webp";
import juwelier from "../../assets/slider/juwelier producy.jpg";
import Furniture from "../../assets/slider/Furniture & Home Decor.jpg";
import "../Slider/Slider.css";
import { useEffect } from "react";
import sliderUtilityFunction from "./sliderUtilityFunction";

const Slider = () => {
  useEffect(() => {
    sliderUtilityFunction();
  }, []);

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
          <button id="next">&lt;</button> {/* < symbol */}
          <button id="prev">&gt;</button> {/* > symbol */}
        </div>
        <div className="time"></div>
      </div>
    </>
  );
};

export default Slider;
