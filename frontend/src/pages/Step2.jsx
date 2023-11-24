import FlightCard from "../components/step2/FlightCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export default function Step2() {
    const location = useLocation();
    const navigate = useNavigate();
    let props = location.state == null ? null : location.state.data;
    if (props === null) {
        props = {
            kelas_id: 0,
            penumpang: 0,
        };
    } else {
        props = {
            kelas_id: location.state.kelas_id,
            penumpang: parseInt(location.state.penumpang),
        };
    }
    const [error, setError] = useState("");
    const [penumpang, setPenumpang] = useState([{}]);
    const handleForm = (e, i) => {
        let temp = penumpang;
        temp[i] = {
            nama: e.target.value,
        };
        setPenumpang(temp);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < props.penumpang.length; index++) {
            if (penumpang[index].nama === "") {
                setError("Nama Lengkap tidak boleh kosong!");
                return;
            }
        }
        navigate("/order/seat", {
            state: { penumpang: penumpang, kelas_id: props.kelas_id },
        });
    };
    return (
        <div>
            <FlightCard kelas_id={props.kelas_id} />
            <div>
                <p className="fs-5 mt-3 ps-3">Detail Penumpang</p>
                <form onSubmit={handleSubmit}>
                    <div className="my-1 pt-2 pb-3 px-3 bg-white">
                        {[...Array(props.penumpang)].map((e, i) => (
                            <div className="mt-2 py-2" key={i}>
                                <p className="mb-2" style={{ fontSize: 18 }}>
                                    Penumpang {i + 1}
                                </p>
                                <div className="d-flex flex-column">
                                    <label htmlFor="nama[]">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="nama[]"
                                        id="nama[]"
                                        className="input-other w-75"
                                        required
                                        onChange={(e) => {
                                            handleForm(e, i);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                    <div className="text-center mt-5 pb-3">
                        <button className="button text-center w-50">Lanjutkan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Step2.propTypes = {
    kelas_id: PropTypes.number,
    penumpang: PropTypes.number,
};
