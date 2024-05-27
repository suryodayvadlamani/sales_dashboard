"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "../../lib/util"
import { Button } from "./Button"
import * as React from "react"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Popover"


export function Combobox({ options, value, setValue }) {

  const [open, setOpen] = React.useState(false)


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          {value ??  "Select option..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." className="h-9" />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandList>
            {options.map((option, index) => (

              <CommandItem
                key={`product${index}`}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
