import Header from "../components/Header";
import SearchBox from "../components/home/SearchBox";
import Footer from "../components/Footer";
import NewsSlider from "../components/home/NewsSlider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";

const mySwal = withReactContent(Swal);

export default function Home() {
    useEffect(() => {
        const lastVisit = localStorage.getItem("lastVisit") || "";
        const todayRaw = new Date();
        const today = todayRaw.toDateString();
        if (lastVisit === null) localStorage.setItem("lastVisit", today);
        if (lastVisit !== today) {
            localStorage.setItem("lastVisit", today);
            mySwal.fire({
                title: "INFO",
                html: `Ini adalah staging version dari project Tiketin, oleh karena itu hanya penerbangan di esok hari yang bisa dicari, info selengkapnya mengenai Tiketin bisa dilihat <a href="https://github.com/DTA32/tiketin-v2/tree/server/README.md" target="_blank">disini</a>. Semua order yang dibuat di website ini hanyalah fiktif dan tidak dapat digunakan di dunia nyata`,
                icon: "info",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                didOpen: (modal) => {
                    modal.querySelector(".swal2-confirm").disabled = true;
                    setTimeout(() => {
                        modal.querySelector(".swal2-confirm").disabled = false;
                    }, 5000);
                },
            });
        }
    }, []);
    return (
        <div>
            <Header />
            <div className="container overflow-x-hidden overflow-y-auto scrollbar" style={{ maxHeight: "80vh" }}>
                <div className="greeting mb-2 pb-1">
                    <p className="fs-6 lh-sm mb-0">Halo, Guest!</p>
                    <p className="fs-5 fw-bold lh-sm mb-0">Mau kemana?</p>
                </div>
                <SearchBox />
                <NewsSlider />
            </div>
            <Footer />
        </div>
    );
}
