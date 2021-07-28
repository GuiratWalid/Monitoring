import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const LastMonths = (props) => {
    const [values, setValues] = useState([]);
    const [months, setMonths] = useState([]);
    const { type } = props;
    const { darkMode } = useContext(modeContext);
    useEffect(() => {
        Axios.get(`http://localhost:5000/${type}LastMonths`).then(
            response => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const tab1 = [];
                const tab2 = [];
                response.data.forEach(item => {
                    tab1.push(months[item.month - 1]);
                    tab2.push(item.count);
                });
                setMonths(tab1.reverse());
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
            text: `${props.type} Last 12 Months`,
            style: {
                "color": '#5cb85c',
                "fontSize": "20px",
                "fontWeight": "bold"
            }
        },
        series: [
            {
                name: 'Months',
                color: '#5cb85c',
                data: values
            },
        ],
        xAxis: {
            categories: months,
            labels: {
                step: 1,
                style: {
                    color: darkMode ? "#ccc" : "#555555"
                }
            }
        },
        tooltip: {
            valueSuffix: ' Visitor(s)'
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
        </div>
    );
}

export default LastMonths;