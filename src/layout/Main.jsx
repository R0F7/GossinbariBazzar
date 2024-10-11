import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Main = () => {
    return (
        <div className="font-lato">
            {/* TODO Navbar */}
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-76px)]">
                <Outlet></Outlet>
            </div>
            {/* TODO Footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;