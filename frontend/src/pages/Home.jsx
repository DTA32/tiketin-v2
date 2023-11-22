import Header from "../components/Header";
import SearchBox from "../components/home/SearchBox";
import Footer from "../components/Footer";
import NewsSlider from "../components/home/NewsSlider";

export default function Home() {
  return (
    <div>
      <Header />
      <div
        className="container overflow-x-hidden overflow-y-auto scrollbar"
        style={{ maxHeight: "80vh" }}
      >
        <div className="greeting mb-2 pb-1">
          <p className="fs-6 lh-sm mb-0">Halo, Guest!</p>
          <p className="fs-5 fw-bold lh-sm mb-0">Mau kemana?</p>
        </div>
        <SearchBox/>
        <NewsSlider/>
      </div>
      <Footer />
    </div>
  );
}
