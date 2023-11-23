import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlaneDeparture,
    faPlaneArrival,
    faArrowRightArrowLeft,
    faUserFriends,
    faCouch,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
    const [dari, setDari] = useState("");
    const [ke, setKe] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [penumpang, setPenumpang] = useState("1");
    const [kelas, setKelas] = useState("1");
    const [towns, setTowns] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchKota = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/bandara/getKota");
                setTowns(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchKota();
    }, []);
    const swapTown = () => {
        const temp = dari;
        setDari(ke);
        setKe(temp);
    };
    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {
            dari: dari,
            ke: ke,
            tanggal: tanggal,
            penumpang: penumpang,
            kelas: kelas,
        };
        if (dari === ke) {
            setError("Kota asal dan tujuan tidak boleh sama");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post("http://127.0.0.1:8000/api/penerbangan/search", data);
            if (res.data.status === "404") {
                setError("Penerbangan tidak ditemukan");
            } else if (res.data.status === "400") {
                setError("Harap isi semua kolom");
            } else {
                navigate("/search", { state: { data: res.data.data, penumpang: data.penumpang, kelas: data.kelas } });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="search-box mb-3">
            <div className="form-box container">
                <form onSubmit={formSubmit}>
                    <div className="d-flex">
                        <div className="w-75">
                            <div className="mb-2 row">
                                <label htmlFor="dari">Dari</label>
                                <div className="input-text-div ms-2 px-0 d-flex gap-2">
                                    <FontAwesomeIcon icon={faPlaneDeparture} />
                                    <select
                                        name="dari"
                                        id="dari"
                                        className="input-text select2 w-100"
                                        autoComplete="off"
                                        required
                                        value={dari}
                                        onChange={(e) => setDari(e.target.value)}
                                    >
                                        <option selected disabled></option>
                                        {towns.map((item) => (
                                            <option key={item.kota} value={item.kota}>
                                                {item.kota}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-2 row">
                                <label htmlFor="ke">Ke</label>
                                <div className="input-text-div ms-2 px-0 d-flex gap-2">
                                    <FontAwesomeIcon icon={faPlaneArrival} />
                                    <select
                                        name="ke"
                                        id="ke"
                                        className="input-text select2 w-100"
                                        autoComplete="off"
                                        required
                                        value={ke}
                                        onChange={(e) => setKe(e.target.value)}
                                    >
                                        <option selected disabled></option>
                                        {towns.map((item) => (
                                            <option key={item.kota} value={item.kota}>
                                                {item.kota}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-25 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon
                                icon={faArrowRightArrowLeft}
                                rotation={90}
                                size="xl"
                                style={{ cursor: "pointer" }}
                                className="rounded-circle border border-black p-2"
                                onClick={swapTown}
                            />
                        </div>
                    </div>
                    <div className="mb-2 row d-flex w-100">
                        <label htmlFor="tanggal">Tanggal Keberangkatan</label>
                        <input
                            type="date"
                            name="tanggal"
                            id="tanggal"
                            className="input-other ms-2 ps-1 pe-0"
                            required
                            onChange={(e) => setTanggal(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="penumpang">Penumpang</label>
                                <br />
                                <div className="input-text-div d-flex gap-2">
                                    <FontAwesomeIcon icon={faUserFriends} />
                                    <select
                                        name="penumpang"
                                        id="penumpang"
                                        className="input-text pe-0 w-100"
                                        required
                                        onChange={(e) => setPenumpang(e.target.value)}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <label htmlFor="kelas">Kelas</label>
                                <br />
                                <div className="input-text-div d-flex gap-2">
                                    <FontAwesomeIcon icon={faCouch} />
                                    <select
                                        name="kelas"
                                        id="kelas"
                                        className="input-text ps-0 w-100"
                                        required
                                        onChange={(e) => setKelas(e.target.value)}
                                    >
                                        <option value="1">Ekonomi</option>
                                        <option value="2">Bisnis</option>
                                        <option value="3">First</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`button w-100 ${loading ? "bg-secondary" : ""}`}
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faSearch} className="me-2" />
                            Cari
                        </button>
                    </div>
                </form>
            </div>
            {error && <p className="text-danger text-center py-1">{error}</p>}
        </div>
    );
}
