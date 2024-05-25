const config = {
    png: '',
    title: "",
    barValue: 70,
    value: 0,
    color: {
        backGround: "#24243e",
        boxShadow: "0px 0px 13px 0px #e0c6f5",
    },
    series: [],
    options: {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
              }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
        },
        xaxis: {
            categories: []
        },
        tooltip: {
            shared: true,
            intersect: false
        }
    }
}

export default config ;