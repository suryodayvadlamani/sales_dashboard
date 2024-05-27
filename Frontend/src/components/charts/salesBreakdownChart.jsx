import React, { useContext } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FilterContext } from "../../providers/FilterContext";
const SalesBreakdownChart = () => {
    const { filters } = useContext(FilterContext);

    const { isLoading, data } = useQuery({
        queryKey: ['pieData',{filters}],
        queryFn: () =>
            axios
                .get('http://localhost:8000/sales-breakdown',  {params:filters})
                .then((res) => {
                    const breakdownData = res.data;
                    const makes = breakdownData.map(entry => entry.make);
                    const sales = breakdownData.map(entry => entry.total_sales);

                    return {
                        series: sales,
                        options: {
                            title: {
                                text: 'Model Share',
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
