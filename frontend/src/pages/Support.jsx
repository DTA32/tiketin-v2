import HeaderBack from "../components/HeaderBack";
import { Outlet } from "react-router-dom";

export default function Support() {
    return (
        <div>
            <HeaderBack />
            <Outlet />
        </div>
    );
}
