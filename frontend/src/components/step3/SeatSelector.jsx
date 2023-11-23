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
        const res = await axios.get(
          "http://127.0.0.1:8000/api/kelasPenerbangan/getDetail/" + kelas_id
        );
        if (res.data.status === "404") {
          setError(true);
        } else {
          setFlightClass(res.data.data);
          setSeatLayout(JSON.parse(res.data.data.seat_layout));
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };
    fetchFlightClass();
  }, [kelas_id]);

  if (loading || seatLayout.rows === undefined) {
    return (
      <div className="fs-5 text-center mt-2">
        <p className="mb-0">Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="fs-5 text-center text-danger mt-2">
        <p className="mb-0">Error fetching data!</p>
      </div>
    );
  }

  const handleSeatSelection = (e) => {
    const column =
      e.target.innerText.length === 3
        ? e.target.innerText[2].charCodeAt(0) - "A".charCodeAt(0)
        : e.target.innerText[1].charCodeAt(0) - "A".charCodeAt(0);
    if (seatLayout.rows[e.target.innerText[0] - 1].seats[column].available) {
      let temp = passenger;
      temp[selectedPassenger].kursi = e.target.innerText;
      setPassenger(temp);
      setSelectedSeat(e.target.innerText);
    }
    console.log(seatLayout);
  };
  const handlePassengerChange = (e) => {
    if (selectedSeat != "") {
      const column =
        passenger[selectedPassenger].kursi.length === 3
          ? passenger[selectedPassenger].kursi[2].charCodeAt(0) -
            "A".charCodeAt(0)
          : passenger[selectedPassenger].kursi[1].charCodeAt(0) -
            "A".charCodeAt(0);
      let temp = seatLayout;
      temp.rows[selectedSeat[0] - 1].seats[column].available = false;
      setSeatLayout(temp);
    }
    setSelectedPassenger(e.target.value);
    if (passenger[e.target.value].kursi != undefined) {
      const column =
        passenger[e.target.value].kursi.length === 3
          ? passenger[e.target.value].kursi[2].charCodeAt(0) - "A".charCodeAt(0)
          : passenger[e.target.value].kursi[1].charCodeAt(0) -
            "A".charCodeAt(0);
      let temp = seatLayout;
      temp.rows[passenger[e.target.value].kursi[0] - 1].seats[
        column
      ].available = true;
      setSeatLayout(temp);
      setSelectedSeat(passenger[e.target.value].kursi);
    } else {
      setSelectedSeat("");
    }
    console.log(seatLayout);
  };
  const handleSubmit = () => {
    for (const penumpang of passenger) {
      if (penumpang.kursi === undefined) {
        setValidation("Ada penumpang yang belum memilih kursi");
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
              Penumpang {key + 1} - {penumpang.nama_lengkap} - Kursi{" "}
              {penumpang.kursi}
            </option>
          ))}
        </select>
      </div>
      {validation && (
        <div className="text-center text-danger my-2">{validation}</div>
      )}
      <div className="border border-secondary-subtle my-1 pt-2 pb-5 px-3 bg-white">
        <p className="text-center fs-5 mb-4">
          {flightClass.penerbangan.maskapai} -{" "}
          {flightClass.penerbangan.tipe_pesawat} -{" "}
          {flightClass.tipe_kelas == 1
            ? "Ekonomi"
            : flightClass.tipe_kelas == 2
            ? "Bisnis"
            : "First"}
        </p>
        <div>
          <div className="seat-layout px-4">
            {seatLayout.rows.map((row, key) => (
              <div className="seat-row row mb-3" key={key}>
                {row.seats.map((seat, key) => (
                  <React.Fragment key={key}>
                    {key === seatLayout.max_columns_on_aisle && (
                      <span className="row-number col text-center">
                        {row.row_number}
                      </span>
                    )}
                    <span className="seat col text-center">
                      <span
                        className={`seat-number text-center border border-black ${
                          selectedSeat == seat.seat_number &&
                          "bg-success text-white"
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
