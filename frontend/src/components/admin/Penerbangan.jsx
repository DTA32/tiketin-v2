import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Penerbangan() {
    const [penerbangan, setPenerbangan] = useState([]);

    useEffect(() => {
        axios
            .get(apiUrl + "/admin/penerbangan/getAll")
            .then((response) => {
                setPenerbangan(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => (e) => {
        e.preventDefault();
        axios
            .delete(`${apiUrl}/admin/penerbangan/delete/${id}`)
            .then((response) => {
                console.log(response);
                // Fetch data again after deletion
                axios
                    .get(apiUrl + "/admin/penerbangan/getAll")
                    .then((response) => {
                        setPenerbangan(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <p className="text-center fw-bold fs-4 my-1">Penerbangan</p>
            <div className="container my-4">
                <Link to="create">
                    <button className="btn btn-primary">Create</button>
                </Link>
                <div className="my-3">
                    <p className="mb-1 fw-bold">List of Penerbangan</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Asal</th>
                                <th scope="col">Tujuan</th>
                                <th scope="col">Waktu Berangkat</th>
                                <th scope="col">Waktu Sampai</th>
                                <th scope="col">Maskapai</th>
                                <th scope="col">Tipe Pesawat</th>
                                <th scope="col">Kelas</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {penerbangan.map((flight) => (
                                <tr key={flight.id}>
                                    <th scope="row">{flight.id}</th>
                                    <td>{flight.bandara_asal.nama_bandara}</td>
                                    <td>{flight.bandara_tujuan.nama_bandara}</td>
                                    <td>{flight.waktu_berangkat}</td>
                                    <td>{flight.waktu_sampai}</td>
                                    <td>{flight.maskapai}</td>
                                    <td>{flight.tipe_pesawat}</td>
                                    <td>
                                        <Link
                                            to={`kelas/${flight.id}`}
                                            className="btn bg-secondary-subtle text-decoration-none py-0"
                                        >
                                            Lihat
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`edit/${flight.id}`}
                                            className="btn bg-warning-subtle text-decoration-none py-0"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn bg-danger-subtle text-decoration-none py-0"
                                            onClick={handleDelete(flight.id)}
                                        >
                                            Delete
                                        </button>
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
