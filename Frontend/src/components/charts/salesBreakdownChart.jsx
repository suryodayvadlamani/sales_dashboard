import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const SalesBreakdownChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {}
    });
    const { isLoading, error, data } = useQuery({
        queryKey: ['lineData'],
        queryFn: () =>
            axios
                .get('http://localhost:8000/sales-breakdown')
                .then((res) => {
                    const breakdownData = res.data;
                    

                const makes = breakdownData.map(entry => entry.make);
                const sales = breakdownData.map(entry => entry.total_sales);

                setChartData({
                    series: sales,
                    options: {
                        chart: {
                            type: 'pie',
                            height: 350
                        },
                        labels: makes,
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return val + " sales";
                                }
                            }
                        }
                    }
                });


                    return res.data
                }),
    })


    return (

        <Chart options={chartData.options} series={chartData.series} type="pie" height={350} />

    );
};

export default SalesBreakdownChart;
