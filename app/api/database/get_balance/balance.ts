import { income } from "@/app/app.config";
import { getConvertedIncomesByDateRange, getIncomeDataByDateRange } from "../get_incomes/incomes";
import { getConvertedPaymentsByDateRange, getPaymentDataByDateRange } from "../get_payments/payments";
import CurrencyConverter from "@/app/utils/currencyConverter";
import GlobalConfig from "@/app/app.config";

// this returns a single balance for the date range
export async function getBalanceByDateRange(startDate: string, endDate: string) {
    const incomeData = await getConvertedIncomesByDateRange(new Date(startDate), new Date(endDate));
    const paymentData = await getConvertedPaymentsByDateRange(new Date(startDate), new Date(endDate));
    const balance = (incomeData.reduce((a: number, b: number) => a + b, 0) - paymentData.reduce((a: number, b: number) => a + b, 0)).toFixed(2);
    return balance;
}

// this returns an array of balance data for each day in the date range
export async function getBalanceDataByDateRange(startDate: string, endDate: string) {
    const incomeDataRaw = await getIncomeDataByDateRange(startDate, endDate);
    const expensesDataRaw = await getPaymentDataByDateRange(startDate, endDate);
    const incomeData = incomeDataRaw.incomes;
    const expensesData = expensesDataRaw.payments;
    const balanceData: { [date: string]: number } = {};

    // Iterate over income data and add to balance
    for (const income of incomeData) {
        if (!balanceData[income.date]) {
            balanceData[income.date] = 0;
        }
        balanceData[income.date] += income.amount;
    }

    // Iterate over expenses data and subtract from balance
    for (const expense of expensesData) {
        if (!balanceData[expense.date]) {
            balanceData[expense.date] = 0;
        }
        balanceData[expense.date] -= expense.amount;
    }

    console.log("balance data", balanceData);
}
