"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import GlobalConfig from "@/app/app.config";
Chart.register(ArcElement, Tooltip);

export default function IncomeDoughnut(incomeData: {
    categories: any;
    datasetsData: any;
}) {
    const data = {
        labels: incomeData.categories,
        datasets: [
            {
                label: GlobalConfig.baseCurrency,
                data: incomeData.datasetsData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                ],
                hoverOffset: 20,
            },
        ],
    };

    return (
        <div className="">
            <div className="font-bold">Categories, this year</div>
            <Doughnut
                data={data}
                options={{
                    radius: "80%",
                    devicePixelRatio: 2,
                }}
            />
        </div>
    );
}
