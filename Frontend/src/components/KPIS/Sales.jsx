import { useQuery } from "@tanstack/react-query"
import { getSales } from "../../api/KPI"
import Card from "../card/Card"

const Sales = () => {
    const { data, isLoading,  } = useQuery({
        queryKey: ['KPI_SALES'],
        queryFn: () => getSales()
    });

    return <div >
        {!isLoading && <Card data={data} />}
    </div>
}

export default Sales