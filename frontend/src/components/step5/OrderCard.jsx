import { useState, useEffect } from "react";
import axios from "axios";
import rupiah from "../../utils/converter";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

const apiUrl = import.meta.env.VITE_API_URL;

export default function OrderCard({ id }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(apiUrl + "/pemesanan/getDetail/" + id);
                if (res.data.status === "404") {
                    setError("404 Not Found");
                } else {
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
    if (loading) {
        return (
            <div
                className="container border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white text-center fs-4"
                style={{ height: "200px" }}
            >
                Loading...
            </div>
        );
    }
    if (error) {
        return (
            <div className="container border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">Error! {error}</div>
        );
    }
    return (
        <div className="container border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">
            <div className="row">
                <p className="fs-5 text-center">Pemesanan</p>
            </div>
            <div className="row">
                <div className="col">
                    <p className="mb-2" style={{ fontSize: 16 }}>
                        Booking ID: {data.id}
                    </p>
                    <p className="mb-2" style={{ fontSize: 18 }}>
                        {data.penerbangan.bandara_asal.kota} - {data.penerbangan.bandara_tujuan.kota}
                    </p>
                    <p className="mb-2" style={{ fontSize: 12 }}>
                        {format(parseISO(data.penerbangan.waktu_berangkat), "E, d LLL")} |{" "}
                        {data.pemesanan_harga.kuantitas} pax |{" "}
                        {data.kelas_penerbangan.tipe_kelas == 1
                            ? "Ekonomi"
                            : data.kelas_penerbangan.tipe_kelas == 2
                            ? "Bisnis"
                            : "First"}
                    </p>
                </div>
                <div className="col d-flex justify-content-end align-items-center">
                    <p style={{ fontSize: 21 }}>{rupiah(data.pemesanan_harga.total)} </p>
                </div>
            </div>
        </div>
    );
}

OrderCard.propTypes = {
    id: PropTypes.number,
};
