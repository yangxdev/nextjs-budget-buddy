import InfoChartLineClient from "./InfoChartLineClient";

export default async function InfoChartLine(props: { data: any, title: string}) {
    const data = props.data;
    console.log("data", data);
    const orderedDataByDate = Array.isArray(data) ? data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
    console.log("orderedDataByDate", orderedDataByDate);

    const incrementalAmounts = orderedDataByDate.map((entry: { amount: number }, index: number) => {
        return orderedDataByDate.slice(0, index + 1).reduce((acc: number, entry: { amount: number }) => acc + entry.amount, 0);
    }
    );
    console.log("incrementalAmounts", incrementalAmounts);

    const labels = orderedDataByDate.map((entry: { date: string }) => new Date(entry.date).toLocaleDateString());
    const chartLabel = props.title;

    return (
        <div>
            <InfoChartLineClient labels={labels} rawData={incrementalAmounts} title={chartLabel}/>
        </div>
    )
}