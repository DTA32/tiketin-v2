import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faNewspaper, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function NewsSlider() {
    return(
        <div className="search-box pb-3 pe-0">
            <Link to="/news" className="d-inline-flex text-black text-decoration-none pt-2 my-2 w-100">
                <div className="fs-5 d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faNewspaper} />
                    <p className="mb-0">News</p>
                    <FontAwesomeIcon icon={faChevronRight} className="ms-2"/>
                </div>
            </Link>
            <div className="overflow-x-auto overflow-y-hidden scrollbar"
                style={{whiteSpace: "nowrap", scrollbarWidth: "thin"}}>
                    <div className="d-inline-block me-2">
                        <a className="text-decoration-none" href="{{ route('news.detail', $newsss->id) }}">
                            <div className="card" style={{width: "140px", whiteSpace: "normal"}}>
                                <img src="http://127.0.0.1:8000/images/news/1.jpg" className="card-img-top"
                                    style={{height:"100px"}}/>
                                <div className="card-body p-2">
                                    <p className="card-title fw-bold" style={{fontSize: "12px"}}>ABBC</p>
                                    <p className="card-text text-secondary" style={{fontSize: "10px"}}>
                                        ABC</p>
                                </div>
                            </div>
                        </a>
                    </div>
            </div>
        </div>
    )
}