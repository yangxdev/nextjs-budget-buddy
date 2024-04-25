import GlobalConfig from "@/app/app.config";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import { prisma } from "@/app/api/_base";

export async function getExpenseDataByQuantity(quantity: number) {
    const expenses = await prisma.expense.findMany({
        take: quantity,
        orderBy: {
            date: "desc",
        },
    });

    return {
        expenses,
    };
}

export async function getExpenseDataByDateRange(startDate: string, endDate: string) {
    const expenses = await prisma.expense.findMany({
        where: {
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
    });

    return {
        expenses,
    };
}

export async function getExpenseDataAndConversionRates(startDate: Date, endDate: Date) {
    const expenseData = await getExpenseDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const currencies = [...new Set(expenseData.expenses.map((expense: { currency: any }) => expense.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);

    return {
        expenseData,
        conversionRates,
    };
}

export async function getConvertedExpensesByDateRange(startDate: Date, endDate: Date) {
    const expenseData = await getExpenseDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const currencies = [...new Set(expenseData.expenses.map((expense: { currency: any }) => expense.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);
    return expenseData.expenses.map((expense: { amount: number; currency: string }) => {
        if (expense.currency === GlobalConfig.currency.baseCurrency) {
            return expense.amount;
        } else {
            return expense.amount / conversionRates[expense.currency];
        }
    });
}

export async function getConvertedExpensesFromData(expenseData: any, conversionRates: any) {
    return expenseData?.expenses?.map((expense: { amount: number; currency: string }) => {
        if (expense.currency === GlobalConfig.currency.baseCurrency) {
            return expense.amount;
        } else {
            return expense.amount / conversionRates[expense.currency];
        }
    });
}

// getConvertedExpensesFromData but retains the structure of the original data
export async function getConvertedExpensesFromDataWithStructure(expenseData: any, conversionRates: any) {
    return expenseData?.expenses?.map((expense: {
        date: any; amount: number; currency: string
    }) => {
        if (expense.currency === GlobalConfig.currency.baseCurrency) {
            return {
                amount: expense.amount,
                currency: expense.currency,
                date: expense.date,
            };
        } else {
            return {
                amount: expense.amount / conversionRates[expense.currency],
                currency: GlobalConfig.currency.baseCurrency,
                date: expense.date,
            };
        }
    });
}

export async function getMostExpensiveExpense(expenseData: any) {
    const mostExpensiveExpense = Math.max(...expenseData.expenses.map((expense: { amount: number }) => expense.amount));
    return mostExpensiveExpense;
}

export async function getMostExpensiveExpenseStore(expenseData: any) {
    const mostExpensiveExpense = Math.max(...expenseData.expenses.map((expense: { amount: number }) => expense.amount));
    const mostExpensiveExpenseIndex = expenseData.expenses.findIndex((expense: { amount: number }) => expense.amount === mostExpensiveExpense);
    const mostExpensiveExpenseStore = expenseData.expenses[mostExpensiveExpenseIndex].source;
    return mostExpensiveExpenseStore;
}

export async function getMostExpensiveCategory(expenseData: any) {
    const expenseCategories = expenseData?.expenses?.map((expense: { category: string }) => expense.category);
    const expenseCategoriesCount = expenseCategories.reduce((acc: any, curr: any) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const mostExpensiveExpenseCategory = Object.keys(expenseCategoriesCount).reduce((a, b) => (expenseCategoriesCount[a] > expenseCategoriesCount[b] ? a : b));

    return mostExpensiveExpenseCategory;
}

export async function getMostExpensiveCategorySum(expenseData: any) {
    const expenseCategories = expenseData?.expenses?.map((expense: { category: string }) => expense.category);
    const expenseCategoriesCount = expenseCategories.reduce((acc: any, curr: any) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const mostExpensiveExpenseCategory = Object.keys(expenseCategoriesCount).reduce((a, b) => (expenseCategoriesCount[a] > expenseCategoriesCount[b] ? a : b));

    const mostExpensiveExpenseCategorySum = expenseData?.expenses
        ?.filter((expense: { category: string }) => expense.category === mostExpensiveExpenseCategory)
        .reduce((acc: number, expense: { amount: number }) => acc + expense.amount, 0)
        .toFixed(2);

    return mostExpensiveExpenseCategorySum;
}

export async function getMostExpensiveMonth(expenseData: any) {
    const expenseMonths = expenseData?.expenses?.map((expense: { date: string }) => new Date(expense.date).getMonth());
    const expenseMonthsCount = expenseMonths.reduce((acc: any, curr: any) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const mostExpensiveMonth = Object.keys(expenseMonthsCount).reduce((a, b) => (expenseMonthsCount[a] > expenseMonthsCount[b] ? a : b));
    return mostExpensiveMonth;
}

export async function getMostFrequentExpenseStore(expenseData: any) {
    const expenseSources = expenseData?.expenses?.map((expense: { source: string }) => expense.source);
    const expenseSourcesCount = expenseSources.reduce((acc: any, curr: any) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentExpenseSource = Object.keys(expenseSourcesCount).reduce((a, b) => (expenseSourcesCount[a] > expenseSourcesCount[b] ? a : b));
    return mostFrequentExpenseSource;
}

export async function getMostFrequentExpenseCount(expenseData: any) {
    const expenseSources = expenseData?.expenses?.map((expense: { source: string }) => expense.source);
    const expenseSourcesCount = expenseSources.reduce((acc: any, curr: any) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentExpenseCount = Math.max(...Object.values(expenseSourcesCount).map((value: unknown) => Number(value)));
    return mostFrequentExpenseCount;
}

export async function getCheapestExpense(expenseData: any) {
    const cheapestExpense = Math.min(...expenseData.expenses.map((expense: { amount: number }) => expense.amount));
    return cheapestExpense;
}

export async function getCheapestExpenseStore(expenseData: any) {
    const cheapestExpense = Math.min(...expenseData.expenses.map((expense: { amount: number }) => expense.amount));
    const cheapestExpenseIndex = expenseData.expenses.findIndex((expense: { amount: number }) => expense.amount === cheapestExpense);
    const cheapestExpenseStore = expenseData.expenses[cheapestExpenseIndex].source;
    return cheapestExpenseStore;
}

export async function getAverageExpenseAmount(expenseData: any) {
    const averageExpenseAmount = (expenseData?.expenses?.reduce((acc: number, expense: { amount: number }) => acc + expense.amount, 0) / expenseData?.expenses?.length).toFixed(2);
    return averageExpenseAmount;
}

export async function getTotalExpensesMade(expenseData: any) {
    return expenseData?.expenses?.length;
}
