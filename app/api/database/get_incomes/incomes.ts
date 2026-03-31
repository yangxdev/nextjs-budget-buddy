import { cache } from "react";

import GlobalConfig from "@/app/app.config";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import { getDb } from "@/lib/mongodb";

const _getIncomeDataByQuantity = cache(async (quantity: number) => {
    const db = getDb();
    const incomes = await db.collection("incomes").find().sort({ date: -1 }).limit(quantity).toArray();
    return { incomes };
});

export async function getIncomeDataByQuantity(quantity: number) {
    return _getIncomeDataByQuantity(quantity);
}

const _getIncomeDataByDateRange = cache(async (startDay: string, endDay: string) => {
    const db = getDb();
    const incomes = await db.collection("incomes").find({
        date: {
            $gte: new Date(startDay + "T00:00:00.000Z"),
            $lte: new Date(endDay + "T23:59:59.999Z"),
        },
    }).toArray();
    return { incomes };
});

export async function getIncomeDataByDateRange(startDate: string, endDate: string) {
    const startDay = new Date(startDate).toISOString().split("T")[0];
    const endDay = new Date(endDate).toISOString().split("T")[0];
    return _getIncomeDataByDateRange(startDay, endDay);
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