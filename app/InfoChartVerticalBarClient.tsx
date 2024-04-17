"use client";
import InfoChart from "./charts/InfoChart";

export default function InfoChartVerticalBarClient(props: any) {
    const labels = props.labels;
    const datasets = props.datasets;

    return (
        <InfoChart labels={labels} datasets={datasets} />
    )
}