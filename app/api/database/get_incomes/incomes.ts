import GlobalConfig from "@/app/app.config";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import { prisma } from "@/app/api/_base";

export async function getIncomeDataByQuantity(quantity: number) {
    const incomes = await prisma.income.findMany({
        take: quantity,
        orderBy: {
            date: "desc",
        },
    });

    return {
        incomes,
    };
}

export async function getIncomeDataByDateRange(startDate: string, endDate: string) {
    const incomes = await prisma.income.findMany({
        where: {
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
    });

    return {
        incomes,
    };
}

export async function getConvertedIncomesByDateRange(startDate: Date, endDate: Date) {
    const incomeData = await getIncomeDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const currencies = [...new Set(incomeData.incomes.map((income: { currency: any }) => income.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);
    return incomeData.incomes.map((income: { amount: number; currency: string }) => {
        if (income.currency === GlobalConfig.currency.baseCurrency) {
            return income.amount;
        } else {
            return income.amount / conversionRates[income.currency];
        }
    });
}

// getConvertedIncomesFromData but retains the structure of the original data
export async function getConvertedIncomesFromDataWithStructure(incomeData: any, conversionRates: any) {
    return incomeData?.incomes?.map((income: {
        date: any; amount: number; currency: string
    }) => {
        if (income.currency === GlobalConfig.currency.baseCurrency) {
            return {
                amount: income.amount,
                currency: income.currency,
                date: income.date,
            };
        } else {
            return {
                amount: income.amount / conversionRates[income.currency],
                currency: GlobalConfig.currency.baseCurrency,
                date: income.date,
            };
        }
    });
}

export async function getIncomeDataAndConversionRates(startDate: Date, endDate: Date) {
    const incomeData = await getIncomeDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const currencies = [...new Set(incomeData.incomes.map((income: { currency: any }) => income.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);

    return {
        incomeData,
        conversionRates,
    };
}

// TODO: align incomes.ts with expenses.ts