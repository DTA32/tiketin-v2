import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBack from "../components/HeaderBack";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

const apiUrl = import.meta.env.VITE_API_URL;

export default function NewsDetail() {
    const [news, setNews] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(apiUrl + "/news/get/" + id)
                .then((res) => {
                    if (res.data.status === "404") {
                        setError(true);
                    } else {
                        setNews(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setError(true);
                });
            setLoading(false);
        };
        fetchData();
    }, [id]);
    if (loading) {
        return (
            <div>
                <HeaderBack />
                <p className="text-center mt-5 fs-4">Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <HeaderBack />
                <p className="text-center text-danger mt-5 fw-bold fs-3">News not found or doesn&apos;t exist</p>
            </div>
        );
    }
    if (news !== undefined) {
        return (
            <div className="">
                <HeaderBack />
                <div className="scrollbar container" style={{ overflow: "auto", maxHeight: "95vh" }}>
                    <div className="mt-1">
                        <img
                            src={`${apiUrl}/images/news/${news.id}.jpg`}
                            alt=""
                            style={{
                                width: "100%",
                                height: 190,
                                objectFit: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                    </div>
                    <div className="pt-3 pb-5 px-3 bg-white">
                        <p className="mb-0 fs-4 fw-bold">{news.title}</p>
                        <div className="d-inline-flex">
                            <p className="text-secondary" style={{ fontSize: 12 }}>
                                Created by: {news.author}
                            </p>
                            <p className="ps-2 text-secondary" style={{ fontSize: 12 }}>
                                Date Created: {format(parseISO(news.created_at), "d/M/Y")}
                            </p>
                        </div>
                        <div>{news.content}</div>
                    </div>
                </div>
            </div>
        );
    }
}
