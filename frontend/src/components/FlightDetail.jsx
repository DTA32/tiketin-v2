import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO, intervalToDuration } from "date-fns";
import PropTypes from "prop-types";

export default function FlightDetail({ data }) {
    return (
        <div>
            <p className="fs-5 mt-3 ps-3 mb-2">Penerbangan</p>
            <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">
                <div className="d-flex justify-content-between">
                    <p className="mb-0">{data.penerbangan.maskapai}</p>
                    <p className="mb-0">{data.penerbangan.tipe_pesawat}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p style={{ fontSize: 12 }}>ID: {data.penerbangan.id}</p>
                    <p>{data.tipe_kelas == 1 ? "Ekonomi" : data.tipe_kelas == 2 ? "Bisnis" : "First"}</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="mb-0">{format(parseISO(data.penerbangan.waktu_berangkat), "EEEE, d LLLL Y")}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="mb-0">{format(parseISO(data.penerbangan.waktu_berangkat), "HH:mm")}</p>
                    <p className="mb-0 d-flex justify-content-center align-items-end" style={{ fontSize: 12 }}>
                        {
                            intervalToDuration({
                                start: parseISO(data.penerbangan.waktu_berangkat),
                                end: parseISO(data.penerbangan.waktu_sampai),
                            }).hours
                        }
                        j{" "}
                        {
                            intervalToDuration({
                                start: parseISO(data.penerbangan.waktu_berangkat),
                                end: parseISO(data.penerbangan.waktu_sampai),
                            }).minutes
                        }
                        m
                    </p>
                    <p className="mb-0">{format(parseISO(data.penerbangan.waktu_sampai), "HH:mm")}</p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="text-center mb-0" style={{ fontSize: 14 }}>
                                {data.penerbangan.bandara_asal.kota} ({data.penerbangan.bandara_asal.kode_bandara})
                            </p>
                        </div>
                        <div className="col">
                            <p className="text-center mb-0" style={{ fontSize: 14 }}>
                                {data.penerbangan.bandara_tujuan.kota} ({data.penerbangan.bandara_tujuan.kode_bandara})
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="text-center" style={{ fontSize: 14 }}>
                                {data.penerbangan.bandara_asal.nama_bandara}
                            </p>
                        </div>
                        <div className="col">
                            <p className="text-center" style={{ fontSize: 14 }}>
                                {data.penerbangan.bandara_tujuan.nama_bandara}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

FlightDetail.propTypes = {
    data: PropTypes.object,
};
