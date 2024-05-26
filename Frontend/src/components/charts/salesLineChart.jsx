import React, { useState } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import formatCash from '../../lib/formatCash';

const SalesLineChart = () => {


    const { data, isLoading } = useQuery({
        queryKey: ['lineData'],
        queryFn: () =>
            axios
                .get('http://localhost:8000/sales-data')
                .then((res) => {
                    const salesData = res.data;
                    const dates = salesData.map(entry => entry.sale_date);
                    const salesSeries = salesData.map(entry => entry.total_sales);
                    const revenueSeries = salesData.map(entry => entry.total_revenue);

                    return {

                        series: [
                            {
                                name: 'Total Sales',
                                type: 'column',
                                data: salesSeries
                            },
                            {
                                name: 'Total Revenue',
                                type: 'line',
                                data: revenueSeries
                            }
                        ],
                        options: {
                            grid:{
                                show:false
                            },
                            chart: {

                                type: 'line',
                                stacked: false
                            },
                            dataLabels: {
                                enabled: false
                            },
                            stroke: {
                                width: [0, 2]
                            },
                            xaxis: {
                                categories: dates,

                            },
                            yaxis: [
                                {
                                    title: {
                                        text: 'Total Sales'
                                    },
                                    labels: {
                                        formatter: formatCash
                                    }
                                },
                                {
                                    opposite: true,
                                    title: {
                                        text: 'Total Revenue'
                                    },
                                    labels: {
                                        formatter: formatCash
                                    }
                                }
                            ],
                            tooltip: {
                                shared: true,
                                intersect: false
                            }
                        }
                    }
                }),
    })

if(isLoading){
    return <p>Loading .................</p>
}
    return (

        <Chart options={data.options} series={data.series} type="line" height={'400px'} />

    );
};

export default SalesLineChart;
