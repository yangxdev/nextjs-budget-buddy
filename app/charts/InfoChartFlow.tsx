"use client";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function InfoChartFlow(props: any) {
    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Month",
                },
                stacked: true,
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Amount",
                },
                stacked: true,
                ticks: {
                    stepSize: props.ticks, // Change this value to display fewer numbers on the y-axis
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true, // this will set the legend shapes to dots
                    boxHeight: 6, // thanks LingLing @ https://stackoverflow.com/questions/54865461/chart-js-style-legend-smaller-circles
                },
                onHover: (event: any) => {
                    event.native.target.style.cursor = 'pointer';
                },
                onLeave: (event: any) => {
                    event.native.target.style.cursor = 'default';
                },
            },
        },
    };

    const data = {
        labels: props.labels,
        datasets: props.datasets,
    };

    return <Bar options={options} data={data} />;
}