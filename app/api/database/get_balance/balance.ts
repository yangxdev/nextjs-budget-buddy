import { getConvertedIncomesByDateRange } from "../get_incomes/incomes";
import { getConvertedPaymentsByDateRange } from "../get_payments/payments";

export async function getBalanceByDateRange(startDate: string, endDate: string) {
    const incomeData = await getConvertedIncomesByDateRange(new Date(startDate), new Date(endDate));
    const paymentData = await getConvertedPaymentsByDateRange(new Date(startDate), new Date(endDate));
    const balance = (incomeData.reduce((a: number, b: number) => a + b, 0) - paymentData.reduce((a: number, b: number) => a + b, 0)).toFixed(2);
    return balance;
}