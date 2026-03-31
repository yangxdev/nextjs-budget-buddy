import { NextRequest, NextResponse } from "next/server";
import GlobalConfig from "@/app/app.config";

let ratesCache: { rates: Record<string, number>; date: string } | null = null;

export async function middleware(request: NextRequest) {
    const today = new Date().toISOString().split("T")[0];

    if (!ratesCache || ratesCache.date !== today) {
        const APIresponse = await fetch(
            `https://v6.exchangerate-api.com/v6/36cc2903270ba2aebf936568/latest/${GlobalConfig.currency.baseCurrency}`
        );
        const data = await APIresponse.json();
        ratesCache = { rates: data.conversion_rates, date: today };
    }

    const response = NextResponse.next();
    response.cookies.set("conversionRates", JSON.stringify(ratesCache.rates));
    response.cookies.set("conversionRatesDate", ratesCache.date);
    return response;
}

export const config = {
    matcher: ["/p/income", "/p/expenses"],
};
