import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "./Layout.css"


export default function Layout() {
    return (
        <AuthProvider>
            <div>
                <NavBar />
                <Outlet />
            </div>
        </AuthProvider>
    );
}
