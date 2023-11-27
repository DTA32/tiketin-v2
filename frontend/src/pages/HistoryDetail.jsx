import { useParams } from "react-router-dom";
import HeaderBack from "../components/HeaderBack";
import { useEffect, useState } from "react";
import axios from "axios";
import FlightDetail from "../components/FlightDetail";
import PassengerList from "../components/PassengerList";
import PriceDetail from "../components/PriceDetail";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function HistoryDetail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/pemesanan/getDetail/" + id);
                if (res.data.status === "404") {
                    setError("Pemesanan tidak ditemukan!");
                } else if (res.data.status === "200") {
                    setData(res.data.data);
                }
            } catch (error) {
                console.log(error);
                setError("Error: " + error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);
    if (error) {
        return (
            <>
                <HeaderBack />
                <div className="text-danger mt-1 fs-4 text-center">
                    <p>Error! {error}</p>
                </div>
            </>
        );
    }
    if (loading) {
        return (
            <>
                <HeaderBack />
                <div className="fs-4 text-center mt-1">
                    <p>Loading...</p>
                </div>
            </>
        );
    }
    return (
        <div className="pb-3">
            <HeaderBack />
            <div className="container">
                <div>
                    <div className="fs-5 text-center mt-1">
                        <p>Pemesanan</p>
                    </div>
                    <div className="border border-secondary-subtle py-1 px-3 bg-white d-flex justify-content-between align-items-center">
                        <p className="my-1">Booking ID</p>
                        <p className="my-1">{data.id}</p>
                    </div>
                    <div className="border border-secondary-subtle py-1 px-3 bg-white d-flex justify-content-between align-items-center">
                        <p className="my-1">Tanggal Pemesanan</p>
                        <p className="my-1">{format(parseISO(data.created_at), "EEEE, d MMMM y")}</p>
                    </div>
                    <div
                        className="border border-secondary-subtle py-1 px-3 bg-white d-flex justify-content-between align-items-center py-2"
                        style={{ border: "1px solid #868686" }}
                    >
                        <p className="my-1">Status</p>
                        {data.status == 1 && (
                            <p className="text-center mb-0 px-4 bg-success text-light rounded-pill">Berhasil</p>
                        )}
                        {data.status == 0 && (
                            <p className="text-center mb-0 px-4 bg-danger text-light rounded-pill">Gagal</p>
                        )}
                    </div>
                </div>
                <FlightDetail data={data} source={1} />
                <PassengerList passengers={data.pemesanan_penumpang} />
                <PriceDetail source={1} data={data} />
                {data.status == 1 && (
                    <>
                        <div>
                            <p className="fs-5 mt-3 ps-3 mb-2">Metode Pembayaran</p>
                            <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">
                                {data.metode_pembayaran == 1 && <p className="mb-3 fs-5">Kartu Kredit/Debit</p>}
                                {data.metode_pembayaran == 2 && <p className="mb-3 fs-5">Virtual Account</p>}
                                {data.metode_pembayaran == 3 && <p className="mb-3 fs-5">QRIS</p>}
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">No. Referensi</p>
                                    <p className="mb-2">{data.referensi_pembayaran}</p>
                                </div>
                            </div>
                        </div>
                        <Link to={`/history/${id}/eticket`} className="text-decoration-none text-black">
                            <div
                                className="border border-secondary-subtle mt-3 py-2 px-3 bg-white"
                                style={{ border: "1px solid #868686" }}
                            >
                                <FontAwesomeIcon icon={faTicket} />
                                <span className="ps-2">Lihat E-ticket</span>
                            </div>
                        </Link>
                    </>
                )}
                {data.metode_pembayaran == 0 && (
                    <div>
                        <p className="fs-5 mt-3 ps-3 mb-2">Metode Pembayaran</p>
                        <div className="border border-secondary-subtle my-1 py-5 px-3 bg-white text-center">
                            <p className="fs-5 mb-1">Belum dibayar</p>
                            <p className="fs-6">Lakukan pembayaran dengan menekan tombol dibawah</p>
                            <Link to={`/order/pay/${data.id}`} className="text-decoration-none">
                                <button className="button text-center" style={{ maxWidth: 240, width: "100%" }}>
                                    Bayar sekarang
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                <div className="text-center pb-4" style={{ marginTop: 120 }}>
                    <p className="fs-5 mb-0">Butuh bantuan?</p>
                    <Link
                        to={{ pathname: "/support", search: "?order_id=" + data.id }}
                        className="d-inline-block button text-center text-decoration-none pt-1"
                        style={{ width: 240 }}
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </div>
    );
}
