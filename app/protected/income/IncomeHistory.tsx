import GlobalConfig from "@/app/app.config";
import { getIncomeDataByQuantity } from "@/app/api/database/get_incomes/incomes";
import { PiSuitcaseBold } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiGift } from "react-icons/pi";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import IncomeRefreshButton from "./IncomeRefreshButton";

import {
    getConversionRatesByArray,
    getCurrenciesFromArray,
} from "@/app/api/currency/currencies";

export default async function IncomeHistory() {
    const incomeData = await getIncomeDataByQuantity(5);
    // const currencies = await getCurrenciesFromArray(incomeData); NOT WORKING
    const currencies = [
        ...new Set(
            incomeData.incomes.map(
                (income: { currency: any }) => income.currency
            )
        ),
    ];
    const conversionRates = await getConversionRatesByArray(currencies, "EUR");
    console.log(conversionRates);

    return (
        <div className="w-80">
            <div className="flex flex-row justify-between items-center">
                <div className="text-2xl select-none">History</div>
                <IncomeRefreshButton />
            </div>
            <div className="flex flex-col">
                {incomeData.incomes.map((income, index) => (
                    <div
                        className={`flex flex-row justify-between items-center gap-4 px-2 py-4 ${
                            index !== incomeData.incomes.length - 1
                                ? "border-b-[0.1rem] border-b-[#313131]"
                                : ""
                        }`}
                    >
                        <div className="">
                            <div className="icon rounded-full p-3 bg-[#08931f]">
                                {income.category === "Salary" && (
                                    <PiSuitcaseBold size={20} />
                                )}
                                {income.category === "Investment" && (
                                    <BsGraphUpArrow size={20} />
                                )}
                                {income.category === "Gift" && (
                                    <PiGift size={22} />
                                )}
                                {income.category === "Other" && (
                                    <IoEllipsisHorizontalCircleOutline
                                        size={22}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row flex-grow justify-between">
                            <div className="">
                                <div className="source font-semibold">
                                    {income.source}
                                </div>
                                <div className="category">
                                    {income.category}
                                </div>
                            </div>
                            <div className="flex flex-col font-semibold items-end justify-center">
                                <div className="flex flex-row">
                                    <div>{"+"}</div>
                                    <div className="currency">
                                        {income.currency}
                                    </div>
                                    <div className="amount">
                                        {income.amount}
                                    </div>
                                </div>
                                <div className="opacity-80 ">
                                    {income.currency !==
                                        GlobalConfig.baseCurrency && (
                                        <div className="text-xs">
                                            {GlobalConfig.baseCurrency}
                                            {(
                                                income.amount /
                                                conversionRates[income.currency]
                                            ).toFixed(2)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
