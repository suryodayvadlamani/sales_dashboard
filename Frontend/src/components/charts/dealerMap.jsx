import React, { useContext } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FilterContext } from '../../providers/FilterContext';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';


const DealerMap = () => {
  const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

    const { filters } = useContext(FilterContext);

    const { data:dealers, isLoading } = useQuery({
        queryKey: ['areaData', {...filters}],
        queryFn: () =>
            axios
                .get('http://localhost:8000/getDealers',{params:filters})
                .then((res) => {return res.data}),
    })

if(isLoading){
    return <p>Loading .................</p>
}
    return (

      <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} style={{
              default: { fill: "#ede266", outline: "none" },
              hover: { fill: "#F53", outline: "none" },
              pressed: { fill: "#E42", outline: "none" }
            }} />
          ))
        }
      </Geographies>
      {dealers.map((dealer, id) => (
        <Marker key={`dealer_${id}`} coordinates={[dealer.long, dealer.lat]}>
          <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-15}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {dealer.name}
          </text>
        </Marker>
      ))}
    </ComposableMap>

    );
};

export default DealerMap;
