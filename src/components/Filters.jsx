import { useQuery } from "@tanstack/react-query";
import { DatePickerWithRange } from "./DatePicker";
import { Combobox } from "./UI/Combobox";
import { useState } from "react";
import * as React from "react"
import { addDays, format } from "date-fns"
import api from "../api";

const Filters = () => {
    const [product, setProduct] = useState("");

    const [date, setDate] = React.useState({
        from: new Date(2018, 5, 1),
        to: addDays(new Date(2018, 5, 1), 30),
      })

    const { isLoading: productsLoading, data: optionsData } = useQuery({
        queryKey: ['products', { product }],
        queryFn: () =>
            api.get(`http://localhost:3000/api/products?product=${product}&date=${date}`)
                .then((res) => {
                    console.log(res); return res.data
                }),
    });
    return (
        <section className="flex flex-row-reverse gap-4">
            <DatePickerWithRange date={date} setDate={setDate}/>
            {!productsLoading && optionsData.length && <Combobox options={optionsData}
                value={product} setValue={setProduct}
            />}
            
        </section>
    );
}
export default Filters