import { useLocation } from "react-router-dom";
import SeatSelector from "../components/step3/SeatSelector";
import PropTypes from "prop-types";

export default function Step3() {
    const location = useLocation();
    const props = location.state != undefined ? location.state : { kelas_id: 0, penumpang: {} };
    return (
        <div>
            <SeatSelector kelas_id={props.kelas_id} penumpang={props.penumpang} />
        </div>
    );
}

Step3.propTypes = {
    kelas_id: PropTypes.number,
    penumpang: PropTypes.number,
};
