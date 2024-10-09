import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Main = () => {
    return (
        <div className="font-lato">
            {/* TODO Navbar */}
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-76px)]">
                <Outlet></Outlet>
            </div>
            {/* TODO Footer */}
            <hr />footer
        </div>
    );
};

export default Main;