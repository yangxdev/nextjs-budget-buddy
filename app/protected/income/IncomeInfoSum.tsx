import {
    getConvertedIncomes,
    getIncomeDataByDateRange,
} from "@/app/api/database/get_incomes/incomes";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import GlobalConfig from "@/app/app.config";

export default async function IncomeInfoSum() {
    const today = new Date();
    const firstDayOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() // ! notice: it starts from sunday
    );
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const convertedIncomesThisWeek = await getConvertedIncomes(
        firstDayOfWeek,
        today
    );

    const convertedIncomesThisMonth = await getConvertedIncomes(
        firstDayOfMonth,
        today
    );

    const convertedIncomesThisYear = await getConvertedIncomes(
        firstDayOfYear,
        today
    );

    return (
        <div className="p-5 bg-[#313131] max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
            <div className="text-sm font-bold select-none mb-2">Summary</div>
            <div className="flex flex-col gap-2">
                
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="font-normal">This year</div>
                    <div className="flex flex-row font-semibold">
                        {"+"}
                        <div className="px-1">{GlobalConfig.baseCurrency}</div>
                        <div>
                            {convertedIncomesThisYear
                                .reduce((acc, income) => acc + income, 0)
                                .toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="font-normal">This month</div>
                    <div className="flex flex-row font-semibold">
                        {"+"}
                        <div className="px-1">{GlobalConfig.baseCurrency}</div>
                        <div>
                            {convertedIncomesThisMonth
                                .reduce((acc, income) => acc + income, 0)
                                .toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="font-normal">This week</div>
                    <div className="flex flex-row font-semibold">
                        {"+"}
                        <div className="px-1">{GlobalConfig.baseCurrency}</div>
                        <div>
                            {convertedIncomesThisWeek
                                .reduce((acc, income) => acc + income, 0)
                                .toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
