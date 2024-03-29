import { PrismaClient } from "@prisma/client";
import GlobalConfig from "@/app/app.config";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";

export async function getIncomeDataByQuantity(quantity: number) {
    const prisma = new PrismaClient();
    const incomes = await prisma.income.findMany({
        take: quantity,
        orderBy: {
            id: "desc",
        },
    });

    return {
        incomes,
    };
}

export async function getIncomeDataByDateRange(
    startDate: string,
    endDate: string
) {
    const prisma = new PrismaClient();
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

export async function getConvertedIncomes(startDate: Date, endDate: Date) {
    const incomeData = await getIncomeDataByDateRange(
        startDate.toISOString(),
        endDate.toISOString()
    );
    const currencies = [
        ...new Set(incomeData.incomes.map((income) => income.currency)),
    ];
    const conversionRates = await getConversionRatesByArray(
        currencies,
        GlobalConfig.baseCurrency
    );
    return incomeData.incomes.map((income) => {
        if (income.currency === GlobalConfig.baseCurrency) {
            return income.amount;
        } else {
            return income.amount / conversionRates[income.currency];
        }
    });
}
