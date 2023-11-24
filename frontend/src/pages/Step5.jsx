import { Link, useParams } from "react-router-dom";
import OrderCard from "../components/step5/OrderCard";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Step5() {
    const { id } = useParams();
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/pemesanan/getDetail/" + id);
                if (res.data.status === "404") {
                    setStatus(404);
                } else if (res.data.data.metode_pembayaran != 0) {
                    setStatus(400);
                } else if (res.data.data.metode_pembayaran == 0) {
                    setStatus(200);
                }
            } catch (error) {
                console.log(error);
                setStatus(500);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);
    return (
        <div>
            <OrderCard id={id} />
            {loading && (
                <div className="fs-4 text-center mt-1">
                    <p>Loading...</p>
                </div>
            )}
            {status === 404 && (
                <div className="text-center">
                    <p className="text-danger mt-1 fs-4">Error! 404 Not Found</p>
                    <Link to="/" className="text-decoration-none">
                        <button className="button text-center" style={{ maxWidth: 240, width: "100%" }}>
                            Kembali ke halaman awal
                        </button>
                    </Link>
                </div>
            )}
            {status === 400 && (
                <div className="text-center py-3">
                    <p className="text-info-emphasis mt-1 fs-4">Pembayaran sudah dilakukan</p>
                    <Link to="/" className="text-decoration-none">
                        <button className="button text-center" style={{ maxWidth: 240, width: "100%" }}>
                            Kembali ke halaman awal
                        </button>
                    </Link>
                </div>
            )}
            {status === 500 && (
                <div className="text-center">
                    <p className="text-danger mt-1 fs-4">Error! 500 Internal Server Error</p>
                    <Link to="/" className="button bg-secondary-subtle">
                        Kembali ke halaman awal
                    </Link>
                </div>
            )}
            {status === 200 && <Outlet />}
        </div>
    );
}
