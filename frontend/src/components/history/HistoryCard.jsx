import { Link } from "react-router-dom";
import rupiah from "../../utils/converter";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

export default function HistoryCard({ p }) {
    return (
        <Link className="text-black text-decoration-none" to={`/history/${p.id}`}>
            <div className="border border-secondary-subtle my-1 py-2 px-3 bg-white container row">
                <div className="col">
                    <div className="row">
                        <p className="text-center">Booking ID: {p.id}</p>
                    </div>
                    <div className="row">
                        <p className="text-center fs-5" style={{ whiteSpace: "nowrap" }}>
                            {p.penerbangan.bandara_asal.kota} - {p.penerbangan.bandara_tujuan.kota}
                        </p>
                    </div>
                    <div className="row">
                        <p className="mb-0 text-center text-nowrap" style={{ fontSize: 14 }}>
                            {format(parseISO(p.penerbangan.waktu_berangkat), "E, d MMM")} |{" "}
                            {p.pemesanan_harga.kuantitas} pax |{" "}
                            {p.kelas_penerbangan.tipe_kelas == 1
                                ? "Ekonomi"
                                : p.kelas_penerbangan.tipe_kelas == 2
                                ? "Bisnis"
                                : "First"}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <div className="row h-50">
                        <p className="text-center">{rupiah(p.pemesanan_harga.total)}</p>
                    </div>
                    <div className="row h-50 d-flex align-items-center justify-content-center">
                        {p.status == 1 && (
                            <p
                                className="text-center mb-0 px-3 bg-success text-light rounded-pill"
                                style={{ maxWidth: 480 }}
                            >
                                Berhasil
                            </p>
                        )}
                        {p.status == 0 && (
                            <p
                                className="text-center mb-0 px-4 bg-danger text-light rounded-pill"
                                style={{ maxWidth: 480 }}
                            >
                                Gagal
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

HistoryCard.propTypes = {
    p: PropTypes.object,
};
