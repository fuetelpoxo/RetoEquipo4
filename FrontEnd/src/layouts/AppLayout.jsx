import { Outlet } from "react-router-dom";
import AppMenu from "../components/AppMenu";

function AppLayout() {
    return (<>
        <AppMenu />
        <main>
            <Outlet />
        </main>
    </>);
}

export default AppLayout;