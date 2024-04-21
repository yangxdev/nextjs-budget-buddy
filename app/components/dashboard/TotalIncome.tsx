import InfoChartLine from "@/app/InfoChartLineServer";
import { getConvertedIncomesByDateRange, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import GlobalConfig, { income } from "@/app/app.config";
import TrendPercentage from "./TrendPercentage";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function TotalIncome() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(firstDayOfMonth);
    const year = new Date().getFullYear();

    const convertedIncomesThisMonth = await getConvertedIncomesByDateRange(firstDayOfMonth, today);
    const totalIncomeThisMonth = convertedIncomesThisMonth.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    const incomeDataByDateRangeRaw = await getIncomeDataByDateRange(firstDayOfMonth.toISOString(), today.toISOString());
    const incomeDataByDateRange = incomeDataByDateRangeRaw.incomes;

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-[#eaecf0] rounded-2xl text-sm select-none w-[20rem] h-fit">
            <div className="flex flex-row justify-between select-none items-center">
                <div className="font-semibold text-lg">Total Income</div>
                <div className="text-sm">
                    {monthName} {year}
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4 justify-between">
                <div className="total-balance ">
                    {Number(totalIncomeThisMonth) < 0 ? "-" : ""} {defaultCurrency} {Number(totalIncomeThisMonth) < 0 ? Math.abs(Number(totalIncomeThisMonth)) : Number(totalIncomeThisMonth)}
                </div>
                <div className="percentage text-newBlue-500">
                    <TrendPercentage data={incomeDataByDateRange} />
                </div>
            </div>
            <div className="mt-2">
                <InfoChartLine data={incomeDataByDateRange} title="Income" lineColor="20, 85, 251" />
            </div>
        </div>
    );
}
