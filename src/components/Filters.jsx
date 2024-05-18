import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./UI/Select"

const Filters = () => {
    return (
        <section className="flex flex-row-reverse gap-4">
            <Select>
                <SelectTrigger className="w-[120px] rounded-3xl">
                    <SelectValue placeholder="All Quarters" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Quarters</SelectItem>
                    <SelectItem value="Q1">Q1</SelectItem>
                    <SelectItem value="Q2">Q2</SelectItem>
                    <SelectItem value="Q3">Q3</SelectItem>
                    <SelectItem value="Q4">Q4</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[80px] rounded-3xl">
                    <SelectValue placeholder="year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2016">2016</SelectItem>
                    <SelectItem value="2017">2017</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    
                    
                </SelectContent>
            </Select>

        </section>
    );
}
export default Filters