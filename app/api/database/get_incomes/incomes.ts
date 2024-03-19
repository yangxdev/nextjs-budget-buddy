import { PrismaClient } from "@prisma/client";

export async function getIncomeData() {
    const prisma = new PrismaClient();
    const incomes = await prisma.income.findMany();

    return {
        incomes,
    };
}