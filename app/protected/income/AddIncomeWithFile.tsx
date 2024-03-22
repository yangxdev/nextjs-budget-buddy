"use client";
import React, { useRef } from "react";

export default function AddIncomeWithFile() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // Process the CSV file here
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
            <div className="font-bold pb-3">Import CSV</div>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
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
