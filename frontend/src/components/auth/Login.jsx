import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    return (
        <div
            className="my-1 pt-4 pb-3 px-4"
            style={{
                background: "rgba(255, 255, 255, 0.75)",
                border: "1px solid #C1C1C1",
                borderRadius: 8,
            }}
        >
            <div>
                <div className="mb-4" style={{ width: 240 }}>
                    <label htmlFor="email">Email</label>
                    <div className="input-text-div px-0 w-100">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="input-text"
                            style={{ width: 200, background: "transparent" }}
                        />
                    </div>
                </div>
                <div className="mb-4" style={{ width: 240 }}>
                    <label htmlFor="password">Password</label>
                    <div className="input-text-div px-0 w-100">
                        <FontAwesomeIcon icon={faKey} />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="input-text"
                            autoComplete="off"
                            style={{ width: 200, background: "transparent" }}
                        />
                    </div>
                </div>
                <button type="submit" className="button mb-4" style={{ width: 240 }}>
                    Login
                </button>
            </div>
            <p className="text-center mb-0">Doesn&apos;t have account?</p>
            <Link
                to="/auth/register"
                className="d-flex justify-content-center text-decoration-none text-black text-decoration-underline"
            >
                Register
            </Link>
            <div className="pb-5 mb-5"></div>
        </div>
    );
}
