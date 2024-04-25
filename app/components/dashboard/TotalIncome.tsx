import InfoChartLine from "@/app/InfoChartLineServer";
import { getConvertedIncomesByDateRange, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import GlobalConfig, { income } from "@/app/app.config";
import TrendPercentage from "./TrendPercentage";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function TotalIncome() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), 0, 1);

    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate);
    const year = new Date().getFullYear();

    const convertedIncomes = await getConvertedIncomesByDateRange(startDate, endDate);
    const totalIncome = convertedIncomes.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    const incomeDataByDateRangeRaw = await getIncomeDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const incomeDataByDateRange = incomeDataByDateRangeRaw.incomes;

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl text-sm select-none w-[22rem] h-[18rem]">
            <div className="flex flex-row justify-between select-none items-center">
                <div className="font-semibold text-lg">Total Income</div>
                <div className="text-sm">
                    From {monthName} {year}
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4 justify-between">
                <div className="total-balance ">
                    {Number(totalIncome) < 0 ? "-" : ""} {defaultCurrency} {Number(totalIncome) < 0 ? Math.abs(Number(totalIncome)) : Number(totalIncome)}
                </div>
                <div className="percentage text-newGreen-500">
                    <TrendPercentage data={incomeDataByDateRange} />
                </div>
            </div>
            <div className="mt-2">
                <InfoChartLine data={incomeDataByDateRange} title="Income" lineColor="31, 157, 85" />
            </div>
        </div>
    );
}
