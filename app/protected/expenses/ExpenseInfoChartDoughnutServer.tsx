import { getConvertedExpensesByDateRange, getExpenseDataByDateRange } from "@/app/api/database/get_expenses/expenses";
import GlobalConfig from "@/app/app.config";
import ExpenseInfoChartDoughnutClient from "./ExpenseInfoChartDoughnutClient";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.expenseInfoChart;

/**
 * Expense information graph component
 * Displays expense information over the last week, month and year
 */
export default async function ExpenseInfoChartDoughnutServer(): Promise<JSX.Element> {
    // get first day of the current year, month and week
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    // get all the already converted expenses (from first day of year to today)
    const convertedExpenseYearly = await getConvertedExpensesByDateRange(firstDayOfYear, today);
    // get all the non-converted expenses (from first day of year to today)
    const nonConvertedExpenseYearly = await getExpenseDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    // get all the unique categories from the expense data
    const categoriesYearly = [...new Set(nonConvertedExpenseYearly.expenses.map((expense: { category: any }) => expense.category))];
    // create an array of the total amount of each category, rounded to 2 decimal places
    const datasetsDataYearly = categoriesYearly.map((category, _index) => {
        return convertedExpenseYearly
            .filter((_expense: any, expenseIndex: number) => nonConvertedExpenseYearly.expenses[expenseIndex].category === category)
            .reduce((acc: number, expense: number) => acc + expense, 0)
            .toFixed(2);
    });

    const convertedExpenseMonthly = await getConvertedExpensesByDateRange(firstDayOfMonth, today);
    const nonConvertedExpenseMonthly = await getExpenseDataByDateRange(firstDayOfMonth.toISOString(), today.toISOString());
    const categoriesMonthly = [...new Set(nonConvertedExpenseMonthly.expenses.map((expense: { category: any }) => expense.category))];
    const datasetsDataMonthly = categoriesMonthly.map((category, _index) => {
        return convertedExpenseMonthly
            .filter((_expense: any, expenseIndex: number) => nonConvertedExpenseMonthly.expenses[expenseIndex].category === category)
            .reduce((acc: number, expense: number) => acc + expense, 0)
            .toFixed(2);
    });

    const convertedExpenseWeekly = await getConvertedExpensesByDateRange(firstDayOfWeek, today);
    const nonConvertedExpenseWeekly = await getExpenseDataByDateRange(firstDayOfWeek.toISOString(), today.toISOString());
    const categoriesWeekly = [...new Set(nonConvertedExpenseWeekly.expenses.map((expense: { category: any }) => expense.category))];
    const datasetsDataWeekly = categoriesWeekly.map((category, _index) => {
        return convertedExpenseWeekly
            .filter((_expense: any, expenseIndex: number) => nonConvertedExpenseWeekly.expenses[expenseIndex].category === category)
            .reduce((acc: number, expense: number) => acc + expense, 0)
            .toFixed(2);
    });

    const convertedExpenseThreeYears = await getConvertedExpensesByDateRange(new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()), today);
    const nonConvertedExpenseThreeYears = await getExpenseDataByDateRange(new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()).toISOString(), today.toISOString());
    const categoriesThreeYears = [...new Set(nonConvertedExpenseThreeYears.expenses.map((expense: { category: any }) => expense.category))];
    const datasetsDataThreeYears = categoriesThreeYears.map((category, _index) => {
        return convertedExpenseThreeYears
            .filter((_expense: any, expenseIndex: number) => nonConvertedExpenseThreeYears.expenses[expenseIndex].category === category)
            .reduce((acc: number, expense: number) => acc + expense, 0)
            .toFixed(2);
    });

    const convertedExpenseAllTime = await getConvertedExpensesByDateRange(new Date(0), today);
    const nonConvertedExpenseAllTime = await getExpenseDataByDateRange(new Date(0).toISOString(), today.toISOString());
    const categoriesAllTime = [...new Set(nonConvertedExpenseAllTime.expenses.map((expense: { category: any }) => expense.category))];
    const datasetsDataAllTime = categoriesAllTime.map((category, _index) => {
        return convertedExpenseAllTime
            .filter((_expense: any, expenseIndex: number) => nonConvertedExpenseAllTime.expenses[expenseIndex].category === category)
            .reduce((acc: number, expense: number) => acc + expense, 0)
            .toFixed(2);
    });

    return (
        <div className="p-5 bg-white border-[1px] border-lightBorder max-w-80 min-w-80 rounded-2xl text-sm select-none h-min max-h-[35rem]">
            <div className="mb-2 justify-between flex flex-row">
                <div className="font-semibold text-lg">{gc?.title}</div>
            </div>
            <ExpenseInfoChartDoughnutClient datasets={[datasetsDataWeekly, datasetsDataMonthly, datasetsDataYearly, datasetsDataThreeYears, datasetsDataAllTime]} categories={[categoriesWeekly, categoriesMonthly, categoriesYearly, categoriesThreeYears, categoriesAllTime]} />
        </div>
    );
}

// DONE: align with income section once development is done for expense section
