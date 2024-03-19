import { PrismaClient } from "@prisma/client";

export async function getIncomeData(quantity: number) {
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
