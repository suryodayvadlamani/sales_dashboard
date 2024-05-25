import formatCash from "../lib/formatCash";
import lineConfig from "../config/lineChart"
import barConfig from "../config/barChart"
import axios from "axios";
export const getSales = () => {
    return axios
        .get('http://localhost:8000/sales')
        .then((res) => {
            const salesData = res.data;
            const dates = salesData.map(entry => entry.sale_date);
            const salesSeries = salesData.map(entry => entry.total_sales);

            const s = {
                ...lineConfig,
                type:'line',
                png: 'FaDollarSign',
                title: "Sales",
                value: formatCash(salesSeries.reduce((partialSum, a) => partialSum + a, 0)),
                series: [
                    {
                        name: 'Total Sales',
                        data: salesSeries
                    }
                ],
                options: {
                    ...lineConfig.options,
                    xaxis: {
                        categories: dates
                    }
                }

            }
            return s;
        })
}
export const getRevenue = () => {
    return axios
        .get('http://localhost:8000/revenue')
        .then((res) => {
            const revenueData = res.data;
            const dates = revenueData.map(entry => entry.sale_date);
            const revenueSeries = revenueData.map(entry => entry.total_revenue);

            const s = {
                ...lineConfig,
                png: 'FaCoins',
                title: "Revenue",
                value: formatCash(revenueSeries.reduce((partialSum, a) => partialSum + a, 0)),
                series: [
                    {
                        name: 'Total Revenue',
                        type: 'column',
                        data: revenueSeries
                    }
                ],
                options: {
                    ...lineConfig.options,
                    xaxis: {
                        categories: dates
                    },
                    yaxis: [
                        {
                            title: {
                                text: 'Total Revenue'
                            },
                            labels: {
                                formatter: formatCash
                            }
                        }
                    ]
                }

            }
            return s;
        })
}
export const getInventory = () => {
    return axios
        .get('http://localhost:8000/inventory')
        .then((res) => {
            const inventoryData = res.data;

            const makesModels = inventoryData.map(entry => `${entry.make} ${entry.model}`);
            const quantities = inventoryData.map(entry => entry.quantity);

            const s = {
                ...barConfig,
                type:'bar',
                png: 'FaCoins',
                title: "Inventory",
                value: quantities.reduce((partialSum, a) => partialSum + a, 0),
                series: [
                    {
                        name: 'Quantity',
                        data: quantities
                    }
                ],
                options: {
                    ...barConfig.options,
                    xaxis: {
                        categories: makesModels
                    }
                }

            }
            return s;
        })
}