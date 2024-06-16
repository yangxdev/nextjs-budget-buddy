import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import AddCryptoSection from "./AddCryptoSection";
import InfoChartLine from "./InfoChartLineServerCrypto";
import PageClientWrapper from "./PageClientWrapper";

export default async function Crypto() {
    const fetchSymbols = async () => {
        const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
        const data: { symbols: { baseAsset: string; quoteAsset: string }[] } = await response.json();
        const allSymbols = data.symbols.flatMap((symbol) => [symbol.baseAsset, symbol.quoteAsset]);
        const uniqueSymbols = [...new Set(allSymbols)];
        return uniqueSymbols;
    };
    const symbols: string[] = await fetchSymbols();

    const fetchPairs = async () => {
        const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
        const data: { symbol: string }[] = await response.json();
        const pairs = data.map((pair) => pair.symbol);
        return pairs;
    }
    const pairs: string[] = await fetchPairs();

    return (
        <>
            <div className="flex flex-row items-center gap-2 px-[1rem] py-2">
                {/* <AddCryptoSection cryptos={cryptos} />
                <InfoChartLine data={} title="Income" lineColor="31, 157, 85" /> */}
                <PageClientWrapper symbols={symbols} pairs={pairs}/>
            </div>
        </>
    );
}

// TODO: show sidebar on hover
