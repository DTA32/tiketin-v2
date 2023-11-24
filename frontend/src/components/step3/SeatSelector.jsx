import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SeatSelector({ kelas_id, penumpang }) {
    const [passenger, setPassenger] = useState(penumpang);
    const [flightClass, setFlightClass] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [validation, setValidation] = useState("");
    const [selectedPassenger, setSelectedPassenger] = useState(0);
    const [selectedSeat, setSelectedSeat] = useState("");
    const [seatLayout, setSeatLayout] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlightClass = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/kelasPenerbangan/getDetail/" + kelas_id);
                if (res.data.status === "404") {
                    setError(true);
                } else {
                    setFlightClass(res.data.data);
                    setSeatLayout(JSON.parse(res.data.data.seat_layout));
                }
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchFlightClass();
    }, [kelas_id]);

    if (loading) {
        return (
            <div className="fs-5 text-center mt-2">
                <p className="mb-0">Loading...</p>
            </div>
        );
    }
    if (error || seatLayout.rows === undefined) {
        return (
            <div className="fs-5 text-center text-danger mt-2">
                <p className="mb-0">Error fetching data!</p>
            </div>
        );
    }

    const handleSeatSelection = (e) => {
        const row =
            (e.target.innerText.length > 2 ? e.target.innerText[0] + e.target.innerText[1] : e.target.innerText[0]) -
            parseInt(seatLayout.rows[0].row_number);
        const column =
            e.target.innerText.length > 2
                ? e.target.innerText[2].charCodeAt(0) - "A".charCodeAt(0)
                : e.target.innerText[1].charCodeAt(0) - "A".charCodeAt(0);
        if (seatLayout.rows[row].seats[column].available) {
            let temp = passenger;
            temp[selectedPassenger].kursi_penerbangan = e.target.innerText;
            setPassenger(temp);
            setSelectedSeat(e.target.innerText);
        }
    };
    const handlePassengerChange = (e) => {
        if (selectedSeat != "") {
            const row =
                (passenger[selectedPassenger].kursi_penerbangan.length > 2
                    ? passenger[selectedPassenger].kursi_penerbangan[0] +
                      passenger[selectedPassenger].kursi_penerbangan[1]
                    : passenger[selectedPassenger].kursi_penerbangan[0]) - parseInt(seatLayout.rows[0].row_number);
            const column =
                passenger[selectedPassenger].kursi_penerbangan.length > 2
                    ? passenger[selectedPassenger].kursi_penerbangan[2].charCodeAt(0) - "A".charCodeAt(0)
                    : passenger[selectedPassenger].kursi_penerbangan[1].charCodeAt(0) - "A".charCodeAt(0);
            let temp = seatLayout;
            temp.rows[row].seats[column].available = false;
            setSeatLayout(temp);
        }
        setSelectedPassenger(e.target.value);
        if (passenger[e.target.value].kursi_penerbangan != undefined) {
            const row =
                (passenger[e.target.value].kursi_penerbangan.length > 2
                    ? passenger[e.target.value].kursi_penerbangan[0] + passenger[e.target.value].kursi_penerbangan[1]
                    : passenger[e.target.value].kursi_penerbangan[0]) - parseInt(seatLayout.rows[0].row_number);
            const column =
                passenger[e.target.value].kursi_penerbangan.length > 2
                    ? passenger[e.target.value].kursi_penerbangan[2].charCodeAt(0) - "A".charCodeAt(0)
                    : passenger[e.target.value].kursi_penerbangan[1].charCodeAt(0) - "A".charCodeAt(0);

            let temp = seatLayout;
            temp.rows[row].seats[column].available = true;
            setSeatLayout(temp);
            setSelectedSeat(passenger[e.target.value].kursi_penerbangan);
        } else {
            setSelectedSeat("");
        }
    };
    const handleSubmit = () => {
        for (const penumpang of passenger) {
            if (penumpang.kursi_penerbangan === undefined) {
                setValidation("Ada penumpang yang belum memilih kursi_penerbangan");
                return;
            }
        }
        setValidation("");
        navigate("/order/review", {
            state: { kelas_id: kelas_id, penumpang: passenger },
        });
    };

    return (
        <div>
            <div className="fs-5 text-center mt-2">
                <p className="mb-0">Pilih Kursi</p>
            </div>
            <div className="border border-secondary-subtle my-0 px-2 bg-white d-flex justify-content-between align-items-center">
                <select
                    className="input-text form-select w-100"
                    value={selectedPassenger}
                    onChange={handlePassengerChange}
                >
                    {penumpang.map((penumpang, key) => (
                        <option value={key} key={key}>
                            Penumpang {key + 1} - {penumpang.nama} - Kursi {penumpang.kursi_penerbangan}
                        </option>
                    ))}
                </select>
            </div>
            <div className="border border-secondary-subtle my-1 pt-2 pb-5 px-3 bg-white">
                <p className="text-center fs-5 mb-4">
                    {flightClass.penerbangan.maskapai} - {flightClass.penerbangan.tipe_pesawat} -{" "}
                    {flightClass.tipe_kelas == 1 ? "Ekonomi" : flightClass.tipe_kelas == 2 ? "Bisnis" : "First"}
                </p>
                <div>
                    <div className="seat-layout px-4">
                        {seatLayout.rows.map((row, key) => (
                            <div className="seat-row row mb-3" key={key}>
                                {row.seats.map((seat, key) => (
                                    <React.Fragment key={key}>
                                        {key === seatLayout.max_columns_on_aisle && (
                                            <span className="row-number col text-center">{row.row_number}</span>
                                        )}
                                        <span className="seat col text-center">
                                            <span
                                                className={`seat-number text-center border border-black ${
                                                    selectedSeat == seat.seat_number && "bg-success text-white"
                                                }
                            ${!seat.available && "text-white bg-secondary"}
                        }`}
                                                style={{
                                                    display: "inline-block",
                                                    height: 30,
                                                    width: 30,
                                                    backgroundColor: "#FFFFFF",
                                                    cursor: "pointer",
                                                }}
                                                onClick={handleSeatSelection}
                                            >
                                                {seat.seat_number}
                                            </span>
                                        </span>
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border border-secondary-subtle my-2 pt-3 pb-4 px-3 bg-white">
                <p className="mb-3">Legenda</p>
                <div className="container">
                    <div className="row mb-2">
                        <div className="col d-flex align-items-center">
                            <div
                                className="border border-black bg-white"
                                style={{ display: "inline-block", height: 24, width: 24 }}
                            />
                            <span className="ps-2">Kursi tersedia</span>
                        </div>
                        <div className="col d-flex align-items-center">
                            <div
                                className="border border-black bg-secondary"
                                style={{
                                    display: "inline-block",
                                    height: 24,
                                    width: 24,
                                }}
                            />
                            <span className="ps-2" style={{ fontSize: 15 }}>
                                Kursi tidak tersedia
                            </span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col d-flex align-items-center">
                            <div
                                className="border border-black bg-success"
                                style={{
                                    display: "inline-block",
                                    height: 24,
                                    width: 24,
                                }}
                            />
                            <span className="ps-2">Kursi yang dipilih</span>
                        </div>
                    </div>
                </div>
            </div>
            {validation && <div className="text-center text-danger my-2">{validation}</div>}
            <div className="text-center mt-5 pb-3">
                <button
                    type="submit"
                    className="button text-center"
                    style={{ maxWidth: 240, width: "100%" }}
                    onClick={handleSubmit}
                >
                    Lanjutkan
                </button>
            </div>
        </div>
    );
}

SeatSelector.propTypes = {
    kelas_id: PropTypes.number,
    penumpang: PropTypes.array,
};
