import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO, intervalToDuration } from "date-fns";
import PropTypes from "prop-types";

const apiUrl = import.meta.env.VITE_API_URL;

export default function FlightCard({ kelas_id }) {
    const [flightClass, setFlightClass] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchFlightClass = async () => {
            try {
                const res = await axios.get(apiUrl + "/kelasPenerbangan/getDetail/" + kelas_id);
                if (res.data.status === "404") {
                    setError(true);
                } else {
                    setFlightClass(res.data.data);
                }
            } catch (error) {
                console.log(error);
                setError(true);
            }
            setLoading(false);
        };
        fetchFlightClass();
    }, [kelas_id]);
    if (loading) {
        return (
            <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white" style={{ height: "150px" }}>
                <p className="text-center fs-5">Loading...</p>
            </div>
        );
    }
    if (flightClass == {} || error || kelas_id == 0) {
        return (
            <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white" style={{ height: "150px" }}>
                <p className="text-center fs-5 text-danger">Error!</p>
            </div>
        );
    }
    return (
        <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">
            <p className="fs-5 text-center">Penerbangan</p>
            <div className="container">
                <div className="row">
                    <div className="col d-flex justify-content-start align-items-center">
                        <p>{flightClass.penerbangan.maskapai}</p>
                    </div>
                    <div className="col">
                        <div className="row">
                            <p className="col text-center mb-0">
                                {format(parseISO(flightClass.penerbangan.waktu_berangkat), "E, d LLL")}
                            </p>
                        </div>
                        <div className="row text-center">
                            <p className="col mb-0">
                                {format(parseISO(flightClass.penerbangan.waktu_berangkat), "HH:mm")}
                            </p>
                            <p
                                className="col mb-0 d-flex justify-content-center align-items-end"
                                style={{ fontSize: 12 }}
                            >
                                {
                                    intervalToDuration({
                                        start: parseISO(flightClass.penerbangan.waktu_berangkat),
                                        end: parseISO(flightClass.penerbangan.waktu_sampai),
                                    }).hours
                                }
                                j{" "}
                                {
                                    intervalToDuration({
                                        start: parseISO(flightClass.penerbangan.waktu_berangkat),
                                        end: parseISO(flightClass.penerbangan.waktu_sampai),
                                    }).minutes
                                }
                                m
                            </p>
                            <p className="fs-6 col mb-0">
                                {format(parseISO(flightClass.penerbangan.waktu_sampai), "HH:mm")}
                            </p>
                        </div>
                        <div className="row text-center">
                            <p className="fs-6 col" style={{ fontSize: 14 }}>
                                {flightClass.penerbangan.bandara_asal.kode_bandara}
                            </p>
                            <FontAwesomeIcon icon={faArrowRightLong} className="col" size="xl" />
                            <p className="fs-6 col" style={{ fontSize: 14 }}>
                                {flightClass.penerbangan.bandara_tujuan.kode_bandara}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

FlightCard.propTypes = {
    kelas_id: PropTypes.number,
};
