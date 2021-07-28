import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const ByType = (props) => {
    const [types, setTypes] = useState([]);
    const [values, setValues] = useState([]);
    const type = props.type;
    const { darkMode } = useContext(modeContext);
    useEffect(() => {
        Axios.get(`http://localhost:5000/${type}Type`).then(
            response => {
                const tab1 = [];
                const tab2 = [];
                response.data.forEach((item, index) => {
                    tab1.push(item.type);
                    tab2.push({
                        y: item.count,
                        color: index % 4 === 0 ? '#f0ad4e' : index % 3 === 0 ? '#17a2b8' : index % 2 === 0 ? '#5cb85c' : '#d9534f'
                    });
                });
                setTypes(tab1);
                setValues(tab2);
            }
        );
    }, [type]);
    const options = {
        chart: {
            type: 'bar',
            backgroundColor: {
                linearGradient: [0, 0, 1000, 1000],
                stops: !darkMode ? [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ] :
                    [
                        [0, 'rgb(50, 51, 54)'],
                        [1, 'rgb(65, 65, 69)']
                    ]
            }
        },
        title: {
            text: `${props.type}s By Type`,
            style: {
                "fontFamily": "arial",
                "color": '#17a2b8',
                "fontSize": "20px",
                "fontWeight": "bold"
            }
        },
        xAxis: {
            categories: types,
            title: {
                text: props.type,
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            },
            labels: {
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            labels: {
                overflow: 'justify',
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: {
            showInLegend: false,
            name: null,
            data: values
        }
    }
    return (
        <div className="m-3 card" style={{ backgroundColor: darkMode ? "rgb(57,58,61)" : "#fff" }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div >
    );
}

export default ByType;