"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import {  format } from "date-fns"

import { cn } from "../lib/util"
import { Button } from "./UI/Button"
import { Calendar } from "./UI/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./UI/Popover"

export function DatePickerWithRange({
  className,date, setDate
}) {
 
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => {setDate(e);}}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
