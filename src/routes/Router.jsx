import { createBrowserRouter } from "react-router-dom";
//import de las direcciones
import Home from '../components/Home';
import Login from '../components/Login';

//
import Layout from "./Layout";


const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element:

                    <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <h1>Not found</h1>
    },
]);

export { Router };
