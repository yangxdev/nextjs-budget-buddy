import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";

export async function POST(request: Request) {
    const { source, date, amount, currency, category, notes } = await request.json();
    const id = createId();
    const userId = "cltyanrp50000rbp159e9j2i8";
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    try {
        const result = await sql`
            INSERT INTO expenses (id, date, source, amount, currency, category, notes, created_at, updated_at, user_id) 
            VALUES (${id}, ${date}, ${source}, ${amount}, ${currency}, ${category}, ${notes}, ${createdAt}, ${updatedAt}, ${userId})`;
        // console.log(result);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        // console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}