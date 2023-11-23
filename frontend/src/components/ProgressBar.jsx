import PropTypes from "prop-types";

export default function ProgressBar({ step }) {
    const progress = [17, 34, 51, 68, 85];
    return (
        <div>
            <div
                className="progress mt-1"
                role="progressbar"
                aria-label="Progress"
                aria-valuenow={progress[step - 1]}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ height: "0.5rem" }}
            >
                <div className="progress-bar bg-secondary" style={{ width: `${progress[step - 1]}%` }} />
            </div>
            <div className="d-flex justify-content-between">
                <span style={{ fontSize: 10 }}> </span>
                <span style={{ fontSize: 10 }}>1</span>
                <span style={{ fontSize: 10 }}>2</span>
                <span style={{ fontSize: 10 }}>3</span>
                <span style={{ fontSize: 10 }}>4</span>
                <span style={{ fontSize: 10 }}>5</span>
                <span style={{ fontSize: 10 }}> </span>
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    step: PropTypes.number.isRequired,
};
