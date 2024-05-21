"use client";
import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Space, Select, Spin } from "antd";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/app/store/store";
import { setAddModal } from "@/app/features/addModal/addModalSlice";
import { FaPlus } from "react-icons/fa6";
import "@/app/css/AddModal.css";

export default function AddCryptoSection(props: { cryptos: string[] }) {
    // const dispatch = useDispatch();
    // const addModal = useSelector((state: RootState) =>   state.addModal.value);
    const [selectedSymbol, setSelectedSymbol] = React.useState("");
    const [selectedSymbolValue, setSelectedSymbolValue] = React.useState<number>(0);
    const [selectingCrypto, setSelectingCrypto] = React.useState(false);
    const [insertedAmount, setInsertedAmount] = React.useState<number>(0);
    const cryptos = props.cryptos;
    const [showAddModal, setShowAddModal] = React.useState(false);

    useEffect(() => {
        setSelectingCrypto(true);

        const symbolValue = fetchCryptoValue(selectedSymbol);
        symbolValue.then((value: string) => {
            setSelectedSymbolValue(parseFloat(value));
        });
        setSelectingCrypto(false);
    }, [selectedSymbol]);

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setSelectedSymbol("");
        setSelectingCrypto(false);
        setInsertedAmount(0);
    };

    const formRef = React.useRef<any>(null);
    const onReset = () => {
        formRef.current.resetFields();
        setSelectedSymbol("");
        setSelectingCrypto(false);
        setInsertedAmount(0);
    };

    const handleSelectedCrypto = (value: string) => {
        setSelectedSymbol(value);
    };

    const handleSubmit = () => {
        const values = formRef.current.getFieldsValue();
        console.log("Values:", values);
        // dispatch(setAddModal(false));
        handleAddModalClose();
    };

    const fetchCryptoValue = async (symbol: string) => {
        if (!symbol || symbol === "") return;
        try {
            const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
            const data = await response.json();
            return data.price;
        } catch (error) {
            console.error("Error fetching the current value:", error);
        }
    };

    return (
        <>
            <div className="add-crypto">
                <Button
                    type="default"
                    className={`flex items-center w-fit bg-white `}
                    icon={<FaPlus />}
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                >
                    Add crypto
                </Button>
            </div>
            <Modal key={showAddModal ? "addModal" : null} open={showAddModal} onOk={handleAddModalClose} onCancel={handleAddModalClose} footer="">
                <div className="p-4 w-full rounded-md bg-white">
                    <div className="font-semibold mb-4 text-left text-lg">Add Crypto</div>
                    <Form onFinish={handleSubmit} name="addOrder" style={{ maxWidth: "500px" }} ref={formRef}>
                        <Form.Item label="Symbol" name="symbol" style={{ justifyContent: "space-between" }} rules={[{ required: true, message: "Please enter crypto name" }]}>
                            <Select
                                style={{ marginBottom: 0, display: "inline-block", width: "calc(40% - 8px)", marginRight: "10px" }}
                                showSearch
                                placeholder="Select a crypto"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={(value) => {
                                    handleSelectedCrypto(value as string);
                                    formRef.current.setFieldsValue({ symbol: value });
                                }}
                            >
                                {cryptos.map((crypto) => (
                                    <Select.Option key={crypto} value={crypto}>
                                        {crypto}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Form.Item rules={[{ required: false }]} style={{ marginBottom: 0, display: "inline-block", width: "calc(60% - 28px)" }}>
                                {selectedSymbolValue > 0 && selectingCrypto && <div className="opacity-60 font-semibold">Loading...</div>}
                                {selectedSymbolValue > 0 && !selectingCrypto && (
                                    <div className="opacity-60 font-semibold">
                                        {"1 "}
                                        {selectedSymbol + " "}≈ {selectedSymbolValue.toFixed(2)} USDT
                                    </div>
                                )}
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
                            <Input
                                type="number"
                                min={0}
                                style={{ display: "inlie-block", marginRight: "10px", width: "calc(40% - 8px)" }}
                                onChange={(value) => {
                                    setInsertedAmount(parseFloat(value.target.value));
                                    formRef.current.setFieldsValue({ amount: value.target.value });
                                }}
                                // disabled={!selectedSymbol}
                            />
                            <Form.Item style={{ marginBottom: 0, display: "inline-block", width: "calc(60% - 28px)" }}>
                                {selectedSymbol && Number.isNaN(selectedSymbolValue * insertedAmount) && insertedAmount > 0 && <div className="opacity-60 font-semibold">Loading...</div>}
                                {selectedSymbol && !Number.isNaN(selectedSymbolValue * insertedAmount) && insertedAmount > 0 && !selectingCrypto && (
                                    <div className="opacity-60 font-semibold">
                                        {insertedAmount + " " + selectedSymbol + " "}
                                        {"≈ "}
                                        {(selectedSymbolValue * insertedAmount).toFixed(2)} USDT
                                    </div>
                                )}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item className="text-right" style={{ marginBottom: 0 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button type="default" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
