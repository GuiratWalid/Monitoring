import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const UseCaseCount = () => {
    const [data, setData] = useState([]);
    const [mail, setMail] = useState('');
    const [countMail, setCountMail] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const { darkMode } = useContext(modeContext);
    const style = (dark, light) => !darkMode ? dark : light;
    const style2 = darkMode ?
        { backgroundColor: "rgb(57,58,61)", color: "#fff" } :
        { backgroundColor: "#fff", color: "#000" };
    const setBg = (event, dark, light) => {
        event.target.style.backgroundColor = `${darkMode ? dark : light}`;
    }
    useEffect(() => {
        Axios
            .get("http://localhost:5000/useCaseTypeAllUsers")
            .then(response => {
                let data = response.data.map(item => {
                    var sum = 0;
                    Object.keys(item).forEach(key => {
                        if (key !== "mail")
                            sum += item[key]
                    })
                    return ({ ...item, sum: sum });
                });
                setData(data);
            })
            .catch(err => console.error(err));
    }, []);
    const onChangeHandler = event => {
        setMail(event.target.value);
        if (countMail !== -1)
            setCountMail(-1);
    }
    let lastPage = 1;
    lastPage = countMail === -1 ? 1 :
        data.length % countMail === 0 ?
            Number.parseInt(data.length / countMail) :
            Number.parseInt(data.length / countMail) + 1;
    if (currentPage > lastPage && lastPage !== 0)
        setCurrentPage(lastPage);
    const index = data.map(item => { return item.mail }).map(x => x.indexOf(mail)).some(i => i > -1);
    return (
        <div className="card rounded" style={style2}>
            <div className="card-header rounded">
                <div className="input-group m-auto w-75 rounded">
                    <input type="search" className="form-control rounded-pill" placeholder="Search" aria-label="Search"
                        onChange={onChangeHandler} aria-describedby="search-addon" style={style2} />
                </div>
            </div>
            <div className="card-body rounded">
                <table className={`table table-striped m-0 ${darkMode ? "table-dark" : "table-white"}`}>
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Mail Address</th>
                            <th scope="col">Total Use Cases</th>
                            <th scope="col">Use Case Type</th>
                            <th scope="col">Use Case Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            index === false && mail !== '' ?
                                <tr>
                                    <td colSpan="5">Mail Not Found !!</td>
                                </tr>
                                : data.map((item, index) => {
                                    if (item.mail.indexOf(mail) !== -1 && ((index < countMail * (currentPage) && (index >= countMail * (currentPage - 1))) || countMail === -1))
                                        return (
                                            < tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{item.mail}</td>
                                                <td>{item.sum}</td>
                                                <td colSpan="2">
                                                    <table className={`table table-striped m-0 ${darkMode ? "table-dark" : "table-white"}`}>
                                                        <tbody>
                                                            {
                                                                Object.keys(item).map((key, i) => {
                                                                    if (key !== "mail" && key !== "sum")
                                                                        return (
                                                                            <tr key={i}>
                                                                                <td className="w-50">{key}</td>
                                                                                <td className="w-50">{item[key]}</td>
                                                                            </tr>

                                                                        )
                                                                    else return null;
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>)
                                    else return null;
                                })
                        }
                    </tbody>
                </table >
            </div>
            <div className="container card-footer">
                <div className="row">
                    <div className="Pages text-center col d-flex justify-content-center">
                        <button type="button" className={`btn ${style("btn-outline-dark", "btn-secondary")} m-1`}
                            onClick={() => setCurrentPage(1)}>
                            <i className="fas fa-fast-backward"></i>
                        </button>
                        <button type="button" className={`btn ${style("btn-outline-dark", "btn-secondary")} m-1`}
                            onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }}>
                            <i className="fas fa-step-backward"></i>
                        </button>
                        <input
                            type="text"
                            aria-label="Small"
                            className={`form-control m-1 text-center ${style("btn-outline-dark", "btn-secondary")}`}
                            style={{ height: "50px", width: "50px" }}
                            value={currentPage}
                            onDoubleClick={event => { event.target.value = '' }}
                            onBlur={event => { event.target.value = currentPage }}
                            onChange={event => {
                                if (event.target.value >= 1 && event.target.value <= lastPage)
                                    setCurrentPage(event.target.value)
                            }}
                        />
                        <button type="button" className={`btn ${style("btn-outline-dark", "btn-secondary")} m-1`}
                            onClick={() => { if (currentPage < lastPage) setCurrentPage(currentPage + 1) }}>
                            <i className="fas fa-step-forward"></i>
                        </button>
                        <button type="button" className={`btn ${style("btn-outline-dark", "btn-secondary")} m-1`}
                            onClick={() => setCurrentPage(lastPage)}>
                            <i className="fas fa-fast-forward"></i>
                        </button>
                    </div>
                    <div className="btn-group col">
                        <label htmlFor="mails" className="col-sm-2 col-form-label">Filter :</label>
                        <button type="button" id="mails" className={` btn btn-faded rounded dropdown-toggle m-1 h-75 ${style("btn-outline-white", "btn-secondary")}`}
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Display
                        </button>
                        <div className={`dropdown-menu dropdown-menu-right ${style("bg-white text-dark", "bg-secondary text-light")}`} id="menu">
                            {
                                [3, 10, 100, -1].map((item, index) =>
                                    <button
                                        key={index}
                                        className={`dropdown-item ${style("text-dark", "text-light")}`}
                                        type="button"
                                        onMouseEnter={event => setBg(event, "rgb(80,80,80)", "rgb(200,200,200)")}
                                        onMouseLeave={event => event.target.style.backgroundColor = document.getElementById("menu").style.background}
                                        onClick={() => setCountMail(item)}>{item === -1 ? "All " : item} Mails</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UseCaseCount;