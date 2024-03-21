"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

export default function IncomeDoughnut(incomeData: {
    categories: any;
    datasetsData: any;
}) {
    const data = {
        labels: incomeData.categories,
        datasets: [
            {
                label: "Income categories",
                data: incomeData.datasetsData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                hoverOffset: 0,
            },
        ],
    };

    return (
        <>
            <Doughnut data={data} />
        </>
    );
}
