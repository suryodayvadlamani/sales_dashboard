import Card from "../components/card/Card";
import Filters from "../components/Filters"
import "../components/card/Cards.css"
import Chart from "react-apexcharts";
import api from "../api/index"
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Main = () => {

    const { data: kpiData } = useQuery({
        queryKey: ['KPIdata'],
        queryFn: () =>
            api
                .get('http://localhost:3000/api/kpi_data')
                .then((res) => { return res.data }),
    })
    const { isLoading: lineLoading, error: lineError, data: lineData } = useQuery({
        queryKey: ['lineData'],
        queryFn: () =>
            api
                .get('http://localhost:3000/api/line_data')
                .then((res) => { return res.data }),
    })
    const { isLoading: barLoading, error: barError, data: barData } = useQuery({
        queryKey: ['barData'],
        queryFn: () =>
            api
                .get('http://localhost:3000/api/bar_data')
                .then((res) => { return res.data }),
    })
    const { isLoading: pieLoading, error: pieError, data: pieData } = useQuery({
        queryKey: ['pieData'],
        queryFn: () =>
            api
                .get('http://localhost:3000/api/pie_data')
                .then((res) => { return res.data }),
    })
    
    return (
        <main className="m-8 flex flex-col gap-4 items-center sm:items-stretch">
            <Filters />
            <section className="Cards">
                {kpiData?.map((card, id) => {
                    return (
                        <div className="parentContainer" key={id}>
                            <Card
                            categories={card.categories}
                                title={card.title}
                                color={card.color}
                                barValue={card.barValue}
                                value={card.value}
                                png={card.png}
                                series={card.series}
                            />
                        </div>
                    );
                })}
            </section>
            <section className="flex flex-row gap-4 mt-4 h-[300]">
                {!lineLoading && (<Chart className="w-2/3 h-[250]" options={lineData.options} series={lineData.series} type="area" />)}
                <section className="flex flex-col gap-2 w-1/3 h-[250]">
                    {!barLoading && (<Chart options={barData.options} series={barData.series} type="bar" />)}
                    {!pieLoading && (<Chart options={pieData.chartOptions} series={pieData.series} type="pie" />)}
                </section>
            </section>
        </main>
    )
}

export default Main