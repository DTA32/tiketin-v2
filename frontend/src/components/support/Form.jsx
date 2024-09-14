import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Form() {
    const [id, setId] = useState(0);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.search !== "") {
            setId(new URLSearchParams(location.search).get("order_id"));
        }
    }, [location.search]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subject === "" || message === "") {
            alert("Subject dan Message tidak boleh kosong!");
            return;
        }
        const data = {
            order_id: id,
            subject: subject,
            message: message,
        };
        try {
            const res = await axios.post(apiUrl + "/support/create", data);
            if (res.data.status === 200) {
                navigate("success");
            } else {
                alert("Support gagal dikirim!");
            }
        } catch (error) {
            console.log(error);
            alert("Support gagal dikirim!");
        }
    };
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-12">
                    <h1 className="text-center">Support</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className={`form-group ${id == 0 && "d-none"}`}>
                            <label htmlFor="id">ID Pemesanan</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                disabled
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                placeholder="Message"
                                rows="3"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary my-3">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
