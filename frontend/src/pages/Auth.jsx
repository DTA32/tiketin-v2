import { Outlet } from "react-router-dom";

export default function Login() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center min-vh-100"
            style={{
                backgroundImage: "url(/images/login_bg.png)",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img src="/images/logo.png" alt="" className="text-center mb-3" style={{ height: 100 }} />
                <h4 className="text-center mb-0 text-white mb-1">Welcome to</h4>
                <h2 className="text-center mb-0 text-white mb-3">TIKETIN</h2>
            </div>
            <Outlet />
        </div>
    );
}
