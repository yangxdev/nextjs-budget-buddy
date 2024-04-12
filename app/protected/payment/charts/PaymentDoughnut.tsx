"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import GlobalConfig from "@/app/app.config";
Chart.register(ArcElement, Tooltip);

export default function PaymentDoughnut(paymentData: { id: string; categories: any; datasetsData: any }) {
  const data = {
    labels: paymentData.categories,
    datasets: [
      {
        label: GlobalConfig.currency.baseCurrency,
        data: paymentData.datasetsData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)", // hex: #FF6384 - brink pink
          "rgba(54, 162, 235, 0.5)", // hex: #36A2EB - rockman blue
          "rgba(255, 206, 86, 0.5)", // hex: #FFCE56 - angry pasta yellow
          "rgba(75, 192, 192, 0.5)", // hex: #4BC0C0 - north wind blue
          "rgba(153, 102, 255, 0.5)", // hex: #9966FF - irrigo purple
          "rgba(255, 159, 64, 0.5)", // hex: #FF9F40 - hawaiian passion orange
          "rgba(255, 99, 64, 0.5)", // hex: #FF6340 - halloween orange
          "rgba(54, 162, 132, 0.5)", // hex: #36A284 - gossamer green
          "rgba(255, 206, 132, 0.5)", // hex: #FFCE84 - equatorial yellow
          "rgba(75, 192, 255, 0.5)", // hex: #4BC0FF - glitter lake blue
          "rgba(153, 102, 64, 0.5)", // hex: #996640 - frappé au chocolat brown
          "rgba(255, 159, 132, 0.5)", // hex: #FF9F84 - orchid orange
        ],
        hoverOffset: 25,
      },
    ],
  };

  const colors = [
    "#FF6384", // brinkPink
    "#36A2EB", // rockmanBlue
    "#FFCE56", // angryPastaYellow
    "#4BC0C0", // northWindBlue
    "#9966FF", // irrigoPurple
    "#FF9F40", // hawaiianPassionOrange
    "#FF6340", // halloweenOrange
    "#36A284", // gossamerGreen
    "#FFCE84", // equatorialYellow
    "#4BC0FF", // glitterLakeBlue
    "#996640", // frappeAuChocolatBrown
    "#FF9F84", // orchidOrange
  ];

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
