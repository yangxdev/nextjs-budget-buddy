"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import GlobalConfig from "@/app/app.config";
import addRandomExpenses from "@/app/api/database/add_random_expenses/addRandomExpenses";
import { useRouter } from "next/navigation";
import VanillaTilt from "vanilla-tilt";
import { CgDice5 } from "react-icons/cg";
import { Button, DatePicker, Form, Input, Select, FormProps, message, Popconfirm } from "antd";
import type { PopconfirmProps } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import dayjs, { Dayjs } from "dayjs";

const { TextArea } = Input;

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.addExpense?.addExpenseForm;

export default function AddExpense() {
    const router = useRouter();

    const currentDate = new Date().toISOString().substring(0, 10);
    const momentDate = dayjs(currentDate);

    const [isLoading, setIsLoading] = useState(false);

    type FieldType = {
        date: Dayjs;
        source: string;
        amount: number;
        currency: string;
        category: string;
        notes: string;
    };

    const handleSubmit: FormProps<FieldType>["onFinish"] = (values) => {
        setIsLoading(true);
        console.log("Received values of form: ", values);

        const { date, source, amount, currency, category, notes } = values;

        const responsePromise = fetch("/api/database/add_expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "expense",
                source,
                date: date.toISOString(),
                amount,
                currency,
                category,
                notes,
            }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            setIsLoading(false);
            router.refresh();
            return response;
        });

        toast.promise(
            responsePromise,
            {
                loading: "Saving...",
                success: "Expense added successfully",
                error: "Error when adding expense",
            },
            {}
        );
    };

    const handleSubmitFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const confirm: PopconfirmProps["onConfirm"] = () => {
        addRandomExpenses();
        message.success("10 entries added successfully");
    };

    const cancel: PopconfirmProps["onCancel"] = () => {
        message.error("Add entries cancelled");
    };

    const elementRef = useRef(null);

    useEffect(() => {
        // if (elementRef.current) {
        //   VanillaTilt.init(elementRef.current, {
        //     max: 5,
        //     speed: 200,
        //   });
        // }
    }, []);

    const formInitialValues = {
        date: momentDate,
        source: "",
        amount: "",
        currency: GlobalConfig.currency.baseCurrency,
        category: GlobalConfig.expenses.expenseCategories[0],
        notes: "",
    };

    return (
        <StyleProvider hashPriority="high">
            <Form name="addExpenseForm" layout="vertical" className="bg-white border-[1px] border-lightBorder rounded-2xl" onFinish={handleSubmit} onFinishFailed={handleSubmitFailed} style={{ padding: "1.5rem" }} initialValues={formInitialValues}>
                <div className="font-bold pb-2 text-lg">{gc?.title}</div>
                <Form.Item label={gc?.date} name="date" rules={[{ required: true, message: "Please select a date" }]}>
                    <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item label={gc?.source} name="source" rules={[{ required: true, message: "Please enter a source" }]}>
                    <Input />
                </Form.Item>
                <div>
                    <Form.Item label={gc?.amount} name="amount" rules={[{ required: true, message: "Please enter an amount" }]} style={{ display: "inline-block", width: "calc(50%)", marginRight: "8px" }}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label={gc?.currency} name="currency" rules={[{ required: true, message: "Please select a currency" }]} style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: "0px" }}>
                        <Select style={{ width: "100%" }}>
                            {GlobalConfig.currency.currencies.map((currency, index) => (
                                <Select.Option key={index} value={currency}>
                                    {currency}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item label={gc?.category} name="category" rules={[{ required: true, message: "Please select a category" }]}>
                    <Select style={{ width: "100%" }}>
                        {GlobalConfig.expenses.expenseCategories.map((category, index) => (
                            <Select.Option key={index} value={category}>
                                {category}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label={gc?.notes} name="notes">
                    <TextArea rows={1} />
                </Form.Item>

                <div className="flex flex-row justify-end gap-2">
                    {GlobalConfig.debug.showAddRandomEntriesButton && (
                        <Popconfirm title="Add 10 random entries" description="Are you sure you want to add 10 random entries?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                            <Button type="dashed">
                                <CgDice5 />
                                {gc?.addRandom}
                            </Button>
                        </Popconfirm>
                    )}
                    <Button
                        onClick={() => {
                            toast.success("Fields reset", {});
                        }}
                        htmlType="reset"
                        type="default"
                        danger
                    >
                        {gc?.reset}
                    </Button>

                    <Button loading={isLoading} htmlType="submit" type="primary">
                        {gc?.add}
                    </Button>
                </div>
            </Form>
        </StyleProvider>
    );
}

// Thanks @phatify (https://github.com/ant-design/ant-design/issues/38794) for the StyleProvider fix, that solves the issue of Tailwind CSS overriding Ant Design's classes.
