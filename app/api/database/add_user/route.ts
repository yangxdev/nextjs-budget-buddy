import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { source, date, amount, currency, category, notes } = await request.json();
    try {
        const result = await sql`
            INSERT INTO income (source, date, amount, currency, category, notes) VALUES (${source}, ${date}, ${amount}, ${currency}, ${category}, ${notes})
        `;
        console.log(result);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}