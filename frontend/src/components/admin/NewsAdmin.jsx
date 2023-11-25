import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NewsAdmin() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin/news/getAll")
            .then((response) => {
                setNews(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8000/api/admin/news/delete/${id}`)
            .then((response) => {
                console.log(response);
                axios
                    .get("http://localhost:8000/api/admin/news/getAll")
                    .then((response) => {
                        setNews(response.data);
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
            <p className="text-center fw-bold fs-4 my-1">News</p>
            <div className="container my-4">
                <Link to="create">
                    <button className="btn btn-primary">Create</button>
                </Link>
                <div className="my-3">
                    <p className="mb-1 fw-bold">Daftar News</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Content</th>
                                <th scope="col">Image</th>
                                <th scope="col">Date Created</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((newsItem) => (
                                <tr key={newsItem.id}>
                                    <th scope="row"> {newsItem.id} </th>
                                    <td> {newsItem.title} </td>
                                    <td> {newsItem.author} </td>
                                    <td> {newsItem.content} </td>
                                    <td>
                                        <img
                                            src={`http://127.0.0.1:8000/images/news/${newsItem.id}.jpg`}
                                            style={{ width: 80 }}
                                        />
                                    </td>
                                    <td> {newsItem.created_at} </td>
                                    <td>
                                        <Link
                                            to={`edit/${newsItem.id}`}
                                            className="btn bg-warning-subtle text-decoration-none py-0"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="btn bg-danger-subtle text-decoration-none py-0"
                                            onClick={handleDelete(newsItem.id)}
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
