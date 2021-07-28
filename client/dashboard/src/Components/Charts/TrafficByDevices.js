import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const TrafficByDevices = () => {
    const [values, setValues] = useState([]);
    const { darkMode } = useContext(modeContext);
    const backgroundColor = !darkMode ? "#fff" : "rgb(57,58,61)";
    useEffect(() => {
        Axios.get(`http://localhost:5000/plateform`).then(
            response => {
                const sum = response.data.pcCount + response.data.telCount + response.data.tabletCount;
                const tab = [
                    {
                        name: "Desktop",
                        y: response.data.pcCount / sum * 100,
                        color: '#5cb85c',
                        sliced: true,
                        selected: true
                    }, {
                        name: "Tablet",
                        y: response.data.tabletCount / sum * 100,
                        color: '#17a2b8'
                    }, {
                        name: "Mobile",
                        y: response.data.telCount / sum * 100,
                        color: '#d9534f'
                    }
                ];
                setValues(tab);
            }
        );
    }, []);

    const options = {
        chart: {
            type: 'pie',
            backgroundColor: darkMode ? "rgb(57,58,61)" : "#fff",
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 6
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        title: {
            text: null
        },
        series: [
            {
                type: 'pie',
                colorByPoint: true,
                data: values
            },
        ],
        plotOptions: {
            pie: {
                shadow: true
            }
        }
    };

    return (
        <div className="container m-3 card" style={{ width: "97%", backgroundColor }}>
            < div className="row">
                <div className="col-sm-6">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div className="col-sm-6" style={{ backgroundColor }}>
                    <h3 className="text-warning mt-5 pb-5">Traffic By Devices</h3>
                    <table className="table table-sm mt-5 pt-5">
                        <tbody>
                            <tr>
                                <td><i className="fas fa-desktop icon2"></i></td>
                                <td><i className="fas fa-tablet icon2"></i></td>
                                <td><i className="fas fa-mobile icon2"></i></td>
                            </tr>
                            <tr className={`${darkMode ? "text-white" : "text-dark"}`}>
                                <td><h6>Desktop</h6></td>
                                <td><h6>Tablet</h6></td>
                                <td><h6>Mobile</h6></td>
                            </tr>
                            <tr>
                                {values.map((item, index) => <td key={index}><h2 style={{ color: item.color }}>{item.y.toFixed(2)}%</h2></td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    );
}

export default TrafficByDevices;