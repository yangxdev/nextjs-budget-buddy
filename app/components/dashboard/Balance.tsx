// "use client";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import GlobalConfig from "@/app/app.config";

import { getBalanceByDateRange } from "@/app/api/database/get_balance/balance";
import { getConvertedIncomesByDateRange } from "@/app/api/database/get_incomes/incomes";
import { getConvertedPaymentsByDateRange } from "@/app/api/database/get_payments/payments";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function Balance() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const previousMonthBalance = await getBalanceByDateRange(firstDayOfYear.toISOString(), lastDayOfPreviousMonth.toISOString());
    const currentBalance = await getBalanceByDateRange(firstDayOfYear.toISOString(), today.toISOString());

    let deltaPercentage = getDeltaPercentage(Number(previousMonthBalance), Number(currentBalance)).toFixed(2);
    deltaPercentage = deltaPercentage.includes("Infinity") ? "∞" : deltaPercentage.includes("NaN") ? "0" : deltaPercentage;
    const balanceDeltaDirection = getDeltaDirection(Number(previousMonthBalance), Number(currentBalance));

    const convertedIncomesThisMonth = await getConvertedIncomesByDateRange(new Date(today.getFullYear(), today.getMonth(), 1), today);
    const totalIncomeThisMonth = convertedIncomesThisMonth.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    const convertedPaymentsThisMonth = await getConvertedPaymentsByDateRange(new Date(today.getFullYear(), today.getMonth(), 1), today);
    const totalExpenseThisMonth = convertedPaymentsThisMonth.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    function getDeltaPercentage(previousMonthBalance: number, currentBalance: number) {
        return ((currentBalance - previousMonthBalance) / previousMonthBalance) * 100;
    }

    function getDeltaDirection(previousMonthBalance: number, currentBalance: number) {
        return currentBalance > previousMonthBalance ? "up" : currentBalance < previousMonthBalance ? "down" : "stop";
    }

    return (
        <div className="p-5 bg-lightGrayCustom3 border-[1px] border-[#383b40] rounded-2xl text-sm select-none w-[18rem] h-fit">
            <div className="flex flex-row justify-between select-none">
                <div className="font-semibold uppercase text-lg">Total balance</div>
                <div
                    className={`flex flex-row items-center gap-1 
                ${balanceDeltaDirection === "up" ? "text-accentGreenLighter" : balanceDeltaDirection === "down" ? "text-accentRed" : ""}
                    `}
                >
                    {/* {balanceDeltaDirection === "up" ? <FaArrowAltCircleUp /> : <FaArrowCircleDown />} */}
                    {balanceDeltaDirection === "up" ? <FaArrowAltCircleUp /> : balanceDeltaDirection === "down" ? <FaArrowCircleDown /> : ""}
                    <div className={`mt-[0.5px]`}>
                        {/* {balanceDeltaDirection === "up" ? "+" : "-"} {deltaPercentage}% */}
                        {balanceDeltaDirection === "up" ? "+" : balanceDeltaDirection === "down" ? "-" : ""} 
                        {deltaPercentage === "∞" ? " ∞ %" : deltaPercentage === "0" ? "" : deltaPercentage + "%"}
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4">
                <div className="total-balance ">
                    {Number(currentBalance) < 0 ? "-" : ""} {defaultCurrency}{" "}
                    {Number(currentBalance) < 0 ? Math.abs(Number(currentBalance)) : Number(currentBalance)}
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row items-center gap-1 select-none">
                        <IoMdArrowDropup />
                        Income
                    </div>
                    <div className={`font-semibold text-base ${parseFloat(totalIncomeThisMonth) > 0 ? "text-accentGreenLighter" : "" }`}>
                        {defaultCurrency} {totalIncomeThisMonth}
                    </div>
                </div>
                <div className="border-l border-[#434343]"></div>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-1 select-none">
                        <IoMdArrowDropdown />
                        Expenses
                    </div>
                    <div className={`font-semibold text-base flex justify-end ${parseFloat(totalExpenseThisMonth) > 0 ? "text-accentRedLighter" : "" }`}>
                        {defaultCurrency} {totalExpenseThisMonth}
                    </div>
                </div>
            </div>
        </div>
    );
}
