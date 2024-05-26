import { useQuery } from "@tanstack/react-query"
import { getRevenue } from "../../api/KPI"
import Card from "../card/Card"

const Revenue = () => {
    const { data, isLoading,  } = useQuery({
        queryKey: ['KPI_REVENUE'],
        queryFn: () => getRevenue()
    });

    return <div>
        {!isLoading && <Card data={data} />}
    </div>
}

export default Revenue