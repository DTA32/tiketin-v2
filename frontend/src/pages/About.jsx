import HeaderBack from "../components/HeaderBack";

export default function About() {
    return (
        <>
            <HeaderBack />
            <div className="bg-white text-center container" style={{ height: "100vh" }}>
                <div className="pt-5">
                    <img src="/images/logo.png" alt="" style={{ height: 128 }} />
                </div>
                <p className="fs-1 mt-4 fw-bold">TIKETIN</p>
                <p className="fs-5 px-5">
                    Aplikasi website sederhana pemesanan tiket pesawat yang dibuat untuk tugas akhir mata kuliah
                    Software Engineering
                </p>
                <p className="mt-5 mb-0">Made with</p>
                <span>😎🤓🥴😴</span>
                <br />
                <span>😱😭🤯😠</span>
                <br />
                <span>🤒🤢😑💀</span>
                <br />
                <span>❤️</span>
                <br />
                <span>by </span>
                <a className="text-black text-decoration-none" href="https://github.com/DTA32/">
                    DTA32
                </a>
            </div>
        </>
    );
}
