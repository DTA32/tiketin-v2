import FlightDetail from "../components/FlightDetail";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PassengerList from "../components/PassengerList";
import PropTypes from "prop-types";
import PriceDetail from "../components/PriceDetail";
import { useNavigate } from "react-router-dom";

export default function Step4() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    let props = location.state == null ? null : location.state.data;
    if (props === null) {
        props = {
            kelas_id: 0,
            penumpang: {},
        };
    } else {
        props = {
            kelas_id: location.state.kelas_id,
            penumpang: location.state.penumpang,
        };
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/kelasPenerbangan/getDetail/" + props.kelas_id);
                if (res.data.status === "404") {
                    setError("404 Not Found");
                } else {
                    setData(res.data.data);
                }
            } catch (error) {
                console.log(error);
                setError("Error: " + error);
            }
            setLoading(false);
        };
        fetchData();
    }, [props.kelas_id]);
    if (error) {
        return (
            <div className="text-danger mt-1 fs-4 text-center">
                <p>Error! {error}</p>
            </div>
        );
    }
    if (loading) {
        return (
            <div className="fs-4 text-center mt-1">
                <p>Loading...</p>
            </div>
        );
    }
    const placeOrder = async () => {
        const data = {
            kelas_id: props.kelas_id,
            penumpang: props.penumpang,
        };
        try {
            setSubmitting(true);
            const res = await axios.post("http://127.0.0.1:8000/api/pemesanan/create", data);
            if (res.data.status === "400") {
                setError("Gagal membuat order, harap coba lagi");
            } else {
                navigate("/order/pay/" + res.data.data.id);
            }
            setSubmitting(false);
        } catch (error) {
            console.log(error);
            setError("Error: " + error);
        }
    };
    return (
        <div className="pb-5">
            <div className="fs-5 text-center mt-1">
                <p>Ringkasan Pemesanan</p>
            </div>
            <FlightDetail data={data} source={0} />
            <PassengerList passengers={props.penumpang} />
            <PriceDetail source={0} data={data} quantity={props.penumpang.length} />
            <div className="text-center mt-5 pb-3">
                <button
                    type="submit"
                    className={`button text-center ${submitting && "bg-secondary-subtle"}`}
                    style={{ maxWidth: "240px", width: "100%" }}
                    onClick={placeOrder}
                    disabled={submitting}
                >
                    Pesan
                </button>
            </div>
        </div>
    );
}

Step4.propTypes = {
    penumpang: PropTypes.string,
    kelas_id: PropTypes.number,
};
