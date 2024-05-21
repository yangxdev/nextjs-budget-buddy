import { setSelectedCryptoPair } from "@/app/features/selectedCryptoPair/selectedCryptoPairSlice";
import { RootState } from "@/app/store/store";
import { Form, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PairLineChartSection(props: { pairs: string[] }) {
    const pairs = props.pairs;
    const dispatch = useDispatch();
    const handleSelectedCryptoPair = (value: string) => {
        console.log("Selected crypto pair:", value);
        dispatch(setSelectedCryptoPair(value));
    };
    const [selectedPairHistoricalData, setSelectedPairHistoricalData] = React.useState<any[]>([]);
    const [selectedHistoricalDataRange, setSelectedHistoricalDataRange] = React.useState<number>(7);

    const selectedCryptoPair = useSelector((state: RootState) => state.selectedCryptoPair.value);
    // useEffect(() => {
    //     if (selectedCryptoPair) {
    //         fetchHistoricalData(selectedCryptoPair).then((data) => {
    //             setSelectedPairHistoricalData(data);
    //         });
    //     }
    //     console.log("Selected pair historical data:", selectedPairHistoricalData);
    // }, [selectedCryptoPair]);
    const fetchHistoricalData = async (pair: string) => {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=1d&limit=${selectedHistoricalDataRange}`);
        const data = await response.json();
        return data;
    };
    setSelectedPairHistoricalData(await fetchHistoricalData(selectedCryptoPair));
    // TODO: continue here

    return (
        <div>
            <Form.Item label="Pair" name="pair" style={{ justifyContent: "space-between" }}>
                <Select
                    style={{ marginBottom: 0, display: "inline-block", width: "calc(40% - 8px)", marginRight: "10px" }}
                    showSearch
                    placeholder="Select a pair"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={(value) => {
                        handleSelectedCryptoPair(value as string);
                    }}
                >
                    {pairs.map((pair) => (
                        <Select.Option key={pair} value={pair}>
                            {pair}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {selectedCryptoPair && <div className="opacity-60 font-semibold">Selected pair: {selectedCryptoPair}</div>}
        </div>
    );
}
