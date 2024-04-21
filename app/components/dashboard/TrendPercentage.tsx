import CurrencyConverter from "@/app/utils/currencyConverter";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import GlobalConfig from "@/app/app.config";
import { skip } from "node:test";

export default async function TrendPercentage(props: { data: any; skipConversion?: boolean; useBalance?: boolean }) {
    const data = props.data;
    const orderedDataByDate = Array.isArray(data) ? data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
    let amounts = orderedDataByDate.map((entry: number) => entry);
    
    if (!props.skipConversion) {
        const convertedOrderedDataByDate = await CurrencyConverter({ data: orderedDataByDate, currency: GlobalConfig.currency.baseCurrency });
        amounts = convertedOrderedDataByDate.map((entry: number) => entry);
    }
    if (amounts.length <= 1) {
        return null;
    }
    let firstDay, currentDay;
    if (!props.useBalance) {
        firstDay = amounts[0].amount;
        currentDay = amounts[amounts.length - 1].amount;
    } else {
        firstDay = amounts[0].balance;
        currentDay = amounts[amounts.length - 1].balance;
    }

    const percentageRaw = ((currentDay - firstDay) / firstDay) * 100;
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
