import Card from "../components/card/Card";
import Filters from "../components/Filters"
import "../components/card/Cards.css"
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import SalesBreakdownChart from "../components/charts/salesBreakdownChart";
import { getSales } from "../api/KPI";
import formatCash from "../lib/formatCash";
import Sales from "../components/KPIS/Sales";
import Revenue from "../components/KPIS/Revenue";
import Inventory from "../components/KPIS/Inventory";

const Main = () => {

    const [chartData, setChartData] = useState({
        series: [],
        options: {}
    });

    const { isLoading: lineLoading, error: lineError, data: lineData } = useQuery({
        queryKey: ['lineData'],
        queryFn: () =>
            axios
                .get('http://localhost:8000/sales-data')
                .then((res) => {
                    const salesData = res.data;
                    const dates = salesData.map(entry => entry.sale_date);
                    const salesSeries = salesData.map(entry => entry.total_sales);
                    const revenueSeries = salesData.map(entry => entry.total_revenue);

                    setChartData({
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
                            chart: {
                                height: 150,
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
                                categories: dates
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
                    });


                    return res.data
                }),
    })


    return (
        <main className="m-8 flex flex-col gap-4 items-center sm:items-stretch">
            <Filters />
            <section className="Cards">
               <Sales/>
               <Revenue/>
               <Inventory/>
            </section>
            <section className="flex flex-row gap-4 mt-4 h-[300]">
                {!lineLoading && (<Chart className="w-2/3 h-[150]" options={chartData.options} series={chartData.series} type="line" />)}
                <section className="flex flex-col gap-2 w-1/3 h-[250]">
                    <SalesBreakdownChart />
                </section>
            </section>
        </main>
    )
}

export default Main