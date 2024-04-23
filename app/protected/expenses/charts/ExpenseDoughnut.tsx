"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import GlobalConfig from "@/app/app.config";
Chart.register(ArcElement, Tooltip);

export default function InfoChartDoughnut(props: { id: string; categories: any; datasetsData: any }) {
    const categoriesCount = props.categories.length;
    const colors = categoriesCount > 0 ? Array.from({ length: categoriesCount }, (_, index) => {
        return `hsl(${(360 / categoriesCount) * index}, 80%, 65%)`;
    }
    ) : [];

    const data = {
        labels: props.categories,
        datasets: [
            {
                label: GlobalConfig.currency.baseCurrency,
                data: props.datasetsData,
                backgroundColor: [
                    ...colors,
                ],
                hoverOffset: 25,
            },
        ],
    };

    const totalAmount = props.datasetsData.reduce((acc: number, expense: string) => acc + Number(expense), 0);

    return (
        <div id={props.id}>
            <Doughnut
                data={data}
                options={{
                    radius: "80%",
                    devicePixelRatio: 2,
                    borderColor: "rgba(255, 255, 255, 0)",
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
            <div className="overflow-y-scroll max-h-[10rem] scrollbar-thin scrollbar-thumb-accentGray scrollbar-track-transparent pr-1">
                {/* <div className="font-semibold pb-2">{expenseData.id}</div> */}
                {props.categories
                    .map((category: any, index: number) => {
                        const categoryExpense = props.datasetsData[index];
                        const categoryPercentage = (categoryExpense / totalAmount) * 100;
                        const color = colors[index];

                        return { category, categoryExpense, categoryPercentage, color };
                    })
                    .sort((a: { categoryPercentage: number }, b: { categoryPercentage: number }) => b.categoryPercentage - a.categoryPercentage)
                    .map(
                        (
                            item: {
                                category: string;
                                categoryPercentage: number;
                                color: string;
                            },
                            index: number
                        ) => (
                            <div key={index} className="flex justify-between">
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 mr-2 rounded-full opacity-70`} style={{ backgroundColor: item.color }}></div>
                                    {item.category}
                                </div>
                                <div>{item.categoryPercentage.toFixed(1)}%</div>
                            </div>
                        )
                    )}
            </div>
        </div>
    );
}

// DONE: Adaptive color scheme based on the number of categories