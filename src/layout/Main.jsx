import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            {/* TODO Navbar */}
            <h4>navbar</h4>
            <div className="">
                <Outlet></Outlet>
            </div>
            {/* TODO Footer */}
            <hr />footer
        </div>
    );
};

export default Main;