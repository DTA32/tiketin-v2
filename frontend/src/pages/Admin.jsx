import Navbar from "../components/admin/Navbar";
import { Outlet } from "react-router-dom";

export default function Admin() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}
