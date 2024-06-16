"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import GlobalConfig from "@/app/app.config";
import addRandomExpenses from "@/app/api/database/add_random_expenses/addRandomExpenses";
import { useRouter } from "next/navigation";
import VanillaTilt from "vanilla-tilt";
import { CgDice5 } from "react-icons/cg";
import { Button } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.addExpense?.addExpenseForm;

export default function AddExpense() {
    const currentDate = new Date().toISOString().substring(0, 10);

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
            <div ref={elementRef} className="p-5 bg-white border-[1px] border-lightBorder max-w-80 rounded-2xl text-sm select-none h-min">
                <div className="font-bold pb-2 text-lg">{gc?.title}</div>
                <div className="pb-2">
                    {gc?.date}
                    <input type="date" ref={dateRef} className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md" defaultValue={currentDate} required />
                </div>
                <div className="pb-2">
                    {gc?.source}
                    <input type="text" ref={sourceRef} className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 hover:bg-white transition duration-100 focus:outline-none dark:[color-scheme:dark] shadow-sm hover:shadow-md" required />
                </div>
                <div className="pb-2 flex flex-row gap-4">
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
                </div>
                <div className="pb-2">
                    {gc?.category}
                    <select ref={categoryRef} required className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md">
                        {GlobalConfig.expenses.expenseCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="pb-2">
                    {gc?.notes}
                    <textarea ref={notesRef} className="w-full bg-whiteDarker border-[1px] border-lightBorder rounded-md p-2 cursor-pointer hover:bg-white transition duration-100 dark:[color-scheme:dark] focus:outline-none shadow-sm hover:shadow-md" rows={1}></textarea>
                </div>
                <div className="flex flex-row justify-end gap-2">
                    {GlobalConfig.debug.showAddRandomEntriesButton && (
                        // <button
                        //     onClick={() => {
                        //         addRandomExpenses();
                        //         toast.success("Random Expenses Added", {});
                        //     }}
                        //     className="flex flex-row items-center gap-1 transition duration-100 bg-white rounded-md p-2 hover:bg-newGreen-500 hover:text-white"
                        // >
                        //     <div>
                        //         <CgDice5 />
                        //     </div>
                        //     <div>{gc?.addRandom}</div>
                        // </button>
                        <Button onClick={() => {
                            addRandomExpenses();
                            toast.success("Random Expenses Added", {});
                        }} type="dashed">
                            <CgDice5 />
                            {gc?.addRandom}
                        </Button>
                    )}
                    {/* <button
                        onClick={() => {
                            sourceRef.current!.value = "";
                            dateRef.current!.value = currentDate;
                            amountRef.current!.value = "";
                            currencyRef.current!.value = GlobalConfig.currency.baseCurrency;
                            categoryRef.current!.value = GlobalConfig.expenses.expenseCategories[0];
                            notesRef.current!.value = "";
                            toast.success("Fields reset", {});
                        }}
                        className="transition duration-100 bg-white rounded-md p-2 hover:bg-newRed-500 hover:text-white"
                    >
                        {gc?.reset}
                    </button> */}
                    <Button onClick={() => {
                        sourceRef.current!.value = "";
                        dateRef.current!.value = currentDate;
                        amountRef.current!.value = "";
                        currencyRef.current!.value = GlobalConfig.currency.baseCurrency;
                        categoryRef.current!.value = GlobalConfig.expenses.expenseCategories[0];
                        notesRef.current!.value = "";
                        toast.success("Fields reset", {});
                    }} type="default" danger>{gc?.reset}</Button>

                    {/* <button onClick={handleSubmit} className="transition border-[1px] shadow-sm hover:shadow-md duration-100 bg-white rounded-md p-2 hover:bg-newGreen-500 hover:text-white">
                    {gc?.add}
                </button> */}
                    <Button onClick={handleSubmit} type="primary">{gc?.add}</Button>
                </div>
            </div>
        </StyleProvider>
    );
}

// Thanks @phatify (https://github.com/ant-design/ant-design/issues/38794) for the StyleProvider fix, that solves the issue of Tailwind CSS overriding Ant Design's classes.