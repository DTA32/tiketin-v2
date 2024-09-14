import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import rupiah from "../../utils/converter";

const apiUrl = import.meta.env.VITE_API_URL;

export default function KelasPenerbangan() {
    const { id } = useParams();
    const [kelasPenerbangan, setKelasPenerbangan] = useState([]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/admin/kelasPenerbangan/getByPen/${id}`)
            .then((response) => {
                setKelasPenerbangan(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleDelete = (kelasId) => (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8000/api/admin/kelasPenerbangan/delete/${kelasId}`)
            .then((response) => {
                axios
                    .get(`http://localhost:8000/api/admin/kelasPenerbangan/getByPen/${id}`)
                    .then((response) => {
                        setKelasPenerbangan(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    console.log(kelasPenerbangan);

    return (
        <div className="p-4">
            <p className="text-center fw-bold fs-4 my-1">Kelas Penerbangan</p>
            <div className="container my-4">
                <Link to="create">
                    <button className="btn btn-primary">Create</button>
                </Link>
                <div className="my-3">
                    <p className="mb-1 fw-bold">List of Kelas Penerbangan</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tipe Kelas</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Jumlah Kursi</th>
                                <th scope="col">Seat Layout</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelasPenerbangan.map((kelas) => (
                                <tr key={kelas.id}>
                                    <th scope="row">{kelas.id}</th>
                                    <td>
                                        {kelas.tipe_kelas == 1
                                            ? "Ekonomi"
                                            : kelas.tipe_kelas == 2
                                            ? "Bisnis"
                                            : kelas.tipe_kelas == 3
                                            ? "First"
                                            : "Error/Unlisted"}
                                    </td>
                                    <td>{rupiah(kelas.harga)}</td>
                                    <td>{kelas.jumlah_kursi}</td>
                                    <td>
                                        <Link to={`seatLayout/${kelas.id}`}>
                                            <button className="btn bg-primary-subtle text-decoration-none py-0">
                                                Lihat
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`edit/${kelas.id}`}>
                                            <button className="btn bg-warning-subtle text-decoration-none py-0">
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn bg-danger-subtle text-decoration-none py-0"
                                            onClick={handleDelete(kelas.id)}
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
