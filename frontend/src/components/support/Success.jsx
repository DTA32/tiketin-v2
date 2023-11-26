import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div className="support-container">
            <div className="row justify-content-center align-items-center w-100 h-100 mx-0 my-5">
                <div className="col-12 text-center">
                    <FontAwesomeIcon icon={faCheckCircle} size="5x" className="mb-5" />
                    <h1 className="mb-2">Success!</h1>
                    <p className="mb-5">Tim kami akan menghubungi anda</p>
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
