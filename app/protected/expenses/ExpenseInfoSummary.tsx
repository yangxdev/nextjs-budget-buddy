import { getConvertedExpensesByDateRange } from "@/app/api/database/get_expenses/expenses";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.expenseInfoSummary;

export default async function ExpenseInfoSummary() {
    const today = new Date();
    const firstDayOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() // ! notice: it starts from Sunday
    );
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const convertedExpensesThisWeek = await getConvertedExpensesByDateRange(firstDayOfWeek, today);
    const convertedExpensesThisMonth = await getConvertedExpensesByDateRange(firstDayOfMonth, today);
    const convertedExpensesThisYear = await getConvertedExpensesByDateRange(firstDayOfYear, today);

    function checkIfExpensesAreEmpty() {
        return convertedExpensesThisWeek.length === 0 && convertedExpensesThisMonth.length === 0 && convertedExpensesThisYear.length === 0;
    }

    const sumThisYear = convertedExpensesThisYear.reduce((acc: number, expense: number) => acc + expense, 0);
    const sumThisMonth = convertedExpensesThisMonth.reduce((acc: number, expense: number) => acc + expense, 0);
    const sumThisWeek = convertedExpensesThisWeek.reduce((acc: number, expense: number) => acc + expense, 0);

    return (
        <div className="p-5 bg-white border-[1px] border-lightBorder max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
            <div className="text-lg font-bold select-none mb-2">{gc?.title}</div>
            {checkIfExpensesAreEmpty() ? (
                <div className="text-left text-sm">{gc?.noExpenseDataAvailable}</div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="font-normal">{gc?.thisYear}</div>
                        <div className={`flex flex-row font-semibold text-base ${sumThisYear > 0 ? "text-accentRed" : ""}`}>
                            {"-"}
                            <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
                            <div>{sumThisYear.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="font-normal">{gc?.thisMonth}</div>
                        <div className={`flex flex-row font-semibold text-base ${sumThisMonth > 0 ? "text-accentRed" : ""}`}>
                            {"-"}
                            <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
                            <div>{sumThisMonth.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="font-normal">{gc?.thisWeek}</div>
                        <div className={`flex flex-row font-semibold text-base ${sumThisWeek > 0 ? "text-accentRed" : ""}`}>
                            {"-"}
                            <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
                            <div>{sumThisWeek.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
