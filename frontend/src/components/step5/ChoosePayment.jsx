import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faBuildingColumns, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ChoosePayment() {
    const [metode, setMetode] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (metode === 0) {
            alert("Pilih metode pembayaran terlebih dahulu!");
        } else {
            navigate("/order/pay/" + id + "/" + metode);
        }
    };
    return (
        <>
            <p className="fs-5 mt-3 ps-3 mb-2">Metode Pembayaran</p>
            <div>
                <div className="bg-white">
                    <div
                        className={`labl w-100 ${metode == 1 && "bg-secondary-subtle"}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setMetode(1)}
                    >
                        <div className="border border-secondary-subtle my-0 py-2 px-3">
                            Kartu Kredit/Debit
                            <span className="ms-1">
                                <FontAwesomeIcon icon={faCreditCard} size="xl" />
                            </span>
                        </div>
                    </div>
                    <div
                        className={`labl w-100 ${metode == 2 && "bg-secondary-subtle"}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setMetode(2)}
                    >
                        <div className="border border-secondary-subtle my-0 py-2 px-3">
                            Virtual Account
                            <span className="ms-1">
                                <FontAwesomeIcon icon={faBuildingColumns} size="xl" />
                            </span>
                        </div>
                    </div>
                    <div
                        className={`labl w-100 ${metode == 3 && "bg-secondary-subtle"}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setMetode(3)}
                    >
                        <div className="border border-secondary-subtle my-0 py-2 px-3">
                            QRIS
                            <span className="ms-1">
                                <FontAwesomeIcon icon={faQrcode} size="xl" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5" onClick={handleSubmit}>
                    <button type="submit" className="button text-center" style={{ maxWidth: 240, width: "100%" }}>
                        Bayar
                    </button>
                </div>
            </div>
        </>
    );
}
