import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import AddCryptoSection from "./AddCryptoSection";

export default async function Debt() {
    const fetchCryptos = async () => {
        const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
        const data: { symbols: { baseAsset: string, quoteAsset: string }[] } = await response.json();
        const allSymbols = data.symbols.flatMap((symbol) => [symbol.baseAsset, symbol.quoteAsset]);
        const uniqueSymbols = [...new Set(allSymbols)];
        return uniqueSymbols;
    };

    const cryptos: string[] = await fetchCryptos();

    return (
        <>
            <div className="">
                <div className="flex flex-row items-center gap-2 px-[1rem] py-2">
                    <AddCryptoSection cryptos={cryptos} />
                </div>
            </div>
        </>
    );
}
