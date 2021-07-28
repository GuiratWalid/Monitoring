import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const LastHours = (props) => {
    const [values, setValues] = useState([]);
    const [hours, setHours] = useState([]);
    const { type } = props;
    const { darkMode } = useContext(modeContext);
    useEffect(() => {
        Axios.get(`http://localhost:5000/${type}LastHours`).then(
            response => {
                const tab1 = [];
                const tab2 = [];
                response.data.forEach(item => {
                    tab1.push((item.hour < 10 ? '0' + item.hour : item.hour) + ':00');
                    tab2.push(item.count);
                });
                setHours(tab1.reverse());
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
            text: `${props.type} Last 24 Hours`,
            style: {
                "color": '#17a2b8',
                "fontSize": "20px",
                "fontWeight": "bold"
            }
        },
        series: [
            {
                name: 'Hours',
                data: values,
                color: '#17a2b8'
            }
        ],
        xAxis: {
            categories: hours,
            labels: {
                step: window.screen.width <= 992 ? window.screen.width <= 510 ? 3 : 2 : 1,
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            }
        },
        tooltip: {
            valueSuffix: ' Visitor(s) '
        },
        yAxis: {
            values: {
                name: `${props.type} number`
            },
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
        </div>
    );
}

export default LastHours;