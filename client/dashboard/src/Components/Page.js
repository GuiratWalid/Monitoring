import React, { useState, useContext } from 'react';
import LastDays from './Charts/LastDays';
import LastHours from './Charts/LastHours';
import LastMonths from './Charts/LastMonths';
import { modeContext } from '../Context/ModeContext.js';

const Page = props => {
    const [display, setDisplay] = useState("h");
    const { darkMode } = useContext(modeContext);
    const style = (dark, light) => darkMode ? light : dark;
    const style2 = darkMode ?
        { backgroundColor: "rgb(57,58,61)", color: "#fff", width: "97%" } :
        { backgroundColor: "#fff", color: "#000", width: "97%" };
    const setBg = (event, dark, light) => {
        event.target.style.backgroundColor = `${darkMode ? dark : light}`;
    }
    return (
        <div className="card mx-3" style={style2}>
            <div className="card-header d-flex justify-content-center" >
                <div className="btn-group w-50">
                    <label htmlFor="filter" className="col-sm-2 col-form-label">Filter :</label>
                    <button type="button" id="filter"
                        className={`btn btn-faded dropdown-toggle h-75 m-1  rounded ${style("btn-outline-white", "btn-secondary")}`}
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Visitor
                    </button>
                    <div className={`dropdown-menu dropdown-menu-right ${style("bg-white text-dark", "bg-secondary text-light")}`} id="menu">
                        {
                            ["h", "d", "y"].map((item, index) =>
                                <button
                                    key={index}
                                    onMouseEnter={event => setBg(event, "rgb(80,80,80)", "rgb(200,200,200)")}
                                    onMouseLeave={event => event.target.style.backgroundColor = document.getElementById("menu").style.background}
                                    className={`dropdown-item ${style("text-dark", "text-light")}`}
                                    type="button"
                                    onClick={() => setDisplay(item)}>
                                    Last {item === "h" ? " 24 Hours" : item === "d" ? " 30 Days" : "12 Months"}
                                </button>)
                        }
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                {display === "h" ? <LastHours type={props.type} /> :
                    display === "d" ? < LastDays type={props.type} /> :
                        <LastMonths type={props.type} />}
            </div>
        </div >
    );
}

export default Page;