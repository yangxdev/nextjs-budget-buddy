"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import GlobalConfig from "@/app/app.config";
Chart.register(ArcElement, Tooltip);

export default function PaymentDoughnut(paymentData: { id: string; categories: any; datasetsData: any }) {
    const categoriesCount = paymentData.categories.length;
    const colors = categoriesCount > 0 ? Array.from({ length: categoriesCount }, (_, index) => {
        return `hsl(${(360 / categoriesCount) * index}, 50%, 50%)`;
    }
    ) : [];

    const data = {
        labels: paymentData.categories,
        datasets: [
            {
                label: GlobalConfig.currency.baseCurrency,
                data: paymentData.datasetsData,
                backgroundColor: [
                    ...colors,
                ],
                hoverOffset: 25,
            },
        ],
    };

    const totalPayment = paymentData.datasetsData.reduce((acc: number, payment: string) => acc + Number(payment), 0);

    return (
        <div id={paymentData.id}>
            <Doughnut
                data={data}
                options={{
                    radius: "80%",
                    devicePixelRatio: 2,
                    borderColor: "rgba(255, 255, 255, 1)",
                }}
            />
            <div className="overflow-y-scroll max-h-[10rem] scrollbar-thin scrollbar-thumb-accentGray scrollbar-track-transparent pr-1">
                {/* <div className="font-semibold pb-2">{paymentData.id}</div> */}
                {paymentData.categories
                    .map((category: any, index: number) => {
                        const categoryPayment = paymentData.datasetsData[index];
                        const categoryPercentage = (categoryPayment / totalPayment) * 100;
                        const color = colors[index];

                        return { category, categoryPayment, categoryPercentage, color };
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
                                <div>{item.categoryPercentage.toFixed(2)}%</div>
                            </div>
                        )
                    )}
            </div>
        </div>
    );
}

// TODO: Adaptive color scheme based on the number of categories