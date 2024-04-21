import CurrencyConverter from "@/app/utils/currencyConverter";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import GlobalConfig from "@/app/app.config";

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
    let firstDay: number;
    let currentDay: number;
    if (!props.useBalance) {
        firstDay = (amounts[0] as unknown as { amount: number }).amount;
        currentDay = (amounts[amounts.length - 1] as unknown as { amount: number }).amount;
    } else {
        firstDay = (amounts[0] as unknown as { balance: number }).balance;
        currentDay = (amounts[amounts.length - 1] as unknown as { balance: number }).balance;
    }

    const percentage = Math.abs((Math.abs(currentDay - firstDay) / Math.abs(firstDay)) * 100);
    const trend = currentDay - firstDay;

    return (
        <>
            {percentage !== 0 && !isNaN(percentage) && (
                <div className="flex flex-row items-center font-semibold text-[14px] gap-1">
                    <div>{trend < 0 ? <FaArrowTrendDown /> : <FaArrowTrendUp />}</div>
                    <div>{percentage.toFixed(1)}%</div>
                </div>
            )}
        </>
    );
}
