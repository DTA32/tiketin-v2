import { useState, useEffect } from "react";
import axios from "axios";
import HistoryCard from "./HistoryCard";

export default function HistoryList() {
    const [pemesanan, setPemesanan] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/pemesanan/getAll");
                setPemesanan(res.data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading) {
        return (
            <div className="container overflow-x-hidden overflow-y-auto scrollbar" style={{ maxHeight: "80vh" }}>
                <div className="fs-4 text-center mt-1">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }
    if (pemesanan.length === 0) {
        return (
            <div className="container overflow-x-hidden overflow-y-auto scrollbar" style={{ maxHeight: "80vh" }}>
                <div className="text-center my-1 py-2 px-3">
                    <p className="fs-4">Tidak ada riwayat pemesanan</p>
                </div>
            </div>
        );
    }
    return (
        <div className="container overflow-x-hidden overflow-y-auto scrollbar" style={{ maxHeight: "80vh" }}>
            {pemesanan.map((p) => (
                <HistoryCard key={p.id} p={p} />
            ))}
        </div>
    );
}
