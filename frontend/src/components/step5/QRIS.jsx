import Countdown from "react-countdown";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QRIS() {
    const [completed, setCompleted] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleBayar = async () => {
        const data = {
            id: id,
            metode_pembayaran: 3,
            referensi_pembayaran: "QRIS-" + (Math.floor(Math.random() * 9999) + 1000).toString().slice(-4),
        };
        try {
            const res = await axios.put("http://127.0.0.1:8000/api/pemesanan/pay/" + id, data);
            if (res.data.status === "404") {
                alert("Pemesanan tidak ditemukan!");
            } else if (res.data.status === "400") {
                alert("Pembayaran gagal! Bad Request");
            } else if (res.data.status === "200") {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
        console.log(data);
    };
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            setCompleted(true);
            return <span>00:00</span>;
        } else {
            return (
                <span>
                    {minutes} menit {seconds} detik
                </span>
            );
        }
    };
    return (
        <div className="container border border-secondary-subtle my-2 py-4 px-3 bg-white">
            <p className="text-center fs-4 mb-0">QRIS</p>
            <div className="d-flex justify-content-center py-4">
                <img src="/images/qris.jpg" alt="qr" className="w-50 h-50" />
            </div>
            <div className="d-flex justify-content-center">
                <p className="mb-0">Selesaikan pembayaran dalam</p>
            </div>
            <div className="d-flex justify-content-center">
                <Countdown date={Date.now() + 900000} renderer={renderer} />
            </div>
            <p className="py-3" style={{ fontSize: 14 }}>
                Pembayaran anda akan diproses otomatis, tekan tombol dibawah jika sudah membayar namun belum diproses
            </p>
            <div className="text-center mt-2">
                <button
                    type="submit"
                    className={`button text-center ${completed && "bg-secondary-subtle"}`}
                    style={{ width: 240 }}
                    disabled={completed}
                    onClick={handleBayar}
                >
                    Saya sudah membayar
                </button>
            </div>
        </div>
    );
}
