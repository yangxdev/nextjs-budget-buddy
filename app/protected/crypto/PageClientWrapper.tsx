"use client";
import { Provider, useDispatch } from "react-redux";
import AddCryptoSection from "./AddCryptoSection";
import InfoChartLine from "./InfoChartLineServerCrypto";
import { store } from "@/app/store/store";
import PairLineChartSection from "./PairLineChartSection";

export default function PageClientWrapper(props: { symbols: string[]; pairs: string[] }) {
    const symbols = props.symbols;
    const pairs = props.pairs;

    return (
        <Provider store={store}>
            <div className="w-full flex gap-4 flex-col">
                <AddCryptoSection symbols={symbols} />
                {/* <InfoChartLine data={} title="Income" lineColor="31, 157, 85" /> */}
                <PairLineChartSection pairs={pairs} />
            </div>
        </Provider>
    );
}
