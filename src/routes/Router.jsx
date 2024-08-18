import { createBrowserRouter } from "react-router-dom";
//import de las direcciones
import Home from '../components/Home'; //inicio
import Login from '../components/Login'; //login
import Articles from '../components/Articles'; //seccion de articulos en miniaturas
import ArticleDetail from "../components/ArticleDetails"; // Articulo individual en primer plano
import ArticleForm from "../components/ArticleForm"; // formulario para crear articulos

//
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import { CategoryList } from "../hooks/useFetchCategories"; // Obtener una lista de las categorias de los articulos
import Profile from "../components/Profile";
import UpdateProfileForm from "../components/UpdateProfileForm";

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
                element: <ProtectedRoute>
                    <ArticleForm />
                </ProtectedRoute>
            },
            {
                path: "categories",
                element: (
                    <ProtectedRoute>
                        <CategoryList />
                    </ProtectedRoute>

                ),
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
