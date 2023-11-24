import HeaderBack from "../components/HeaderBack";

export default function Profile() {
    return (
        <div>
            <HeaderBack />
            <div className="search-box mt-1 py-3">
                <p className="text-center fw-bold fs-5">Profile</p>
                <div>
                    <div className="container">
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="nama" className="col">
                                Nama Lengkap:
                            </label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                className="col-7 input-text px-0 me-2"
                                autoComplete="off"
                                style={{ borderBottom: "1px solid #000000" }}
                            />
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="email" className="col">
                                Email:
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="col-7 input-text px-0 me-2"
                                autoComplete="off"
                                style={{ borderBottom: "1px solid #000000" }}
                            />
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="password" className="col">
                                Current Password:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="col-7 input-text px-0 me-2"
                                autoComplete="off"
                                style={{ borderBottom: "1px solid #000000" }}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="button my-4" style={{ width: 240 }}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="search-box mt-3 py-3">
                <p className="text-center fw-bold fs-5">Change Password</p>
                <div>
                    <div className="container">
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="current" className="col">
                                Current Password
                            </label>
                            <input
                                type="text"
                                name="current"
                                id="current"
                                className="col-7 input-text px-0 me-2"
                                autoComplete="off"
                                style={{ borderBottom: "1px solid #000000" }}
                            />
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label htmlFor="new" className="col">
                                New Password:
                            </label>
                            <input
                                type="text"
                                name="new"
                                id="new"
                                className="col-7 input-text px-0 me-2"
                                autoComplete="off"
                                style={{ borderBottom: "1px solid #000000" }}
                            />
                        </div>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="reenter" className="col">
                                Reenter New Password:
                            </label>
                            <input
                                type="password"
                                name="reenter"
                                id="reenter"
                                className="col-7 input-text px-0 me-2"
                                autoComplete="off"
                                style={{ borderBottom: "1px solid #000000" }}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="button my-4" style={{ width: 240 }}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
