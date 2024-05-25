import { store } from "./store"
export const kpi_data = [
  {
    title: "Sales",
    color: {
      backGround: "#24243e",
      boxShadow: "0px 0px 13px 0px #e0c6f5",
    },
    barValue: 70,
    categories:store.map(x => x["Order Date"]),
    value:(Math.round(store.map(x => x.Sales).reduce((partialSum, a) => partialSum + a, 0) * 100) / 100).toFixed(2),
    png: 'FaDollarSign',
    series: [
      {
        name: "Sales",
        data: store.map(x => x.Sales),
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "#24243e",
      boxShadow: "0px 0px 13px 0px #e0c6f5",
    },
    barValue: 80,
    value: (Math.round(store.map(x => x.Profit).reduce((partialSum, a) => partialSum + a, 0) * 100) / 100).toFixed(2),
    png: 'FaCoins',
    series: [
      {
        name: "Revenue",
        data: store.map(x => x.Profit),

      },
    ],
  },
  {
    title: "Expenses",
    color: {
      boxShadow: "0px 0px 13px 0px #e0c6f5",
      backGround: "#24243e",

    },
    barValue: 60,
    value: "4,270",
    png: 'FaClipboardList',
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
]