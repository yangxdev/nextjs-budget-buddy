import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const result = await sql`CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Email VARCHAR(255)
);
        `;
        console.log(result);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}