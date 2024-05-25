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
            type: 'bar',
            height: 350
        }, 
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        xaxis: {
            categories: []
        },
        yaxis: {
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " units";
                }
            }
        }
    }
}

export default config;

