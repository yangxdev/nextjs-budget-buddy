export async function getConversionRatesByArray(currencies: string[], baseCurrency: string) {
    const conversionRates: Record<string, number> = {};
    const response = await fetch(`https://v6.exchangerate-api.com/v6/9c90d2094ff9dfae6d61f3c8/latest/EUR`);
    const data = await response.json();
    currencies.forEach((currencyCode) => {
        if (currencyCode !== baseCurrency) {
            conversionRates[currencyCode] = data.conversion_rates[currencyCode];
        }
    });
    return conversionRates;
}

export async function getCurrenciesFromArray(incomeData: { incomes: any; }) {
    const currencies = [
        ...new Set(incomeData.incomes.map((income: { currency: any; }) => income.currency)),
    ];
    return currencies;
}