import GlobalConfig from "@/app/app.config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getConversionRatesByArray(
    currencies: string[],
    baseCurrency: string
) {
    const conversionRates: Record<string, number> = {};
    const rates = cookies().get("conversionRates");
    const parsedRates = JSON.parse(rates?.value as string);

    currencies.forEach((currencyCode) => {
        if (currencyCode !== baseCurrency) {
            conversionRates[currencyCode] = parsedRates[currencyCode];
        }
    });
    return conversionRates;
}

export async function getCurrenciesFromArray(incomeData: { incomes: any }) {
    const currencies = [
        ...new Set(
            incomeData.incomes.map(
                (income: { currency: any }) => income.currency
            )
        ),
    ];
    return currencies;
}
