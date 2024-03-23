import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import GlobalConfig from "@/app/app.config";

export async function middleware(request: NextRequest) {
    const storedRates = cookies().get("conversionRates");
    const storedDate = cookies().get("conversionRatesDate");
    if (
        storedRates?.value === '' ||
        isNaN(Date.parse(storedDate?.value ?? '')) ||
        new Date(storedDate?.value ?? '').toLocaleDateString() < new Date().toLocaleDateString()
    ) {
        const response = NextResponse.next();
        const APIresponse = await fetch(
            // `https://v6.exchangerate-api.com/v6/9c90d2094ff9dfae6d61f3c8/latest/${GlobalConfig.baseCurrency}`
            `https://v6.exchangerate-api.com/v6/36cc2903270ba2aebf936568/latest/${GlobalConfig.baseCurrency}`
            // `https://api.currencyapi.com/v3/latest?apikey=cur_live_Wd7lJ5fDp4usf8KYc2wU6bHOtEx0arplQcw1mYcF`
        );
        const data = await APIresponse.json();
        const rates = data.conversion_rates;

        response.cookies.set("conversionRates", JSON.stringify(rates));
        response.cookies.set(
            "conversionRatesDate",
            new Date().toISOString().split("T")[0]
        );
        return response;
    }
}

export const config = {
    matcher: "/p/income",
};
