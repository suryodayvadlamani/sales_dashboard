import formatCash from "../lib/formatCash";
import lineConfig from "../config/lineChart"
import barConfig from "../config/barChart"
import axios from "axios";
export const getSales = (filters) => {
    return axios
        .get('http://localhost:8000/sales', {params:filters})
        .then((res) => {
            const salesData = res.data;
            const dates = salesData.map(entry => entry.sale_date);
            const salesSeries = salesData.map(entry => entry.total_sales);

            const s = {
                ...lineConfig,
                color: {
                    backGround: "#ffe2e5",
                    boxShadow: "0px 0px 13px 0px #e0c6f5",
                },
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
                    grid:{
                        show:false
                    },
                    ...lineConfig.options,
                    xaxis: {
                        categories: dates
                    }
                }

            }
            return s;
        })
}
export const getRevenue = (filters) => {
    return axios
        .get('http://localhost:8000/revenue', {params:filters})
        .then((res) => {
            const revenueData = res.data;
            const dates = revenueData.map(entry => entry.sale_date);
            const revenueSeries = revenueData.map(entry => entry.total_revenue);

            const s = {
                ...lineConfig,
                color: {
                    backGround: "#FFF4DE",
                    boxShadow: "0px 0px 13px 0px #e0c6f5",
                },
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
                    grid:{
                        show:false
                    },
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
export const getInventory = (filters) => {
    return axios
        .get('http://localhost:8000/inventory', {params:filters})
        .then((res) => {
            const inventoryData = res.data;

            const makesModels = inventoryData.map(entry => `${entry.make} ${entry.model}`);
            const quantities = inventoryData.map(entry => entry.quantity);

            const s = {
                ...barConfig,
                color: {
                    backGround: "#DCFCE7",
                    boxShadow: "0px 0px 13px 0px #e0c6f5",
                },
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
                    grid:{
                        show:false
                    },
                    ...barConfig.options,
                    xaxis: {
                        categories: makesModels
                    }
                }

            }
            return s;
        })
}