import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const LastDays = (props) => {
    const [values, setValues] = useState([]);
    const [days, setDays] = useState([]);
    const { type } = props;
    const { darkMode } = useContext(modeContext);
    useEffect(() => {
        Axios.get(`http://localhost:5000/${type}LastDays`).then(
            response => {
                const tab1 = [];
                const tab2 = [];
                response.data.forEach(item => {
                    tab1.push(item.day > 9 ? item.day : '0' + item.day);
                    tab2.push({ y: item.count, color: "#f0ad4e" });
                });
                setDays(tab1.reverse());
                setValues(tab2.reverse());
            }
        );
    }, [type]);
    const options = {
        chart: {
            type: 'column',
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
            text: `${props.type} Last 30 Days`,
            style: {
                "color": '#f0ad4e',
                "fontSize": "20px",
                "fontWeight": "bold"
            }
        },
        series: [
            {
                name: 'Days',
                color: '#f0ad4e',
                data: values
            },
        ],
        tooltip: {
            valueSuffix: ' Visitor(s) '
        },
        xAxis: {
            categories: days,
            labels: {
                step: window.screen.width <= 992 ? 2 : 1,
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            }
        },
        yAxis: {
            labels: {
                step: 1,
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            },
            title: {
                text: 'Visitors',
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            }
        },
        legend: {
            itemStyle: {
                color: darkMode ? "#ccc" : "#555555"
            },
            itemHoverStyle: {
                color: darkMode ? "#fff" : "#000"
            }
        }
    };
    return (
        <div className="m-3 rounded">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div >
    );
}

export default LastDays;