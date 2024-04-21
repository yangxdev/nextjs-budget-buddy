import InfoChartLineClient from "./InfoChartLineClient";

export default async function InfoChartLine(props: { data: any, title: string, lineColor: string }) {
    const data = props.data;
    const orderedDataByDate = Array.isArray(data) ? data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];

    // const incrementalAmounts = orderedDataByDate.map((entry: { amount: number }, index: number) => {
    //     return orderedDataByDate.slice(0, index + 1).reduce((acc: number, entry: { amount: number }) => acc + entry.amount, 0);
    // }
    // );
    const amounts = orderedDataByDate.map((entry: { amount: number }) => entry.amount);
    
    const labels = orderedDataByDate.map((entry: { date: string }) => new Date(entry.date).toLocaleDateString());
    const chartLabel = props.title;

    if (orderedDataByDate.length <= 1) {
        return "Not enough data to display chart.";
    }

    return (
        <div>
            <InfoChartLineClient labels={labels} rawData={amounts} title={chartLabel} lineColor={props.lineColor}/>
        </div>
    )
}