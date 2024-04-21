import CurrencyConverter from "@/app/utils/currencyConverter";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { GiConsoleController } from "react-icons/gi";
import GlobalConfig from "@/app/app.config";

export default async function TrendPercentage(props: { data: any }) {
    const data = props.data;

    const orderedDataByDate = Array.isArray(data) ? data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
    const convertedOrderedDataByDate = await CurrencyConverter({ data: orderedDataByDate, currency: GlobalConfig.currency.baseCurrency });
    // const incrementalAmounts = convertedOrderedDataByDate.map((_entry: number, index: number) => {
    //     return convertedOrderedDataByDate.slice(0, index + 1).reduce((acc: number, entry: number) => acc + entry, 0);
    // });
    const amounts = convertedOrderedDataByDate.map((entry: number) => entry);
    const previousDay = amounts[amounts.length - 2];
    const currentDay = amounts[amounts.length - 1];
    // console.log(previousDay, currentDay);

    const percentageRaw = ((currentDay - previousDay) / previousDay) * 100;
    // remove the minus sign if the percentage is negative
    const percentage = percentageRaw < 0 ? Math.abs(percentageRaw) : percentageRaw;

    return (
        <>
            {percentage !== 0 && !isNaN(percentage) && (
                <div className="flex flex-row items-center font-semibold text-[14px] gap-1">
                    <div>{percentageRaw < 0 ? <FaArrowTrendDown /> : <FaArrowTrendUp />}</div>
                    <div>{percentage.toFixed(1)}%</div>
                </div>
            )}
        </>
    );
}
