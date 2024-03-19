import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const result = await sql`CREATE TABLE incomes (
            id SERIAL PRIMARY KEY,
            source VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            currency VARCHAR(3) NOT NULL,
            category VARCHAR(255) NOT NULL,
            notes TEXT
        );`;
        console.log(result);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}