import Footer from "../components/Footer";
import HeaderBack from "../components/HeaderBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        axios
            .get(apiUrl + "/news/getAll")
            .then((res) => {
                setNews(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <HeaderBack />
            <div
                className="container border border-secondary-subtle py-4 px-4 my-1 bg-white scrollbar"
                style={{ overflow: "auto", maxHeight: "80vh" }}
            >
                <div className="mb-2 d-inline-flex align-items-center">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                    <span className="ms-2 fs-5">News</span>
                </div>
                <div className="container d-flex flex-wrap justify-content-around gap-3">
                    {news.map((news, i) => (
                        <Link key={i} className="text-decoration-none" to={`/news/${news.id}`}>
                            <div className="card" style={{ width: 160 }}>
                                <img src={`${apiUrl}/images/news/${news.id}.jpg `} className="card-img-top" alt="" />
                                <div className="card-body p-2">
                                    <p className="card-title fw-bold" style={{ fontSize: 12 }}>
                                        {news.title}
                                    </p>
                                    <p className="card-text text-secondary" style={{ fontSize: 10 }}>
                                        {news.content}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
