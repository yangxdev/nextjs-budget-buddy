"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import GlobalConfig from "@/app/app.config";
import addRandomPayments from "@/app/api/database/add_random_payments/addRandomPayments";
import { useRouter } from "next/navigation";
import VanillaTilt from "vanilla-tilt";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage]?.payment?.addPayment?.addPaymentForm;

export default function AddPayment() {
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
            toast.error("Please fill in all the required fields", {
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
            return;
        }

        const responsePromise = fetch("/api/database/add_payment", {
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
            router.refresh();
            return response;
        });

        toast.promise(
            responsePromise,
            {
                loading: "Saving...",
                success: "Payment added successfully",
                error: "Error when adding payment",
            },
            {
                style: {
                    background: "#333",
                    color: "#fff",
                },
            }
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
        <div ref={elementRef} className="p-5 bg-lightGrayCustom3 border-[1px] border-[#383b40] max-w-80 rounded-2xl text-sm select-none h-min">
            <div className="font-bold pb-2 text-lg">{gc?.title}</div>
            <div className="pb-2">
                {gc?.date}
                <input type="date" ref={dateRef} className="w-full bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2 cursor-pointer hover:bg-lightGrayCustom3 transition duration-100 dark:[color-scheme:dark] focus:outline-none" defaultValue={currentDate} required />
            </div>
            <div className="pb-2">
                {gc?.source}
                <input type="text" ref={sourceRef} className="w-full bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2 hover:bg-lightGrayCustom3 transition duration-100 focus:outline-none dark:[color-scheme:dark]" required />
            </div>
            <div className="pb-2 flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                    {gc?.amount}
                    <input
                        type="number"
                        ref={amountRef}
                        className="w-full bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-pointer hover:bg-lightGrayCustom3 transition duration-100 dark:[color-scheme:dark] focus:outline-none
                        "
                        required
                    />
                </div>
                <div className="flex flex-col w-1/2">
                    {gc?.currency}
                    <select required ref={currencyRef} className="w-full bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2 cursor-pointer hover:bg-lightGrayCustom3 transition duration-100 dark:[color-scheme:dark] focus:outline-none">
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
                <select ref={categoryRef} required className="w-full bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2 cursor-pointer hover:bg-lightGrayCustom3 transition duration-100 dark:[color-scheme:dark] focus:outline-none">
                    {GlobalConfig.payment.paymentCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="pb-2">
                {gc?.notes}
                <textarea ref={notesRef} className="w-full bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2 cursor-pointer hover:bg-lightGrayCustom3 transition duration-100 dark:[color-scheme:dark] focus:outline-none" rows={1}></textarea>
            </div>
            <div className="flex flex-row justify-end">
                <button
                    onClick={() => {
                        sourceRef.current!.value = "";
                        dateRef.current!.value = currentDate;
                        amountRef.current!.value = "";
                        currencyRef.current!.value = GlobalConfig.currency.baseCurrency;
                        categoryRef.current!.value = GlobalConfig.payment.paymentCategories[0];
                        notesRef.current!.value = "";
                        toast.success("Fields reset", {
                            style: {
                                background: "#333",
                                color: "#fff",
                            },
                        });
                    }}
                    className="transition duration-100 bg-lightGrayCustom3 rounded-md p-2 hover:bg-[#565656] mr-2"
                >
                    {gc?.reset}
                </button>
                <button onClick={handleSubmit} className="transition duration-100 bg-accentGreen rounded-md p-2 hover:bg-[#2e8b57]">
                    {gc?.add}
                </button>
                {GlobalConfig.debug.showAddRandomEntriesButton && (
                    <button
                        onClick={() => {
                            addRandomPayments();
                            toast.success("Random Payments Added", {
                                style: {
                                    background: "#333",
                                    color: "#fff",
                                },
                            });
                        }}
                        className="transition duration-100 ml-2 bg-[#e2820e] rounded-md p-2 hover:bg-[#bd8112]"
                    >
                        {gc?.addRandom}
                    </button>
                )}
            </div>
        </div>
    );
}
