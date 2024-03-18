"use client";
import { useRef } from "react";
import toast from "react-hot-toast";

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

        console.log({
            source,
            date,
            amount,
            currency,
            category,
            notes,
        });

        if (!source || !date || !amount || !currency || !category) {
            toast.error("Please fill in all required fields");
            return;
        }

        const response = fetch("/api/add_income", {
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
        });
        // console.log(response);

        toast.promise(response, {
            loading: "Adding income...",
            success: "Income added!",
            error: "Failed to add income!",
        });
    };

    return (
        <div className="p-5 bg-[#313131] max-w-80 rounded-2xl text-sm select-none">
            <div className="font-bold pb-2">Add income</div>
            <div className="pb-2">
                Date
                <input
                    type="date"
                    ref={dateRef}
                    className="cursor-pointer w-full bg-[#434343] rounded-md p-2"
                    defaultValue={currentDate}
                    required
                />
            </div>
            <div className="pb-2">
                Source
                <input
                    type="text"
                    ref={sourceRef}
                    className="w-full bg-[#434343] rounded-md p-2"
                    required
                />
            </div>
            <div className="pb-2 flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                    Amount
                    <input
                        type="number"
                        ref={amountRef}
                        className="w-full bg-[#434343] rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col w-1/2">
                    Currency
                    <select
                        required
                        ref={currencyRef}
                        className="w-full bg-[#434343] rounded-md p-2"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="JPY">JPY</option>
                        <option value="GBP">GBP</option>
                        <option value="CNY">CNY</option>
                        <option value="AUD">AUD</option>
                        <option value="CAD">CAD</option>
                        <option value="CHF">CHF</option>
                        <option value="HKD">HKD</option>
                        <option value="SGD">SGD</option>
                    </select>
                </div>
            </div>
            <div className="pb-2">
                Category
                <select
                    ref={categoryRef}
                    required
                    className="w-full bg-[#434343] rounded-md p-2"
                >
                    <option value="Salary">Salary</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="pb-2">
                Notes (optional)
                <textarea
                    ref={notesRef}
                    className="w-full bg-[#434343] rounded-md p-2"
                    rows={1}
                ></textarea>
            </div>
            <div className="flex flex-row justify-end">
                <button
                    onClick={handleSubmit}
                    className="transition duration-100 bg-[#434343] rounded-md p-2 hover:bg-[#565656]"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
