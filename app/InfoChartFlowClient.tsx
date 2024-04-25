"use client";
import InfoChartFlow from "./charts/InfoChartFlow";

export default function InfoChartFlowClient(props: { labels: any; incomeData: any; expenseData: any; title: string }) {
    const labels = props.labels;
    const incomeAmounts = props.incomeData;
    const expenseAmounts = props.expenseData;

    const summedMonths = labels.map((_: any, i: number) => {
        return (incomeAmounts[i] + expenseAmounts[i]).toFixed(2);
    });
    const summedMonthsNumbers = summedMonths.map((x: string) => isNaN(parseFloat(x)) ? 0 : parseFloat(x));
    const max = Math.max(...summedMonthsNumbers);
    const tickValue = Math.ceil(max / 5);

    function checkEmpty(): boolean {
        return incomeAmounts.length === 0 && expenseAmounts.length === 0;
    }

    const datasets = [
        {
            label: "Expenses",
            data: expenseAmounts,
            borderColor: (`rgba(20, 85, 251, 1)`),
            backgroundColor: "rgba(20, 85, 251, 1)",
            borderRadius: 6,

        },
        {
            label: "Income",
            data: incomeAmounts,
            borderColor: (`rgba(68, 121, 255, 1)`),
            backgroundColor: "rgba(68, 121, 255, 1)",
            borderRadius: 6,
        },
    ];

    return (
        <>
            {checkEmpty() && <div>No data available</div>}
            {!checkEmpty() && <InfoChartFlow labels={labels} datasets={datasets} ticks={tickValue} />}
        </>
    );
}