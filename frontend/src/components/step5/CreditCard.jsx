import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreditCard() {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [CVV, setCVV] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const handleBayar = async () => {
        if (cardNumber === "" || expiryDate === "" || CVV === "") {
            alert("Mohon isi semua data kartu kredit/debit terlebih dahulu!");
        } else {
            const data = {
                id: id,
                metode_pembayaran: 1,
                referensi_pembayaran: "CARD-" + cardNumber.slice(-4),
            };
            try {
                const res = await axios.put("http://127.0.0.1:8000/api/pemesanan/pay/" + id, data);
                if (res.data.status === "404") {
                    alert("Pemesanan tidak ditemukan!");
                } else if (res.data.status === "400") {
                    alert("Pembayaran gagal! Bad Request");
                } else if (res.data.status === "200") {
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <div className="border border-secondary-subtle my-2 py-4 px-3 bg-white">
            <p className="text-center fs-4 mb-0">Kartu Kredit/Debit</p>
            <div>
                <div className="container mt-4">
                    <div className="row mb-2">
                        <div className="col-6 d-flex flex-column">
                            <label htmlFor="nomorKartu">Nomor Kartu</label>
                            <input
                                type="text"
                                name="nomorKartu"
                                id="nomorKartu"
                                className="input-other"
                                maxLength={16}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col d-flex flex-column">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                id="expiryDate"
                                className="input-other"
                                maxLength={5}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </div>
                        <div className="col d-flex flex-column">
                            <label htmlFor="CVV">CVV</label>
                            <input
                                type="text"
                                name="CVV"
                                id="CVV"
                                className="input-other"
                                maxLength={3}
                                onChange={(e) => setCVV(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <button
                        type="submit"
                        className="button text-center"
                        style={{ maxWidth: 240, width: "100%" }}
                        onClick={handleBayar}
                    >
                        Bayar
                    </button>
                </div>
            </div>
        </div>
    );
}
