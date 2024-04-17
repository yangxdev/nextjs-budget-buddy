"use client";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function InfoChart(props: any) {
    const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
        },
    }
}

    const data = {
        labels: props.labels,
        datasets: props.datasets,
    }

    return (
        <Bar
            options={options} data={data}
        />
    );
}