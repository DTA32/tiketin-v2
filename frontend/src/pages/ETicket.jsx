import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderBack from "../components/HeaderBack";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ETicket() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(apiUrl + "/pemesanan/getDetail/" + id);
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
        <div className="container bg-white">
            <HeaderBack />
            <div className="my-3" id="printBtn" style={{ margin: "0 3vw" }}>
                <div className="btn btn-primary" onClick={() => window.print()}>
                    <FontAwesomeIcon icon={faPrint} size="lg" />
                    <span className="ms-2">Print</span>
                </div>
            </div>
            <div style={{ margin: "0 3vw", padding: "4vh 3vw" }} id="printArea" className="border my-3">
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className="d-inline-flex align-items-end">
                        <h2 className="mb-0">E-ticket</h2>
                        <small className="text-secondary">&nbsp;/ tiket elektronik</small>
                    </div>
                    <img src="/images/logo.png" alt="logo" height={96} />
                </div>
                <div className="mt-5 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Detail penerbangan</h4>
                        <p className="mb-0 text-secondary">TIKETIN Booking ID: {data.id}</p>
                    </div>
                    <div style={{ border: "solid #9ca3af", borderWidth: "1px 1px 1px 4px" }} className="row m-0 py-3">
                        <div className="col-4">
                            <div className="mb-3">
                                <img
                                    src={`${apiUrl}/images/maskapai/${data.penerbangan.maskapai
                                        .toLowerCase()
                                        .replace(/ /g, "_")}.png`}
                                    height="64px"
                                    className="my-2"
                                />
                                <p className="mb-0">{data.penerbangan.maskapai}</p>
                                <p className="mb-0 text-secondary">
                                    {data.kelas_penerbangan.tipe_kelas == 1
                                        ? "Ekonomi"
                                        : data.kelas_penerbangan.tipe_kelas == 2
                                        ? "Bisnis"
                                        : "First"}
                                </p>
                            </div>
                            <p className="mb-0">Kode Booking Maskapai (PNR)</p>
                            <h3>{data.booking_code}</h3>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <small className="text-secondary">Berangkat</small>
                                    <p className="fs-5 fw-bold mb-1">
                                        {format(parseISO(data.penerbangan.waktu_berangkat), "EEEE, d MMMM Y")}
                                    </p>
                                    <p className="mb-0">{data.penerbangan.bandara_asal.kota}</p>
                                    <p className="mb-0">{data.penerbangan.bandara_asal.nama_bandara}</p>
                                    <p>
                                        Pukul{" "}
                                        <span className="fw-bold">
                                            {format(parseISO(data.penerbangan.waktu_berangkat), "HH:mm")}
                                        </span>
                                    </p>
                                </div>
                                <div className="col">
                                    <small className="text-secondary">Tiba</small>
                                    <p className="fs-5 mb-1">
                                        {format(parseISO(data.penerbangan.waktu_sampai), "EEEE, d MMMM Y")}
                                    </p>
                                    <p className="mb-0">{data.penerbangan.bandara_tujuan.kota}</p>
                                    <p className="mb-0">{data.penerbangan.bandara_tujuan.nama_bandara}</p>
                                    <p>Pukul {format(parseISO(data.penerbangan.waktu_sampai), "HH:mm")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <p className="mb-0">Note:</p>
                    <ul>
                        <li>Tunjukkan identitas para penumpang saat check-in</li>
                        <li>Lakukan check-in paling lambat 2 jam sebelum keberangkatan</li>
                        <li>Waktu yang tertera diatas adalah waktu bandara setempat</li>
                    </ul>
                </div>
                <div className="mt-5">
                    <h4>Detail penumpang</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Nomor Kursi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.pemesanan_penumpang.map((penumpang, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{penumpang.nama}</td>
                                    <td>{penumpang.kursi_penerbangan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ height: 240 }} />
                <div className="text-center">
                    <img src="/images/logo.png" alt="logo" />
                </div>
            </div>
        </div>
    );
}
