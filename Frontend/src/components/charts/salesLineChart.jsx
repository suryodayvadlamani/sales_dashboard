import React from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import formatCash from '../../lib/formatCash';
import { FilterContext } from "../../providers/FilterContext";
import { useContext } from "react";

const SalesLineChart = () => {

    const { filters } = useContext(FilterContext);
    const { data, isLoading } = useQuery({
        queryKey: ['lineData', {...filters}],
        queryFn: () =>
            axios
                .get('http://localhost:8000/sales-data', {params:filters})
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
                            title: {
                                text: 'Total Sales',
                                align: 'left',
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize:  '14px',
                                  fontWeight:  'bold',
                                  color:  '#263238'
                                },
                            },
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

        <Chart options={data.options} series={data.series} type="line" height={'350px'} />

    );
};

export default SalesLineChart;
