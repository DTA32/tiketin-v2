import HeaderBack from "../components/HeaderBack";
import ProgressBar from "../components/ProgressBar";
import { Outlet, useMatch } from "react-router-dom";

export default function Order() {
    const match = useMatch("/order/:step/*");
    const progressStep =
        match !== null
            ? match.params.step === "form"
                ? 2
                : match.params.step === "seat"
                ? 3
                : match.params.step === "review"
                ? 4
                : match.params.step === "pay"
                ? 5
                : 1
            : 1;
    return (
        <div>
            <HeaderBack />
            <ProgressBar step={progressStep} />
            {match === null && <p className="fs-4 text-center text-danger">Error!</p>}
            <Outlet />
        </div>
    );
}
