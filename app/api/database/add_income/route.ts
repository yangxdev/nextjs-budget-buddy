import { getDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { type, source, date, amount, currency, category, notes } = await request.json();
    const userId = "000000000000000000000001";
    const now = new Date();
    try {
        const db = getDb();
        const result = await db.collection("incomes").insertOne({
            type,
            date: new Date(date),
            source,
            amount: parseFloat(amount),
            currency,
            category,
            notes: notes || null,
            createdAt: now,
            updatedAt: now,
            userId,
        });
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
