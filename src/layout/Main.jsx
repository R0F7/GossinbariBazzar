import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import usePageTracking from "@/hooks/usePageTracking";
import { useEffect } from "react";
import { initGA, trackPageView } from "@/utils/ga";

const Main = () => {

  useEffect(() => {
    initGA();
    // trackPageView(window.location.pathname);
  }, []);

  usePageTracking();

  return (
    <div className="font-lato">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-76px)]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Main;
