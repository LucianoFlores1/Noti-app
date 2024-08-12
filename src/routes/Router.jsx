import { createBrowserRouter } from "react-router-dom";
//import de las direcciones
import Home from '../components/Home';
import Login from '../components/Login';
import Articles from '../components/Articles';
import ArticleDetail from "../components/ArticleDetails";
import ArticleForm from "../components/ArticleForm";

//
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";


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
                element: (
                    <ProtectedRoute>
                        <Articles />
                    </ProtectedRoute>
                ),
            },
            {
                path: "articles/:id",
                element: (
                    <ProtectedRoute>
                        <ArticleDetail />
                    </ProtectedRoute>)
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
