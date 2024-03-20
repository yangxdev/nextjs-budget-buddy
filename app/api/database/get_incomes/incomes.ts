import { PrismaClient } from "@prisma/client";

export async function getIncomeDataByQuantity(quantity: number) {
    const prisma = new PrismaClient();
    const incomes = await prisma.income.findMany(
        {
            take: quantity,
            orderBy: {
                id: 'desc',
            },
        }
    );

    return {
        incomes,
    };
}

export async function getIncomeDataByDateRange(
    startDate: string,
    endDate: string
) {
    const prisma = new PrismaClient();
    const incomes = await prisma.income.findMany(
        {
            where: {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
        }
    );

    return {
        incomes,
    };
}

export async function convertRecordsByCurrency(incomes: any[], currency: string) {
    const prisma = new PrismaClient();
    // get the conversion rate of any currency different from parameter currency

    const currencies = [...new Set(incomes.map(income => income.currency))];
    console.log(currencies);
}