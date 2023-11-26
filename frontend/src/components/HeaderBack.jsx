import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function HeaderBack() {
    const navigate = useNavigate();
    return (
        <div className="header-container text-center">
            <div className="row justify-content-center align-items-center w-100 h-100 mx-0">
                <div className="col-3">
                    <Link
                        to={".."}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                        className="text-black"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
                    </Link>
                </div>
                <div className="col-6">
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" className="logo" />
                    </Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}
