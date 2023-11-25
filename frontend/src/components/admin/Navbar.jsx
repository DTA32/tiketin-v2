import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faHouse,
    faNewspaper,
    faCartFlatbedSuitcase,
    faTicket,
    faUser,
    faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/admin">
                    <img
                        src="/images/logo.png"
                        alt=""
                        width={30}
                        height={24}
                        className="d-inline-block align-text-top"
                    />
                    <span className="ms-2 text-white">Admin</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="d-flex navbar-nav">
                        <Link className="text-decoration-none" to="/admin">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faHouse} color="black" />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center">Home</span>
                            </div>
                        </Link>
                        <Link className="text-decoration-none" to="/admin/bandara">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center text-black">Bandara</span>
                            </div>
                        </Link>
                        <Link className="text-decoration-none text-black" to="/admin/penerbangan">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faPlaneDeparture} />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center text-black">
                                    Penerbangan
                                </span>
                            </div>
                        </Link>
                        <Link className="text-decoration-none text-black" to="/admin/pemesanan">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faTicket} />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center text-black">Pemesanan</span>
                            </div>
                        </Link>
                        <Link className="text-decoration-none text-black" to="/admin/news">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faNewspaper} />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center text-black">News</span>
                            </div>
                        </Link>
                        <Link className="text-decoration-none text-black" to="/admin/user">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center text-black">Users</span>
                            </div>
                        </Link>
                        <Link className="text-decoration-none text-black" to="/auth/logout">
                            <div className="d-flex rounded py-2 px-3 mx-2 my-1 btn btn-info">
                                <span className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </span>
                                <span className="d-flex ps-2 flex-grow-1 align-items-center text-black">Logout</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
