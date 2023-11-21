import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlaneDeparture, faPlaneArrival, faArrowRightArrowLeft, faUserFriends, faCouch, faSearch} from '@fortawesome/free-solid-svg-icons';

export default function SearchBox() {
    return(
        <div className="search-box mb-3">
          <div className="form-box container">
            <form method="GET" action="{{ route('step1') }}">
              <div className="d-flex">
                <div className="w-75">
                  <div className="mb-2 row">
                    <label htmlFor="dari">Dari</label>
                    <div className="input-text-div ms-2 px-0 d-flex gap-2">
                      <FontAwesomeIcon icon={faPlaneDeparture} />
                      <select
                        name="dari"
                        id="dari"
                        className="input-text select2 w-100"
                        autoComplete="off"
                        required
                      >
                        <option></option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2 row">
                    <label htmlFor="ke">Ke</label>
                    <div className="input-text-div ms-2 px-0 d-flex gap-2">
                      <FontAwesomeIcon icon={faPlaneArrival} />
                      <select
                        name="ke"
                        id="ke"
                        className="input-text select2 w-100"
                        autoComplete="off"
                        required
                      >
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-25 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} rotation={90} size="xl" style={{cursor: "pointer"}} className='rounded-circle border border-black p-2'/>
                </div>
              </div>
              <div className="mb-2 row d-flex w-100">
                <label htmlFor="tanggal">Tanggal Keberangkatan</label>
                <input
                  type="date"
                  name="tanggal"
                  id="tanggal"
                  className="input-other ms-2 ps-1 pe-0"
                  required
                  min="{{ date('Y-m-d') }}"
                />
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label htmlFor="penumpang">Penumpang</label>
                    <br />
                    <div className="input-text-div d-flex gap-2">
                        <FontAwesomeIcon icon={faUserFriends} />
                      <select
                        name="penumpang"
                        id="penumpang"
                        className="input-text pe-0 w-100"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="kelas">Kelas</label>
                    <br />
                    <div className="input-text-div d-flex gap-2" >
                      <FontAwesomeIcon icon={faCouch} />
                      <select
                        name="kelas"
                        id="kelas"
                        className="input-text ps-0 w-100"
                      >
                        <option value="1">Ekonomi</option>
                        <option value="2">Bisnis</option>
                        <option value="3">First</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="button w-100"
                >
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                  Cari
                </button>
              </div>
            </form>
          </div>
          {/* <p className="text-center text-success">{{ Session::pull('success') }}</p>
                <p className="text-center text-danger">{{ Session::pull('error') }}</p> */}
        </div>
    )
}