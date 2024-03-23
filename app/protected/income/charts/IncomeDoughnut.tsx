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
                hoverOffset: 25,
            },
        ],
    };

    function getColor(index: number) {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-yellow-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-orange-500",
        ];
        return colors[index];
    }

    const totalIncome = incomeData.datasetsData.reduce(
        (acc: number, income: string) => acc + Number(income),
        0
    );

    return (
        <div>
            <div>
            {incomeData.categories.map((category: any, index: number) => {
                // Calculate percentage for this category
                const categoryIncome = incomeData.datasetsData[index];
                const categoryPercentage = (categoryIncome / totalIncome) * 100;
                console.log(totalIncome);

                return (
                    <div key={index} className="flex justify-between">
                        <div className="flex items-center">
                            <div
                                className={`w-2 h-2 mr-2 rounded-full bg-opacity-50 ${getColor(
                                    index
                                )}`}
                            ></div>
                            {category}
                        </div>
                        <div>
                            {categoryPercentage.toFixed(2)}%
                        </div>
                    </div>
                );
            })}
            </div>
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
