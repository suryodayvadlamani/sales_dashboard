// src/context/FilterContext.js
import React, { createContext, useState } from 'react';

import { addDays } from "date-fns"
// Create the context
const FilterContext = createContext();

// Create the provider component
const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    make:[],
    from: new Date(2018, 5, 1),
    to: addDays(new Date(2024, 5, 1), 30),
  });

  const updateFilter = (filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
