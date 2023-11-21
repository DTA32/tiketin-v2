import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTicket, faCog } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return(
        <div className="footer-container container text-center">
            <div className="row d-flex justify-content-center align-items-center w-100 h-100 mx-0">
                <div className="col">
                    <Link to="/" className="footer-button rounded-circle p-2">
                        <FontAwesomeIcon icon={faHouse} color="black"/>
                    </Link>
                </div>
                <div className="col">
                    <Link to="/history" className="footer-button rounded-circle p-2">
                        <FontAwesomeIcon icon={faTicket} color="black"/>
                    </Link>
                </div>
                <div className="col">
                    <Link to="/settings" className="footer-button rounded-circle p-2">
                        <FontAwesomeIcon icon={faCog} color="black"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}