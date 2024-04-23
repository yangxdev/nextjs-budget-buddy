import InfoChartLine from "@/app/InfoChartLineServer";
import { getConvertedExpensesByDateRange, getExpenseDataByDateRange } from "@/app/api/database/get_expenses/expenses";
import GlobalConfig, { expenses } from "@/app/app.config";
import TrendPercentage from "./TrendPercentage";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function TotalExpense() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), 0, 1);

    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate);
    const year = new Date().getFullYear();

    const convertedExpenses = await getConvertedExpensesByDateRange(startDate, endDate);
    const totalExpense = convertedExpenses.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    const expenseDataByDateRangeRaw = await getExpenseDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const expenseDataByDateRange = expenseDataByDateRangeRaw.expenses;

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl text-sm select-none w-[22rem] h-fit">
            <div className="flex flex-row justify-between select-none items-center">
                <div className="font-semibold text-lg">Total Expenses</div>
                <div className="text-sm">
                    From {monthName} {year}
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4 justify-between">
                <div className="total-balance">
                    {Number(totalExpense) < 0 ? "-" : ""} {defaultCurrency} {Number(totalExpense) < 0 ? Math.abs(Number(totalExpense)) : Number(totalExpense)}
                </div>
                <div className="percentage text-newRed-500">
                    <TrendPercentage data={expenseDataByDateRange} />
                </div>
            </div>
            <div className="mt-2">
                <InfoChartLine data={expenseDataByDateRange} title="Expenses" lineColor="241, 85, 74" />
            </div>
        </div>
    );
}

// TODO: change "expense" to "expenses", everywhere in the codebase
