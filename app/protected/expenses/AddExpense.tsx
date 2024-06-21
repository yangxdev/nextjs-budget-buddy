"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import GlobalConfig from "@/app/app.config";
import addRandomExpenses from "@/app/api/database/add_random_expenses/addRandomExpenses";
import { useRouter } from "next/navigation";
import VanillaTilt from "vanilla-tilt";
import { CgDice5 } from "react-icons/cg";
import { Button, DatePicker, Form, Input, Space, Select } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import dayjs from "dayjs";

const { TextArea } = Input;

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.addExpense?.addExpenseForm;

export default function AddExpense() {
    const currentDate = new Date().toISOString().substring(0, 10);
    const momentDate = dayjs(currentDate);

    const sourceRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const currencyRef = useRef<HTMLSelectElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const notesRef = useRef<HTMLTextAreaElement>(null);

    const router = useRouter();
    const handleSubmit = () => {
        const source = sourceRef.current?.value;
        const date = dateRef.current?.value;
        const amount = amountRef.current?.value;
        const currency = currencyRef.current?.value;
        const category = categoryRef.current?.value;
        const notes = notesRef.current?.value;

        if (!source || !date || !amount || !currency || !category) {
            toast.error("Please fill in all the required fields", {});
            return;
        }

        const responsePromise = fetch("/api/database/add_expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "expense",
                source,
                date,
                amount,
                currency,
                category,
                notes,
            }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
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

    const elementRef = useRef(null);

    useEffect(() => {
        // if (elementRef.current) {
        //   VanillaTilt.init(elementRef.current, {
        //     max: 5,
        //     speed: 200,
        //   });
        // }
    }, []);

    return (
        <StyleProvider hashPriority="high">
            {/* <div ref={elementRef} className="p-5 bg-white border-[1px] border-lightBorder max-w-80 rounded-2xl text-sm select-none h-min"> */}
            <Form name="addExpenseForm" layout="vertical" className="bg-white border-[1px] border-lightBorder rounded-2xl" onFinish={handleSubmit} style={{ padding: "1.5rem" }}>
                <div className="font-bold pb-2 text-lg">{gc?.title}</div>
                <Form.Item label={gc?.date} name="date" rules={[{ required: true, message: "Please select a date" }]}>
                    <DatePicker className="w-full" defaultValue={momentDate} />
                </Form.Item>
                {/* <div className="pb-2">
                    {gc?.source}
                    <input type="text" ref={sourceRef} className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 hover:bg-white transition duration-100 focus:outline-none dark:[color-scheme:dark] shadow-sm hover:shadow-md" required />
                </div> */}
                <Form.Item label={gc?.source} name="source" rules={[{ required: true, message: "Please enter a source" }]}>
                    <Input />
                </Form.Item>
                {/* <div className="pb-2 flex flex-row gap-4">
                    <div className="flex flex-col w-1/2">
                        {gc?.amount}
                        <input
                            type="number"
                            ref={amountRef}
                            className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md
                        "
                            required
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        {gc?.currency}
                        <select required ref={currencyRef} className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md">
                            {GlobalConfig.currency.currencies.map((currency, index) => (
                                <option key={index} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div> */}
                <Form.Item label={gc?.amount} name="amount" rules={[{ required: true, message: "Please enter an amount" }]}>
                    <Form.Item name="amount" rules={[{ required: true, message: "Please enter an amount" }]} style={{ display: "inline-block", width: "calc(50%)", marginRight: "8px", marginBottom: "0px" }}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="currency" rules={[{ required: true, message: "Please select a currency" }]} style={{ display: "inline-block", width: "calc(50% - 8px)", marginRight: "0px", marginBottom: "0px" }}>
                        <Select defaultValue={GlobalConfig.currency.baseCurrency} style={{ width: "100%" }}>
                            {GlobalConfig.currency.currencies.map((currency, index) => (
                                <Select.Option key={index} value={currency}>
                                    {currency}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                {/* <div className="pb-2">
                    {gc?.category}
                    <select ref={categoryRef} required className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md">
                        {GlobalConfig.expenses.expenseCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div> */}
                <Form.Item label={gc?.category} name="category" rules={[{ required: true, message: "Please select a category" }]}>
                    <Select defaultValue={GlobalConfig.expenses.expenseCategories[0]} style={{ width: "100%" }}>
                        {GlobalConfig.expenses.expenseCategories.map((category, index) => (
                            <Select.Option key={index} value={category}>
                                {category}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {/* <div className="pb-2">
                    {gc?.notes}
                    <textarea ref={notesRef} className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md" rows={1}></textarea>
                </div> */}
                <Form.Item label={gc?.notes} name="notes">
                    <TextArea rows={1} />
                </Form.Item>

                <div className="flex flex-row justify-end gap-2">
                    {GlobalConfig.debug.showAddRandomEntriesButton && (
                        <Button
                            onClick={() => {
                                addRandomExpenses();
                                toast.success("Random Expenses Added", {});
                            }}
                            type="dashed"
                        >
                            <CgDice5 />
                            {gc?.addRandom}
                        </Button>
                    )}
                    <Button
                        // onClick={() => {
                        //     sourceRef.current!.value = "";
                        //     dateRef.current!.value = currentDate;
                        //     amountRef.current!.value = "";
                        //     currencyRef.current!.value = GlobalConfig.currency.baseCurrency;
                        //     categoryRef.current!.value = GlobalConfig.expenses.expenseCategories[0];
                        //     notesRef.current!.value = "";
                        //     toast.success("Fields reset", {});
                        // }}
                        onClick={() => {
                            toast.success("Fields reset", {});
                        }}
                        htmlType="reset"
                        type="default"
                        danger
                    >
                        {gc?.reset}
                    </Button>

                    <Button
                        // onClick={handleSubmit}
                        htmlType="submit"
                        type="primary"
                    >
                        {gc?.add}
                    </Button>
                </div>
                {/* </div> */}
            </Form>
        </StyleProvider>
    );
}

// Thanks @phatify (https://github.com/ant-design/ant-design/issues/38794) for the StyleProvider fix, that solves the issue of Tailwind CSS overriding Ant Design's classes.
