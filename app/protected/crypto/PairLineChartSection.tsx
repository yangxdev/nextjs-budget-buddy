import { setSelectedCryptoPair } from "@/app/features/selectedCryptoPair/selectedCryptoPairSlice";
import { RootState } from "@/app/store/store";
import { Form, Radio, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoChartLine from "@/app/charts/InfoChartLine";
import InfoChartLineServerCrypto from "./InfoChartLineServerCrypto";
import InfoChartLineClientCrypto from "./InfoChartLineClientCrypto";
import { ScriptableContext } from "chart.js";
import InfoChartLineCrypto from "@/app/charts/InfoChartLineCrypto";

export default function PairLineChartSection(props: { pairs: string[] }) {
    const pairs = props.pairs;
    const lineColor = "31, 157, 85";
    const dispatch = useDispatch();
    const handleSelectedCryptoPair = (value: string) => {
        dispatch(setSelectedCryptoPair(value));
    };
    const [selectedPairHistoricalData, setSelectedPairHistoricalData] = React.useState<any[]>([]);

    const [selectedHistoricalDataRange, setSelectedHistoricalDataRange] = React.useState<number>(7);

    const selectedCryptoPair = useSelector((state: RootState) => state.selectedCryptoPair.value);
    // useEffect(() => {
    //     if (selectedCryptoPair) {
    //         fetchHistoricalData(selectedCryptoPair).then((data) => {
    //             setOpenTimes(data.map((d: any) => d[0]));
    //             setCloseTimes(data.map((d: any) => d[6]));
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

    useEffect(() => {
        if (selectedCryptoPair) {
            fetchHistoricalData(selectedCryptoPair).then((data) => {
                setSelectedPairHistoricalData(data);
            });
        }
        console.log("Selected pair historical data:", selectedPairHistoricalData);
    }, [selectedHistoricalDataRange]);

    const gradient = (ctx: CanvasRenderingContext2D, chartArea: { top: number; bottom: number }) => {
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, `rgba(${lineColor}, -1)`);
        gradient.addColorStop(1, `rgba(${lineColor}, 0.4)`);
        return gradient;
    };

    const labels = selectedPairHistoricalData.map((entry: any) => new Date(entry[0]).toLocaleDateString());
    const datasets = [
        {
            label: selectedCryptoPair,
            data: selectedPairHistoricalData.map((entry: any) => entry[4]),
            borderColor: `rgba(${lineColor}, 1)`,
            borderWidth: 3,
            backgroundColor: (context: ScriptableContext<"line">) => gradient(context.chart.ctx, context.chart.chartArea),
            fill: true,
        },
    ];

    return (
        <div>
            <Form.Item label="Pair" name="pair" style={{ justifyContent: "space-between" }}>
                <Select
                    style={{ marginBottom: 0, display: "inline-block", width: "calc(40% - 8px)", marginRight: "10px" }}
                    showSearch
                    placeholder="Select a pair"
                    optionFilterProp="children"
                    defaultValue={selectedCryptoPair}
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
            <div>
                <div>
                    <Radio.Group
                        defaultValue={7}
                        buttonStyle="solid"
                        // value={selectedHistoricalDataRange}
                        onChange={(e) => {
                            setSelectedHistoricalDataRange(e.target.value);
                        }}
                    >
                        <Radio.Button value={7}>7 days</Radio.Button>
                        <Radio.Button value={14}>14 days</Radio.Button>
                        <Radio.Button value={30}>30 days</Radio.Button>
                    </Radio.Group>
                </div>

                <div className="flex flex-row">
                    <InfoChartLineCrypto labels={labels} datasets={datasets} />
                </div>
            </div>
        </div>
    );
}
