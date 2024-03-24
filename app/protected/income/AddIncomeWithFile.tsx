"use client";
import React, { useRef, useState } from "react";
import AddIncomeWithFileModal from "./AddIncomeWithFileModal";

export default function AddIncomeWithFile() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [incomeData, setIncomeData] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = (e.target?.result as string);
                const lines = text.split('\n');
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
                        return match.replace(/,/g, '');
                    });

                    const data = line.split(',');
                    const date = data[1];
                    const source = data[2];
                    const amount = data[3].replace(/[$"]/g, '');
                    const currencySymbol = data[3].replace(/[^$]/g, '');
                    const currency = currencySymbol === '$' ? 'USD' : 'EUR';
                    const category = data[4];
                    const notes = data[5];
                    incomeData.push({ date, source, amount, currency, category, notes });
                }
                console.log(incomeData);
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
            <input
                type="file"
                accept=".csv"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
            <button className="w-full" onClick={() => fileInputRef.current?.click()}>
                <div className="transition duration-100 bg-[#434343] rounded-md hover:bg-[#565656] p-5">
                    <strong>Choose a file</strong><br></br> or drag it here
                </div>
            </button>
        </div>
    );
}
