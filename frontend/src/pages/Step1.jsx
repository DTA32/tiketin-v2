import Header from "../components/step1/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faArrowRightLong, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { useState, useEffect } from "react";
import rupiah from '../utils/converter';
import { format, parseISO, intervalToDuration } from "date-fns";

export default function Step1() {
    const [results, setResults] = useState([]);
    const location = useLocation();
    console.log(location.state);
    useEffect(() => {
        const data = location.state.data;
        setResults(data);
    }, [location.state]);      
    return (
        <>
        <Header data={results[0]} penumpang={location.state.penumpang} kelas={location.state.kelas}/>
        <div>
            <div>
            <div
                className="progress mt-1"
                role="progressbar"
                aria-label="Progress"
                aria-valuenow={0}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                className="progress-bar bg-secondary"
                style={{ width: "17%" }}
                />
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
            <div className="container row mt-1 py-1 mx-0 border border-secondary-subtle bg-white">
            <div
                className="col border-end border-secondary-subtle d-flex justify-content-center align-items-center"
                id="filterButton"
                style={{ cursor: "pointer" }}
            >
                <FontAwesomeIcon icon={faFilter} size="lg" />
                <p className="ps-2 fs-5 mb-0">Filter</p>
            </div>
            <div
                className="col d-flex justify-content-center align-items-center"
                id="sortButton"
                style={{ cursor: "pointer" }}
            >
                <FontAwesomeIcon icon={faSort} size="lg" />
                <p className="ps-2 text-center fs-5 mb-0">Sort</p>
            </div>
            </div>
            <p
            className="text-success text-center mt-1 mb-0"
            id="statusText"
            style={{ display: "none" }}
            />
            <div className="mt-2 overflow-y-auto scrollbar" id="cardGroup">
                {results.length === 0 && (
                    <div className="text-center">
                        <p className="fs-4">Loading...</p>
                        <p className="fs-6">If data not showing after a while, please refresh or search again</p>
                    </div>
                )}
                {results.map((result) => (
                    <Link
                        className="text-black text-decoration-none"
                        id=""
                        to="/step2" 
                        state={{kelas_id: result.kelas_penerbangan[0].id, penumpang: location.state.penumpang}}
                        key={result.id}
                    >
                        <div className="border border-secondary-subtle my-1 pt-2 pb-3 px-3 bg-white">
                        <div className="container">
                            <div className="row">
                            <div className="col">
                                <p className="fs-5" id="">
                                {result.maskapai}
                                </p>
                                <div className="row text-center">
                                <p className="fs-6 col mb-0">{format(parseISO(result.waktu_berangkat), 'HH:mm')}</p>
                                <p
                                    className="col mb-0 d-flex justify-content-center align-items-end"
                                    style={{ fontSize: 12 }}
                                >
                                    {intervalToDuration({start: parseISO(result.waktu_berangkat),end: parseISO(result.waktu_sampai),}).hours}j{" "}
                                    {intervalToDuration({start: parseISO(result.waktu_berangkat),end: parseISO(result.waktu_sampai),}).minutes}m
                                </p>
                                <p className="fs-6 col mb-0">{format(parseISO(result.waktu_sampai), 'HH:mm')}</p>
                                </div>
                                <div className="row text-center">
                                <p className="fs-6 col" style={{ fontSize: 14 }}>
                                    {result.bandara_asal.kode_bandara}
                                </p>
                                <FontAwesomeIcon icon={faArrowRightLong} className="col"/>
                                <p className="fs-6 col" style={{ fontSize: 14 }}>
                                    {result.bandara_tujuan.kode_bandara}
                                </p>
                                </div>
                                <div className="row">
                                <p className="fs-5" >{rupiah(result.kelas_penerbangan[0].harga)}</p>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-end align-items-center">
                                <FontAwesomeIcon icon={faChevronRight} size="2xl" className="border p-2 rounded bg-secondary-subtle"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </>
    );
}
