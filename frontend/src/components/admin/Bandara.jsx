import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Bandara() {
    const [bandara, setBandara] = useState([]);
    useEffect(() => {
        axios
            .get(apiUrl + "/admin/bandara/getAll")
            .then((response) => {
                setBandara(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleDelete = (id) => (e) => {
        e.preventDefault();
        axios
            .delete(`${apiUrl}/admin/bandara/delete/${id}`)
            .then((response) => {
                console.log(response);
                axios
                    .get(apiUrl + "/admin/bandara/getAll")
                    .then((response) => {
                        setBandara(response.data);
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
            <p className="text-center fw-bold fs-4 my-1">Bandara</p>
            <div className="container my-4">
                <Link to="create">
                    <button className="btn btn-primary">Create</button>
                </Link>
                <div className="my-3">
                    <p className="mb-1 fw-bold">Daftar Bandara</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Kode</th>
                                <th scope="col">Kota</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bandara.map((airport) => (
                                <tr key={bandara.id}>
                                    <th scope="row"> {airport.id} </th>
                                    <td> {airport.nama_bandara} </td>
                                    <td> {airport.kode_bandara} </td>
                                    <td> {airport.kota} </td>
                                    <td>
                                        <Link
                                            to={`edit/${airport.id}`}
                                            className="btn bg-warning-subtle text-decoration-none py-0"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn bg-danger-subtle text-decoration-none py-0"
                                            onClick={handleDelete(airport.id)}
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
