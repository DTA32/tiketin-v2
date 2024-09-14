import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Pemesanan() {
    const [pemesanan, setPemesanan] = useState([]);

    useEffect(() => {
        axios
            .get(apiUrl + "/pemesanan/getAll")
            .then((response) => {
                setPemesanan(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="p-4">
            <p className="text-center fw-bold fs-4 my-1">Pemesanan</p>
            <div className="container my-4">
                <div className="my-3">
                    <p className="mb-1 fw-bold">List of Pemesanan</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Metode Pembayaran</th>
                                <th scope="col">Referensi Pembayaran</th>
                                <th scope="col">Kelas Penerbangan</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pemesanan.map((order) => (
                                <tr key={order.id}>
                                    <th scope="row"> {order.id} </th>
                                    <td> {order.status == 0 ? "Gagal" : "Berhasil"} </td>
                                    <td>
                                        {order.metode_pembayaran == 0
                                            ? "Belum bayar"
                                            : order.metode_pembayaran == 1
                                            ? "Kartu Kredit / Debit"
                                            : order.metode_pembayaran == 2
                                            ? "Virtual Account"
                                            : order.metode_pembayaran == 3
                                            ? "QRIS"
                                            : "Error"}
                                    </td>
                                    <td>{order.referensi_pembayaran}</td>
                                    <td>
                                        {order.kelas_penerbangan.tipe_kelas == 1
                                            ? "Ekonomi"
                                            : order.kelas_penerbangan.tipe_kelas == 2
                                            ? "Bisnis"
                                            : order.kelas_penerbangan.tipe_kelas == 3
                                            ? "First"
                                            : "Error/Unlisted"}
                                    </td>
                                    <td>{order.userId}</td>
                                    <td>
                                        <Link
                                            to={`detail/${order.id}`}
                                            className="btn bg-warning-subtle text-decoration-none py-0"
                                        >
                                            Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
