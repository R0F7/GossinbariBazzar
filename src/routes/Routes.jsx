import { createBrowserRouter, } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        // children:[
        //     {
        //         path:'/login',

        //     }
        // ]
    },
    {
        path:'/login',
        element:<Login></Login>
    }
]);