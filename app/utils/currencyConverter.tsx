import { getConversionRatesByArray } from "../api/currency/currencies";

export default async function CurrencyConverter(props: { data: any; currency: string }) {
    const data = props.data;
    const currency = props.currency;

    const currencies = [...new Set(data.map((entry: { currency: any }) => entry.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], currency);
    const convertedData = data.map((entry: { currency: any; amount: any }) => {
        return entry.currency === currency ? entry.amount : entry.amount / conversionRates[entry.currency];
    });

    return convertedData;
}
