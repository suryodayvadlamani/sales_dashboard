import { useQuery } from "@tanstack/react-query"
import { getInventory } from "../../api/KPI"
import Card from "../card/Card"

const Inventory = () => {
    const { data, isLoading,  } = useQuery({
        queryKey: ['KPI_INVENTORY'],
        queryFn: () => getInventory()
    });

    return <div className="parentContainer">
        {!isLoading && <Card data={data} />}
    </div>
}

export default Inventory