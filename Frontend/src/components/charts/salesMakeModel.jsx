import React, { useContext } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import formatCash from '../../lib/formatCash';
import { FilterContext } from '../../providers/FilterContext';

const SalesMakeModel = () => {
    const { filters } = useContext(FilterContext);

    const { data, isLoading } = useQuery({
        queryKey: ['areaData', {...filters}],
        queryFn: () =>
            axios
                .get('http://localhost:8000/salesMakeModel',{params:filters})
                .then((res) => {
                    const salesData = res.data;

                    // Process data to fit into ApexCharts series format
                    const seriesData = {};
                    const categories = new Set();
              
                    salesData.forEach(({ make, model, sale_price, sale_date }) => {
                      const key = `${make} ${model}`;
                      if (!seriesData[key]) {
                        seriesData[key] = { name: key, data: [] };
                      }
                      seriesData[key].data.push({ x: new Date(sale_date).getTime(), y: sale_price });
                      categories.add(sale_date);
                    });

                    return {
                        series:Object.values(seriesData),
                        options: {
                            chart: {
                              type: 'area',
                            },
                            xaxis: {
                              type: 'datetime',
                              categories: Array.from(categories).sort(),
                            },
                            yaxis: {
                              title: {
                                text: 'Sales',
                              },
                            },
                            title: {
                              text: 'Car Sales Over Time',
                              align: 'left',
                            },
                          }
                    }
                }),
    })

if(isLoading || data.series.length==0){
    return <p>Loading .................</p>
}
    return (

        <Chart options={data.options} series={data.series} type="area" height={'350px'} />

    );
};

export default SalesMakeModel;
