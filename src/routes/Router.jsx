import { createBrowserRouter } from "react-router-dom";
//import de las direcciones
import Home from '../components/Home';
import Login from '../components/Login';
import Articles from '../components/Articles';
import ArticleDetail from "../components/ArticleDetails";

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
            {
                path: "articles",
                element: <Articles />,
            },
            {
                path: "articles/:id",
                element: <ArticleDetail />
            },
            {
                path: "create",
                element: <ArticleForm />
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not found</h1>
    },
]);

export { Router };
