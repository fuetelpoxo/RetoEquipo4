import { Outlet } from "react-router-dom";
import AppMenu from "../components/AppMenu.jsx";
import AppFooter from "../components/AppFooter.jsx";

function AppLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AppMenu />
            <div className="container mt-5 flex-grow-1">
                <Outlet />
            </div>
            <AppFooter />
        </div>
    );
}

export default AppLayout;
