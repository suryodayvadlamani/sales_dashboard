import { useQuery } from "@tanstack/react-query"
import { getRevenue } from "../../api/KPI"
import Card from "../card/Card"
import { FilterContext } from "../../providers/FilterContext";
import { useContext } from "react";
const Revenue = () => {
    const { filters } = useContext(FilterContext);
    const { data, isLoading,  } = useQuery({
        queryKey: ['KPI_REVENUE', {...filters}],
        queryFn: () => getRevenue(filters)
    });

    return <div>
        <Card data={data} isLoading={isLoading}/>
    </div>
}

export default Revenue