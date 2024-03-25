"use client";
import React, { useRef, useState } from "react";
import AddIncomeWithFileModal from "./AddIncomeWithFileModal";
import DOMPurify from "dompurify";

export default function AddIncomeWithFile() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [incomeData, setIncomeData] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    function checkInput(data: { date: string; source: string; amount: string; currency: string; category: string; notes: string }) {
        function dateCheck(date: string) {
            if (date === undefined || date === null || date === "") {
                return false;
            }

            const purifiedDate = DOMPurify.sanitize(date);
            if (purifiedDate !== date) {
                return false;
            }

            if (date.length > 10) {
                return false;
            }

            const dateArray = date.split("-");
            if (dateArray.length !== 3) {
                return false;
            }
            const month = parseInt(dateArray[0]);
            const day = parseInt(dateArray[1]);
            const year = parseInt(dateArray[2]);

            if (month < 1 || month > 12) {
                return false;
            }
            if (day < 1 || day > 31) {
                return false;
            }
            if (year < 2000 || year > 2100) {
                return false;
            }
            const monthsWith30Days = [4, 6, 9, 11];
            if ((month === 2 && day > 28) || (monthsWith30Days.includes(month) && day > 30)) {
                return false;
            }

            return true;
        }
        function sourceCheck(source: string) {
            if (source === undefined || source === null || source === "") {
                return false;
            }

            const purifiedSource = DOMPurify.sanitize(source);
            if (purifiedSource !== source) {
                return false;
            }

            if (source.length > 100) {
                return false;
            }

            return true;
        }
        function amountCheck(amount: string) {
            if (amount === undefined || amount === null || amount === "") {
                return false;
            }

            const purifiedAmount = DOMPurify.sanitize(amount);
            if (purifiedAmount !== amount) {
                return false;
            }

            if (amount.length > 10) {
                return false;
            }

            const amountNumber = parseFloat(amount);
            if (isNaN(amountNumber)) {
                return false;
            }

            if (amountNumber < 0) {
                return false;
            }

            return true;
        }
        function currencyCheck(currency: string) {
            if (currency === undefined || currency === null || currency === "") {
                return false;
            }

            const purifiedCurrency = DOMPurify.sanitize(currency);
            if (purifiedCurrency !== currency) {
                return false;
            }

            if (currency.length !== 1 && currency.length !== 3) {
                return false;
            }

            return true;
        }
        function categoryCheck(category: string) {
            if (category === undefined || category === null || category === "") {
                return false;
            }

            const purifiedCategory = DOMPurify.sanitize(category);
            if (purifiedCategory !== category) {
                return false;
            }

            if (category.length > 100) {
                return false;
            }

            return true;
        }
        function notesCheck(notes: string) {
            if (notes === undefined || notes === null || notes === "") {
                return true;
            }

            const purifiedNotes = DOMPurify.sanitize(notes);
            if (purifiedNotes !== notes) {
                return false;
            }

            if (notes.length > 1000) {
                return false;
            }

            return true;
        }

        const date = data.date;
        const source = data.source;
        const amount = data.amount;
        const currency = data.currency;
        const category = data.category;
        const notes = data.notes;

        if (!dateCheck(date) || !sourceCheck(source) || !amountCheck(amount) || !currencyCheck(currency) || !categoryCheck(category) || !notesCheck(notes)) {
            return false;
        }

        return true;
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target?.result as string;
                const lines = text.split("\n");
                let incomeData = [];
                for (let line of lines) {
                    // example:
                    /* 
                    ,11-07-2022,INPS,$200.00,Expense reimbursement,
                    ,12-12-2022,Dechit,$469.39,Job,First month
                    ,12-22-2022,UNIMIB,"$2,041.00",Job,22-23 First rate
                    ,01-03-2023,Family,"$11,000.00",Financial assistance,Dad
                    ,01-12-2023,Dechit,"$1,031.58",Job,Second month Dechit
                    ,02-10-2023,Dechit,$535.60,Job,Third last month Dechit
                    */
                    // Replace commas within quotes
                    line = line.replace(/"([^"]*)"/g, function (match) {
                        return match.replace(/,/g, "");
                    });
                    if (!line) continue;

                    const data = line.split(",");
                    const date = data[1];
                    const source = data[2];
                    const amount = data[3].replace(/[$"]/g, "");
                    const currencySymbol = data[3].replace(/[^$]/g, "");
                    const currency = currencySymbol === "$" ? "USD" : "EUR";
                    const category = data[4];
                    const notes = data[5];
                    if (checkInput({ date, source, amount, currency, category, notes })) {
                        const enabled = true;
                        incomeData.push({ enabled, date, source, amount, currency, category, notes });
                    } else {
                        console.log("Invalid input: " + line);
                        const enabled = false;
                        incomeData.push({ enabled, date, source, amount, currency, category, notes });
                    }
                }
                // console.log(incomeData);
                setIncomeData(incomeData);
                setOpenDialog(true);
            };
            reader.readAsText(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        // Process the dropped CSV file here
    };

    return (
        <div className="p-5 bg-[#313131] max-w-80 rounded-2xl text-sm select-none h-min">
            <AddIncomeWithFileModal
                isOpen={openDialog}
                incomeData={incomeData}
                handleClose={() => {
                    setOpenDialog(false);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }}
            />
            <div className="font-bold pb-3">Import CSV</div>
            <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <button className="w-full" onClick={() => fileInputRef.current?.click()}>
                <div className="transition duration-100 bg-[#434343] rounded-md hover:bg-[#565656] p-5">
                    <strong>Choose a file</strong>
                    <br></br> or drag it here
                </div>
            </button>
        </div>
    );
}
