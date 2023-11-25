import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faHeadset,
    faCircleInfo,
    faArrowRightFromBracket,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Settings() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="border border-secondary-subtle py-4 mt-1 mb-2 bg-info">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faUserCircle} size="6x" />
                    </div>
                    <p className="fs-3 text-center mb-0 mt-3">Guest</p>
                </div>
                <div className="mt-1 mb-4">
                    <Link className="text-black text-decoration-none" to="/profile">
                        <div className="d-flex border border-secondary-subtle align-items-center py-2 px-3 bg-white">
                            <FontAwesomeIcon icon={faUserCircle} size="2x" />
                            <span className="d-flex ps-2 flex-grow-1 align-items-center">Profile</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                    <Link className="text-black text-decoration-none" to="/support">
                        <div className="d-flex border border-secondary-subtle align-items-center py-2 px-3 bg-white">
                            <span className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faHeadset} size="2x" />
                            </span>
                            <span className="d-flex ps-2 flex-grow-1 align-items-center">Customer Service</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                    <Link className="text-black text-decoration-none" to="/about">
                        <div className="d-flex border border-secondary-subtle align-items-center py-2 px-3 bg-white">
                            <span className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faCircleInfo} size="2x" />
                            </span>
                            <span className="d-flex ps-2 flex-grow-1 align-items-center">About</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                </div>
                <Link className="text-black text-decoration-none" to="/admin">
                    <div className="d-flex border border-secondary-subtle align-items-center py-2 px-3 bg-warning">
                        <span className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </span>
                        <span className="d-flex ps-2 flex-grow-1 align-items-center">Return to Admin CPanel</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </Link>
                <Link className="text-black text-decoration-none" to="/auth/logout">
                    <div
                        className="d-flex border border-secondary-subtle align-items-center py-2 mt-1 px-3 bg-danger-subtle mb-3"
                        style={{ cursor: "pointer" }}
                    >
                        <span className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
                        </span>
                        <span className="d-flex ps-2 flex-grow-1 align-items-center">Logout</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </Link>
            </div>
            <Footer />
        </>
    );
}
