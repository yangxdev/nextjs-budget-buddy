"use client";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

import copyToClipboard from "@/app/utils/copyToClipboard";

export default function Balance() {
    return (
        <div className="p-5 bg-[#313131] max-w-80 rounded-2xl text-sm">
            <div className="flex flex-row justify-between select-none">
                <div className="font-semibold">Current balance</div>
                <div className="flex flex-row items-center gap-1">
                    {/* <FaArrowCircleDown /> */}
                    <FaArrowAltCircleUp />
                    +12%
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-xl py-4">
                <div
                    className="total-balance cursor-pointer"
                    onClick={copyToClipboard}
                >
                    USD 10,234.00
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="">
                    <div className="flex flex-row items-center gap-1 select-none">
                        <IoMdArrowDropup />
                        Income
                    </div>
                    <div
                        className="font-semibold text-base cursor-pointer"
                        onClick={copyToClipboard}
                    >
                        USD 1,000.00
                    </div>
                </div>
                <div className="border-l border-[#434343]"></div>
                <div className="">
                    <div className="flex flex-row items-center gap-1 select-none">
                        <IoMdArrowDropdown />
                        Expenses
                    </div>
                    <div
                        className="font-semibold text-base cursor-pointer"
                        onClick={copyToClipboard}
                    >
                        USD 1,000.00
                    </div>
                </div>
            </div>
        </div>
    );
}
