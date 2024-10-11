import Logo from "../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoHomeOutline, IoLogoInstagram } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer>
      <div>
        {/* BIO */}
        <div>
          {/* logo+Name  */}
          <div className="flex items-center gap-1">
            <img className="w-12 rop-shadow-2xl" src={Logo} alt="" />
            <h4 className="text-logo-font-family text-[#006400] text-lg">
              Gossainbari<span className="text-[#4B0082]">Bazzar</span>
            </h4>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio earum
            quidem cum dolorem deleniti saepe.
          </p>
          <div>
            <ul>
              <li>
                <i><TfiEmail /></i>
                <h4>contact@example.com</h4>
              </li>
              <li>
                <i><LuPhone /></i>
                <h4>016 12500106</h4>
              </li>
              <li>
                <i><IoHomeOutline /></i>
                <h4>Gossainbari Bogura, Bangladesh</h4>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <FaFacebookF />
              </li>
              <li>
                <IoLogoInstagram />
              </li>
              <li>
                <FaLinkedinIn />
              </li>
              <li>
                <FaXTwitter />
                {/* <IoLogoInstagram /> */}
              </li>
            </ul>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h4>ABOUT</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* HELP & GUIDE */}
        <div>
          <h4>HELP & GUIDE</h4>
          <ul>
            <li>Term Of Use</li>
            <li>Privacy Policy</li>
            <li>Shipping & Delivery</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4>NEWSLETTER</h4>
          <div>
            <p>
              Don’t miss out <strong>thousands of great deals</strong> &
              promotions.
            </p>
            <form>
              <input type="email" name="" id="" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      {/* footer - footer */}
      <div>
        <h6>© 2024 GossainbaiBazzar. All rights reserved by R0F7.</h6>
        {/* payment method logo */}
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
