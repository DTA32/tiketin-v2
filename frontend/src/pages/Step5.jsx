import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import OrderCard from "../components/step5/OrderCard";
import { Outlet } from "react-router-dom";

export default function Step5() {
    const { id } = useParams();
    // TODO: order validation (not found or already paid
    return (
        <div>
            <OrderCard id={id} />
            <Outlet />
        </div>
    );
}
