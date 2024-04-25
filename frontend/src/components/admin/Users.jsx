import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(apiUrl + "/admin/user/getAll")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => (e) => {
        e.preventDefault();
        axios
            .delete(`${apiUrl}/admin/user/delete/${id}`)
            .then((response) => {
                console.log(response);
                axios
                    .get(apiUrl + "/admin/user/getAll")
                    .then((response) => {
                        setUsers(response.data);
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
            <p className="text-center fw-bold fs-4 my-1">Users</p>
            <div className="container my-4">
                <Link to="create">
                    <button className="btn btn-primary">Create</button>
                </Link>
                <div className="my-3">
                    <p className="mb-1 fw-bold">List of Users</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row"> {user.id} </th>
                                    <td> {user.name} </td>
                                    <td> {user.email} </td>
                                    <td> {user.role == 0 ? "Admin" : "User"} </td>
                                    <td>
                                        <Link
                                            to={`edit/${user.id}`}
                                            className="btn bg-warning-subtle text-decoration-none py-0"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn bg-danger-subtle text-decoration-none py-0"
                                            onClick={handleDelete(user.id)}
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
