import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="mx-1 my-2 px-2">
            <p className="mb-0 mt-2">Welcome, Guest!</p>
            <p>Start managing TIKETIN by accessing menu on navbar</p>
            <span className="mb-0">You can also check the user interface using this account by accessing </span>
            <span>
                <Link to="/" className="mb-0">
                    this page
                </Link>
            </span>
            <p>(Go to settings to return to this page)</p>
        </div>
    );
}
