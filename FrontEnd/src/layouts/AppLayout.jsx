import { Outlet } from "react-router-dom";
import AppMenu from "../components/AppMenu.jsx";

function AppLayout() {
    return (
        <div>
            <AppMenu />
            <div className="container mt-5">
                <Outlet />
            </div>
        </div>
    );
}

export default AppLayout;
