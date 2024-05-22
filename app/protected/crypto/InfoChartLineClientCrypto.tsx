"use client";
import { ScriptableContext } from "chart.js";
import InfoChartLine from "@/app/charts/InfoChartLine";

export default function InfoChartLineClientCrypto(props: { labels: any; rawData: any; title: string; lineColor: string }) {
    const labels = props.labels;
    const amounts = props.rawData;

    function checkEmpty(): boolean {
        if (amounts[0] === undefined && amounts[1] === undefined) {
            return true;
        }
        return amounts[0].length === 0 && amounts[1].length === 0;
    }

    const gradient = (ctx: CanvasRenderingContext2D, chartArea: { top: number; bottom: number }) => {
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, `rgba(${props.lineColor}, -1)`);
        gradient.addColorStop(1, `rgba(${props.lineColor}, 0.4)`);
        return gradient;
    };

    const datasets = [
        {
            label: props.title,
            data: amounts,
            borderColor: `rgba(${props.lineColor}, 1)`,
            borderWidth: 3,
            backgroundColor: (context: ScriptableContext<"line">) => gradient(context.chart.ctx, context.chart.chartArea),
            fill: true,
        },
    ];

    return (
        <>
            {checkEmpty() && <div>No data available</div>}
            {!checkEmpty() && <InfoChartLine labels={labels} datasets={datasets} />}
        </>
    );
}
