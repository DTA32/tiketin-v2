import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

Header.propTypes = {
    data: PropTypes.object,
    penumpang: PropTypes.string,
    kelas: PropTypes.string,
};

export default function Header({ data, penumpang, kelas }) {
    let dataRes = data;
    if (dataRes === undefined) {
        dataRes = {
            kotaAsal: "Loading",
            kotaTujuan: "Loading",
            waktu: "2023-01-01T00:00:00.000000Z",
        };
    } else {
        dataRes = {
            kotaAsal: data.bandara_asal.kota,
            kotaTujuan: data.bandara_tujuan.kota,
            waktu: data.waktu_berangkat,
        };
    }
    return (
        <div className="header-container container text-center">
            <div className="row justify-content-center align-items-center w-100 h-100 mx-0">
                <div className="col-3">
                    <Link to={".."} className="text-black">
                        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
                    </Link>
                </div>
                <div className="col-6 px-0">
                    <div className="row">
                        <h4 className="text-center mb-0" style={{ whiteSpace: "nowrap" }}>
                            {dataRes.kotaAsal} - {dataRes.kotaTujuan}
                        </h4>
                    </div>
                    <div className="row">
                        <p className="text-center mb-0" style={{ fontSize: 12 }}>
                            {format(parseISO(dataRes.waktu), "E, d LLL")} | {penumpang} pax |{" "}
                            {kelas == 1 ? "Ekonomi" : kelas == 2 ? "Bisnis" : "First"}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" className="logo" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
