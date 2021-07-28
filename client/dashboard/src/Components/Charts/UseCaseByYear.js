import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Axios from 'axios';
import { modeContext } from './../../Context/ModeContext.js';

const UseCaseByYear = () => {
    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);
    const { darkMode } = useContext(modeContext);
    useEffect(() => {
        Axios.get(`http://localhost:5000/UseCaseByYear/`).then(
            response => {
                const year = new Date().getFullYear();
                const tab = [];
                const values = [[], [], [], [], []];
                response.data.forEach(item => {
                    if (tab.indexOf(item.type) === -1) {
                        tab.push(item.type);
                        for (let i = 0; i < 5; i++)
                            values[i].push(0);
                    }
                    values[year - item.year][tab.indexOf(item.type)] = item.count;
                });
                setTypes(tab);
                setData(values);
            }
        );

    }, []);
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
            text: `Use Cases Last 5 Years`,
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
                text: "Use Cases",
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
                step: 1,
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
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 10,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: new Date().getFullYear(),
                data: data[0],
                color: '#f0ad4e'
            },
            {
                name: new Date().getFullYear() - 1,
                data: data[1],
                color: '#17a2b8'
            },
            {
                name: new Date().getFullYear() - 2,
                data: data[2],
                color: '#5cb85c'
            },
            {
                name: new Date().getFullYear() - 3,
                data: data[3],
                color: '#d9534f'
            },
            {
                name: new Date().getFullYear() - 4,
                data: data[4],
                color: '#0275d8'
            }
        ]
    }
    return (
        <div className="mb-3 card" style={{ backgroundColor: darkMode ? "rgb(57,58,61)" : "#fff" }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default UseCaseByYear;