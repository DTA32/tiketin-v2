import PropTypes from "prop-types";

export default function PassengerList({ passengers }) {
    return (
        <div>
            <p className="fs-5 mt-3 ps-3 mb-2">Detail Penumpang</p>
            <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">
                {passengers.map((passenger, index) => (
                    <div className="mt-2 pb-2" key={index}>
                        <p className="mb-3" style={{ fontSize: 18 }}>
                            Penumpang {index + 1}
                        </p>
                        <p className="mb-0" style={{ fontSize: 14 }}>
                            Nama Lengkap:
                        </p>
                        <p className="mb-2">{passenger.nama}</p>
                        <p className="mb-0" style={{ fontSize: 14 }}>
                            No Kursi:
                        </p>
                        <p className="mb-2">{passenger.kursi_penerbangan}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

PassengerList.propTypes = {
    passengers: PropTypes.array,
};
