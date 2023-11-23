import rupiah from "../utils/converter";
import PropTypes from "prop-types";

export default function PriceDetail({ source, data, quantity }) {
    // source = 0 -> step 4 (no data from server)
    if (source === 0) {
        const total = data.harga * quantity + 10000;
        return (
            <div>
                <p className="fs-5 mt-3 ps-3 mb-2">Detail Harga</p>
                <div className="border border-secondary-subtle my-0 py-2 px-3 bg-white d-flex justify-content-between align-items-center ">
                    <p className="my-1">
                        {data.penerbangan.maskapai} ({quantity}x)
                    </p>
                    <p className="my-1">{rupiah(data.harga)}</p>
                </div>
                <div className="border border-secondary-subtle my-0 py-2 px-3 bg-white d-flex justify-content-between align-items-center ">
                    <p className="my-1">Biaya Layanan</p>
                    <p className="my-1">{rupiah(10000)}</p>
                </div>
                <div className="border border-secondary-subtle my-0 py-2 px-3 bg-white d-flex justify-content-between align-items-center ">
                    <p className="my-1">Total</p>
                    <p className="my-1">{rupiah(total)}</p>
                </div>
            </div>
        );
    }
    // source = 1 -> history detail (data from server)
    else if (source === 1) {
        return <></>;
    }
}

PriceDetail.propTypes = {
    source: PropTypes.number,
    data: PropTypes.object,
    quantity: PropTypes.number,
};
