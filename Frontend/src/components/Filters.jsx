import { useQuery } from "@tanstack/react-query";
import { DatePickerWithRange } from "./DatePicker";
import { Combobox } from "./UI/Combobox";
import { useState } from "react";
import * as React from "react"
import { FilterContext } from "../providers/FilterContext";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "./UI/RadioGroup";
import { Label } from "./UI/Label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./UI/DropDown"
import {Button
} from "./UI/Button"


const Filters = () => {

  const [showStatusBar, setShowStatusBar] = React.useState({})

  const { filters, updateFilter } = React.useContext(FilterContext);
  const handleDateChange = (e) => {
    updateFilter('from', e.from);
    updateFilter('to', e.to);
  };
  function getDateRange(period) {
    const now = new Date();
    let startDate;
    let endDate = new Date(); // Default to today for the end date

    switch (period) {
      case 'option-one':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'option-two':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'option-three':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'option-four':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'option-five':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      case 'option-six':
        startDate = new Date(now.getFullYear() - 2, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      case 'option-seven':
        startDate = new Date(now.getFullYear() - 3, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        startDate = new Date(now.getFullYear() - 5, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
    }

    // Format dates to YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];

    handleDateChange({
      from: formatDate(startDate),
      to: formatDate(endDate),
    });
  }
  const handleProductChange = (e, isSelected) => {
    setShowStatusBar(prev => {
      const s = { ...prev };
      s[e] = isSelected;
      updateFilter('make', Object.keys(s).filter(x => s[x]));
      return s;
    });
  }
  const { isLoading: makesLoading, data: makesData } = useQuery({
    queryKey: ['makes'],
    queryFn: () =>
      axios.get(`http://localhost:8000/getMakes`)
        .then((res) => {
          return res.data.map(x => x.make)
        }),
  });
  return (
    <>
      <DatePickerWithRange date={{ from: filters.from, to: filters.to }} setDate={handleDateChange} />
      {!makesLoading && makesData.length &&

        (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Slect Make</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              {makesData.map(x => (
                <DropdownMenuCheckboxItem
                  checked={showStatusBar[x]}
                  onCheckedChange={(e) => handleProductChange(x, e)}
                >
                  {x}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        )

      }
      <RadioGroup onValueChange={(e) => getDateRange(e)} defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Last month</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Last 2 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-three">Last 3 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-four" id="option-four" />
          <Label htmlFor="option-four">Last 6 months</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-five" id="option-five" />
          <Label htmlFor="option-five">Last year</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-six" id="option-six" />
          <Label htmlFor="option-six">Last 2 years</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-seven" id="option-seven" />
          <Label htmlFor="option-seven">Last 3 years</Label>
        </div>
      </RadioGroup>


    </>
  );
}
export default Filters