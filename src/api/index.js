import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create({baseURL:"http://localhost:3000"});

const adapter = new MockAdapter(api, {delayResponse:300})


adapter.onGet("http://localhost:3000/api/sales").reply(200, [1,2,3])
adapter.onGet("http://localhost:3000/api/kpi_data").reply(200, [
    {
      title: "Sales",
      color: {
        backGround: "#24243e",
        boxShadow: "0px 0px 13px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25,970",
      png: 'FaDollarSign',
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 42, 109, 100],
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
      value: "14,270",
      png: 'FaCoins',
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40],
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
  ])

adapter.onGet("http://localhost:3000/api/line_data").reply(200,{
    series: [
        {
            name: "Review",
            data: [10, 50, 30, 90, 40, 120, 100],
        },
    ],
    options: {
        chart: {
            type: "area",
            height: "auto",
        },

        fill: {
            colors: ["#fff"],
            type: "gradient",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            colors: ["#ff929f"],
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
                "2018-09-19T06:30:00.000Z",
            ],
        },
        yaxis: {
            show: false
        },
        toolbar: {
            show: false
        }
    },
});
adapter.onGet("http://localhost:3000/api/bar_data").reply(200,{
    series: [
        {
            name: "Review",
            data: [10, 50, 30, 90, 40, 120, 100],
        },
    ],
    options: {
        chart: {
            type: "area",
            height: "auto",
        },

        fill: {
            colors: ["#fff"],
            type: "gradient",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            colors: ["#ff929f"],
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
                "2018-09-19T06:30:00.000Z",
            ],
        },
        yaxis: {
            show: false
        },
        toolbar: {
            show: false
        }
    },
});
adapter.onGet("http://localhost:3000/api/pie_data").reply(200,{
    series: [44, 55, 41, 17, 15],
    chartOptions: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
});
export default api