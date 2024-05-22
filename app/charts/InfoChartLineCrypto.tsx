"use client";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function InfoChartLineCrypto(props: any) {
    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     display: false,
            // },
            // title: {
            //     display: false,
            // },
        },
        scales: {
            // x: {
            //     display: false,
            //     grid: {
            //         display: false,
            //     },
            //     ticks: {
            //         display: false
            //     }
            // },
            // y: {
            //     display: false,
            //     grid: {
            //         display: false,
            //     },
            //     ticks: {
            //         display: false
            //     }
            // }
        },
        elements: {
            // point: {
            //     radius: 0
            // },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        // tension: 0.1,
    };

    const data = {
        labels: props.labels,
        datasets: props.datasets,
    };

    return <Line options={options} data={data} />;
}