import toast from "react-hot-toast";
import Logo from "../../assets/Gossaigbari_Bazzar_logo_crop-removebg-preview.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  IoHomeOutline,
  //   IoLocationOutline,
  IoLogoInstagram,
} from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    setEmail(emailValue);
    console.log(email);
    
    if (!email) {
      toast.success("welcome to join our family");
    }else{
        toast.error('already added')
    }
  };

  return (
    <footer className="container mx-auto pt-12">
      <div className="grid grid-cols-6 gap-10">
        {/* BIO */}
        <div className="col-span-2">
          {/* logo+Name  */}
          <div className="flex items-center gap-1">
            <img className="w-12 rop-shadow-2xl" src={Logo} alt="" />
            <h4 className="text-logo-font-family text-[#006400] text-lg">
              Gossainbari<span className="text-[#4B0082]">Bazzar</span>
            </h4>
          </div>
          <p className="py-6 w-[85%] text-[#4E565F] font-medium">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio earum
            quidem cum dolorem deleniti saepe.
          </p>
          <div className="pb-8">
            <ul className="space-y-2.5 text-[#4E565F]">
              <li>
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-2"
                >
                  <i>
                    <TfiEmail />
                  </i>
                  <h4>contact@example.com</h4>
                </a>
              </li>

              <li>
                <a
                  href="tel:+8801612500106"
                  className="flex items-center gap-2"
                >
                  <i>
                    <LuPhone />
                  </i>
                  <h4 className="font-bold text-[#212B36]">016 12500106</h4>
                </a>
              </li>

              <li className="flex items-center gap-2">
                <i>
                  <IoHomeOutline />
                </i>
                {/* <i><IoLocationOutline /></i> */}
                <h4>Gossainbari Bogura, Bangladesh</h4>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center gap-6 pb-8 text-[#212B36] text-[17px]">
              <Link to="https://facebook.com" target="_blank">
                <FaFacebookF />
              </Link>
              <Link to="https://instagram.com" target="_blank">
                <IoLogoInstagram />
              </Link>
              <Link to="https://linkedin.com" target="_blank">
                <FaLinkedinIn />
              </Link>
              <Link to="https://x.com" target="_blank">
                <FaXTwitter />
                {/* <IoLogoInstagram /> */}
              </Link>
            </ul>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h4 className="text-[#212B36] mb-3.5 font-bold">ABOUT</h4>
          <ul className="flex flex-col space-y-3 text-[#4E565F] text-[15px] font-medium">
            <Link to="#">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/help-center">Help Center</Link>
            <Link to="#">FAQ</Link>
          </ul>
        </div>

        {/* HELP & GUIDE */}
        <div>
          <h4 className="text-[#212B36] mb-3.5 font-bold">HELP & GUIDE</h4>
          <ul className="flex flex-col space-y-3 text-[#4E565F] text-[15px] font-medium">
            <Link to="/term-of-use">Term Of Use</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Shipping & Delivery</Link>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="col-span-2">
          <h4 className="text-[#212B36] mb-3.5 font-bold">NEWSLETTER</h4>
          <div>
            <p className="text-[#4E565F] w-[50%] text-[15px]">
              Don’t miss out <strong>thousands of great deals</strong> &
              promotions.
            </p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id=""
                className="bg-[#F4F6F8] border outline-none p-2 w-[60%] rounded-md shadow-sm my-4"
                placeholder="Email address..."
                requiredL
              />
              <button
                type="submit"
                className="bg-[rgb(46,141,216)] text-white w-[115px] border-none py-2 rounded-md font-semibold shadow-sm transform duration-150 active:scale-95 scale-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* footer - footer */}
      <div className="py-6 border-t text-center">
        <h6 className="text-[#4E565F]">
          © 2024 <strong>GossainbariBazzar.</strong> All rights reserved by R0F7.
        </h6>
        {/* payment method logo */}
        {/* <div></div> */}
      </div>
    </footer>
  );
};

export default Footer;
