import {
    getCheapestExpense,
    getCheapestExpenseStore,
    getConvertedExpensesFromData,
    getMostExpensiveCategory,
    getMostExpensiveCategorySum,
    getMostExpensiveExpense,
    getMostExpensiveExpenseStore,
    getMostFrequentExpenseCount,
    getMostFrequentExpenseStore,
    getExpenseDataAndConversionRates,
    getAverageExpenseAmount,
    getTotalExpensesMade,
    getMostExpensiveMonth,
} from "@/app/api/database/get_expenses/expenses";
import GlobalConfig from "@/app/app.config";
import { format } from "date-fns";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.expenseInfoInsights;

export default async function ExpenseInfoInsights() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const expenseRawData = await getExpenseDataAndConversionRates(firstDayOfYear, today);
    const expenseData = expenseRawData.expenseData;
    const conversionRates = expenseRawData.conversionRates;

    const convertedExpensesThisYear = await getConvertedExpensesFromData(expenseData, conversionRates);

    function checkIfExpensesAreEmpty() {
        return convertedExpensesThisYear?.length === 0;
    }

    return (
        <div className="p-5 bg-white border-[1px] border-lightBorder min-w-60 w-fit rounded-2xl text-sm select-none h-min">
            <div className="text-lg font-semibold select-none mb-2">{gc?.title}</div>
            {checkIfExpensesAreEmpty() ? (
                <div className="text-left text-sm">{gc?.noExpenseDataAvailable}</div>
            ) : (
                <div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-4">
                            {/* Most Expensive Expense */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostExpensiveExpense}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                    <div>
                                        {await getMostExpensiveExpense(expenseData)}
                                        {(await getMostExpensiveExpenseStore(expenseData)) && (
                                            <span className="">
                                                {" " + gc?.at} {await getMostExpensiveExpenseStore(expenseData)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Most Expensive Category */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostExpensiveCategory}</div>
                                <div className="flex flex-col font-semibold text-base justify-start">
                                    <div>{await getMostExpensiveCategory(expenseData)}</div>
                                    <div className="flex flex-row">
                                        {(await getMostExpensiveCategorySum(expenseData)) > 1 && (
                                            <>
                                                <div className="px-1">
                                                    {"("}
                                                    {GlobalConfig.currency.baseCurrency}
                                                </div>
                                                <div>
                                                    {await getMostExpensiveCategorySum(expenseData)} {" " + gc?.spent}
                                                    {")"}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Most expensive month */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostExpensiveMonth}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    {format(new Date(1970, parseInt(await getMostExpensiveMonth(expenseData)), 1), 'MMMM')}
                                </div>
                            </div>

                            {/* Most Frequent Expense */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostFrequentExpense}</div>
                                <div className="flex flex-row font-semibold text-base justify-start gap-1">
                                    {await getMostFrequentExpenseStore(expenseData)}
                                    {(await getMostFrequentExpenseCount(expenseData)) > 1 && (
                                        <span>
                                            {"("}
                                            {await getMostFrequentExpenseCount(expenseData)} {" " + gc?.times}
                                            {")"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Cheapest Expense */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.cheapestExpense}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                    <div>
                                        {await getCheapestExpense(expenseData)}
                                        {(await getCheapestExpenseStore(expenseData)) && (
                                            <span className="">
                                                {" " + gc?.at} {await getCheapestExpenseStore(expenseData)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Average Expense Amount */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.averageExpenseAmount}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                    <div>{await getAverageExpenseAmount(expenseData)}</div>
                                </div>
                            </div>

                            {/* Total Expenses Made */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.totalExpensesMade}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div>
                                        {await getTotalExpensesMade(expenseData)}
                                        {" " + (await getTotalExpensesMade(expenseData) === 1 ? gc?.expense : gc?.expenses)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// DONE: Most expensive month
// TODO: Expenses amount per week/month chart below the insights