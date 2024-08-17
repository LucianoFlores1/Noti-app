import { createBrowserRouter } from "react-router-dom";
//import de las direcciones
import Home from '../components/Home';
import Login from '../components/Login';
import Articles from '../components/Articles';
import ArticleDetail from "../components/ArticleDetails";
import ArticleForm from "../components/ArticleForm";
import Profile from "../components/Profile";
import UpdateProfileForm from "../components/UpdateProfileForm";

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
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
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
            },

            {
                path: "updateprofile/:{user__id}/",
                element: (
                    <ProtectedRoute>
                        <UpdateProfileForm />
                    </ProtectedRoute>
                ),
            }
        ],
    },
    {
        path: "*",
        element: <h1>Not found</h1>
    },
]);

export { Router };
