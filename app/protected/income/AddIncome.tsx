"use client";
import { useRef } from "react";
import toast from "react-hot-toast";
import GlobalConfig from "@/app/app.config";

export default function AddIncome() {
    const currentDate = new Date().toISOString().substring(0, 10);

    const sourceRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const currencyRef = useRef<HTMLSelectElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const notesRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        const source = sourceRef.current?.value;
        const date = dateRef.current?.value;
        const amount = amountRef.current?.value;
        const currency = currencyRef.current?.value;
        const category = categoryRef.current?.value;
        const notes = notesRef.current?.value;

        if (!source || !date || !amount || !currency || !category) {
            toast.error("Please fill in all the required fields", {
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
            return;
        }

        const responsePromise = fetch("/api/database/add_income", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
            return response;
        });

        toast.promise(
            responsePromise,
            {
                loading: "Saving...",
                success: "Income added successfully",
                error: "Error when adding income",
            },
            {
                style: {
                    background: "#333",
                    color: "#fff",
                },
            }
        );
    };

    return (
        <div className="p-5 bg-[#313131] max-w-80 rounded-2xl text-sm select-none h-min">
            <div className="font-bold pb-2">Add income</div>
            <div className="pb-2">
                Date
                <input
                    type="date"
                    ref={dateRef}
                    className="w-full bg-[#434343] rounded-md p-2 cursor-pointer hover:bg-[#565656] transition duration-100 dark:[color-scheme:dark] focus:outline-none dark:[color-scheme:dark]"
                    defaultValue={currentDate}
                    required
                />
            </div>
            <div className="pb-2">
                Source
                <input
                    type="text"
                    ref={sourceRef}
                    className="w-full bg-[#434343] rounded-md p-2 hover:bg-[#565656] transition duration-100 focus:outline-none dark:[color-scheme:dark]"
                    required
                />
            </div>
            <div className="pb-2 flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                    Amount
                    <input
                        type="number"
                        ref={amountRef}
                        className="w-full bg-[#434343] rounded-md p-2
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-pointer hover:bg-[#565656] transition duration-100 dark:[color-scheme:dark] focus:outline-none
                        "
                        required
                    />
                </div>
                <div className="flex flex-col w-1/2">
                    Currency
                    <select
                        required
                        ref={currencyRef}
                        className="w-full bg-[#434343] rounded-md p-2 cursor-pointer hover:bg-[#565656] transition duration-100 dark:[color-scheme:dark] focus:outline-none dark:[color-scheme:dark]"
                    >
                        {GlobalConfig.currencies.map((currency, index) => (
                            <option key={index} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="pb-2">
                Category
                <select
                    ref={categoryRef}
                    required
                    className="w-full bg-[#434343] rounded-md p-2 cursor-pointer hover:bg-[#565656] transition duration-100 dark:[color-scheme:dark] focus:outline-none dark:[color-scheme:dark]"
                >
                    {GlobalConfig.incomeCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="pb-2">
                Notes (optional)
                <textarea
                    ref={notesRef}
                    className="w-full bg-[#434343] rounded-md p-2 cursor-pointer hover:bg-[#565656] transition duration-100 dark:[color-scheme:dark] focus:outline-none dark:[color-scheme:dark]"
                    rows={1}
                ></textarea>
            </div>
            <div className="flex flex-row justify-end">
                <button
                    onClick={() => {
                        sourceRef.current!.value = "";
                        dateRef.current!.value = currentDate;
                        amountRef.current!.value = "";
                        currencyRef.current!.value = "EUR";
                        categoryRef.current!.value = "Job";
                        notesRef.current!.value = "";
                        toast.success("Fields reset", {
                            style: {
                                background: "#333",
                                color: "#fff",
                            },
                        });
                    }}
                    className="transition duration-100 bg-[#434343] rounded-md p-2 hover:bg-[#565656] mr-2"
                >
                    Reset
                </button>
                <button
                    onClick={handleSubmit}
                    className="transition duration-100 bg-[#08931f] rounded-md p-2 hover:bg-[#067414]"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
