import { useQuery } from "@tanstack/react-query"
import { getInventory } from "../../api/KPI"
import Card from "../card/Card"

import { FilterContext } from "../../providers/FilterContext";
import { useContext } from "react";

const Inventory = () => {
    const { filters } = useContext(FilterContext);

    const { data, isLoading, } = useQuery({
        queryKey: ['KPI_INVENTORY', {filters}],
        queryFn: () => getInventory(filters)
    });

    return <div >
        <Card data={data} isLoading={isLoading}/>
    </div>
}

export default Inventory