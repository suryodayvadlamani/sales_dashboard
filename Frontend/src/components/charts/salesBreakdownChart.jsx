import React, {  } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const SalesBreakdownChart = () => {

    const { isLoading, data } = useQuery({
        queryKey: ['pieData'],
        queryFn: () =>
            axios
                .get('http://localhost:8000/sales-breakdown')
                .then((res) => {
                    const breakdownData = res.data;
                    const makes = breakdownData.map(entry => entry.make);
                    const sales = breakdownData.map(entry => entry.total_sales);

                    return {
                        series: sales,
                        options: {
                            chart: {
                                type: 'pie',
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
                    };


                }),
    })
    
    if (isLoading)
        return <h1>Loading........</h1>
    return (

        <Chart options={data.options} series={data.series} type="pie" height={'400px'} />

    );
};

export default SalesBreakdownChart;
