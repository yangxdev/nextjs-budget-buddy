import { getConvertedIncomesByDateRange, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.income?.incomeInfoSummary;

export default async function IncomeInfoSummary() {
    const today = new Date();
    const firstDayOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() // ! notice: it starts from Sunday
    );
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const convertedIncomesThisWeek = await getConvertedIncomesByDateRange(firstDayOfWeek, today);

    const convertedIncomesThisMonth = await getConvertedIncomesByDateRange(firstDayOfMonth, today);

    const convertedIncomesThisYear = await getConvertedIncomesByDateRange(firstDayOfYear, today);

    function checkIfIncomesAreEmpty() {
        return convertedIncomesThisWeek.length === 0 && convertedIncomesThisMonth.length === 0 && convertedIncomesThisYear.length === 0;
    }

    const sumThisYear = convertedIncomesThisYear.reduce((acc: number, income: number) => acc + income, 0);
    const sumThisMonth = convertedIncomesThisMonth.reduce((acc: number, income: number) => acc + income, 0);
    const sumThisWeek = convertedIncomesThisWeek.reduce((acc: number, income: number) => acc + income, 0);

    return (
        <div className="p-5 bg-white border-[1px] border-lightBorder max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
            <div className="text-lg font-semibold select-none mb-2">{gc?.title}</div>
            {checkIfIncomesAreEmpty() ? (
                <div className="text-left text-sm">{gc?.noIncomeDataAvailable}</div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="font-normal">{gc?.thisYear}</div>
                        <div className={`flex flex-row font-semibold ${sumThisYear > 0 ? "text-accentGreen" : ""}`}>
                            {"+"}
                            <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
                            <div>{sumThisYear.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="font-normal">{gc?.thisMonth}</div>
                        <div className={`flex flex-row font-semibold ${sumThisMonth > 0 ? "text-accentGreen" : ""}`}>
                            {"+"}
                            <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
                            <div>{sumThisMonth.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="font-normal">{gc?.thisWeek}</div>
                        <div className={`flex flex-row font-semibold ${sumThisWeek > 0 ? "text-accentGreen" : ""}`}>
                            {"+"}
                            <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
                            <div>{sumThisWeek.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
