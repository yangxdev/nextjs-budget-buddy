"use client";
import InfoChart from "./charts/InfoChart";

export default function InfoChartVerticalBarClient(props: any) {
    const labels = props.labels;
    const datasets = props.datasets;

    function checkEmpty(): boolean {
        if (datasets[0] === undefined && datasets[1] === undefined) {
            return true;
        }
        return datasets[0].data.length === 0 && datasets[1].data.length === 0;
    }

    return (
        <>
            {checkEmpty() && <div>No data available</div>}
            {!checkEmpty() && <InfoChart labels={labels} datasets={datasets} />}
        </>
    )
}