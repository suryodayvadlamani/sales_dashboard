import { useQuery } from "@tanstack/react-query"
import { getSales } from "../../api/KPI"
import Card from "../card/Card"
import { FilterContext } from "../../providers/FilterContext";
import { useContext } from "react";

const Sales = () => {
  const { filters } = useContext(FilterContext);

  const { data, isLoading, } = useQuery({
    queryKey: ['KPI_SALES', { ...filters }],
    queryFn: () => getSales(filters)
  });
  
  return <Card data={data} isLoading={isLoading}/>
}

export default Sales