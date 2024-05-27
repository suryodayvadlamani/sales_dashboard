import Filters from "../components/Filters"
import "../components/card/Cards.css"
import SalesBreakdownChart from "../components/charts/salesBreakdownChart";
import Sales from "../components/KPIS/Sales";
import Revenue from "../components/KPIS/Revenue";
import Inventory from "../components/KPIS/Inventory";
import SalesLineChart from "../components/charts/salesLineChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UI/Card";
import TopMakes from "../components/charts/TopMakes";
import DealerMap from "../components/charts/dealerMap";

const Main = () => {



    return (
        <main className="m-8 flex flex-1 flex-col gap-2 items-center sm:items-stretch">
            <div className="flex flex-row gap-2">
                <Card className=" h-[100]">
                    <CardHeader>
                        <CardTitle>Today's Sales</CardTitle>
                        <CardDescription>Sales Summary</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-4">
                        <Sales />
                        <Revenue />
                        <Inventory />
                    </CardContent>
                </Card>
                <Card className="h-[100] flex-1">
                    <CardHeader>
                        <CardTitle>Top Makes</CardTitle>
                        <CardDescription>Top 5 makes based on their sales</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-4">
                        <TopMakes />
                    </CardContent>
                </Card>
                <Card className="h-[100] bg-gradient-to-br from-[#FFF4DE] to-[#DCFCE7]">
                    <CardContent className="flex flex-col gap-4 pt-4 ">
                        <Filters />
                    </CardContent>
                </Card>
            </div>

            <section className="flex flex-row gap-4 mt-4 ">
                <div className="w-1/3 bg-white rounded-2xl p-4">
                    <SalesLineChart />
                </div>
                <div className="w-1/3 bg-white rounded-2xl p-4">
                    <DealerMap />
                </div>
                <div className="w-1/3 bg-white rounded-2xl p-2">
                    <SalesBreakdownChart />
                </div>
            </section>
        </main>
    )
}

export default Main