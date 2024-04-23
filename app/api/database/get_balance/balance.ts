import { income } from "@/app/app.config";
import { getConvertedIncomesByDateRange, getIncomeDataByDateRange } from "../get_incomes/incomes";
import { getConvertedExpensesByDateRange, getExpenseDataByDateRange } from "../get_expenses/expenses";
import CurrencyConverter from "@/app/utils/currencyConverter";
import GlobalConfig from "@/app/app.config";

// this returns a single balance for the date range
export async function getBalanceByDateRange(startDate: string, endDate: string) {
    const incomeData = await getConvertedIncomesByDateRange(new Date(startDate), new Date(endDate));
    const expenseData = await getConvertedExpensesByDateRange(new Date(startDate), new Date(endDate));
    const balance = (incomeData.reduce((a: number, b: number) => a + b, 0) - expenseData.reduce((a: number, b: number) => a + b, 0)).toFixed(2);
    return balance;
}

// this returns an array of balance data for each day in the date range
export async function getBalanceDataByDateRange(startDate: string, endDate: string) {
    const incomeDataRaw = await getIncomeDataByDateRange(startDate, endDate);
    const expensesDataRaw = await getExpenseDataByDateRange(startDate, endDate);
    const incomeData = incomeDataRaw.incomes;
    const expensesData = expensesDataRaw.expenses;
    const convertedIncomeData = await CurrencyConverter({ data: incomeData, currency: GlobalConfig.currency.baseCurrency });
    const convertedExpensesData = await CurrencyConverter({ data: expensesData, currency: GlobalConfig.currency.baseCurrency });

    const incomeDataMappedByDate = convertedIncomeData.reduce((acc: any, income: any) => {
        const date = new Date(income.date).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + income.amount;
        return acc;
    }, {});

    const expensesDataMappedByDate = convertedExpensesData.reduce((acc: any, expense: any) => {
        const date = new Date(expense.date).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + expense.amount;
        return acc;
    }, {});

    const sortedIncomeDataMappedByDate = Object.entries(incomeDataMappedByDate).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()).reduce((acc: any, [date, amount]: [string, unknown]) => {
        acc[date] = amount;
        return acc;
    }, {});

    const sortedExpensesDataMappedByDate = Object.entries(expensesDataMappedByDate).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()).reduce((acc: any, [date, amount]: [string, unknown]) => {
        acc[date] = amount;
        return acc;
    }, {});

    const allDates = [...new Set([...Object.keys(sortedIncomeDataMappedByDate), ...Object.keys(sortedExpensesDataMappedByDate)])];
    allDates.sort();

    const incrementalBalanceDataMappedByDate = allDates.reduce((acc: any, date: string, index: number) => {
        const previousDate = allDates[index - 1];
        const previousBalance = acc[previousDate] || 0;
        const income = sortedIncomeDataMappedByDate[date] || 0;
        const expenses = sortedExpensesDataMappedByDate[date] || 0;
        acc[date] = previousBalance + income - expenses;
        return acc;
    }, {});

    return incrementalBalanceDataMappedByDate;
}
