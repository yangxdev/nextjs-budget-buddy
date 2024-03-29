import GlobalConfig from "@/app/app.config";
import { getIncomeDataByQuantity } from "@/app/api/database/get_incomes/incomes";
import IncomeRefreshButton from "./IncomeRefreshButton";
import { PiSuitcaseBold } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiGift } from "react-icons/pi";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { MdCurrencyBitcoin, MdCurrencyExchange, MdOutlineSavings, MdOutlineSchool } from "react-icons/md";
import { PiMedal } from "react-icons/pi";
import { CgArrowsExchange } from "react-icons/cg";
import {
    getConversionRatesByArray,
    getCurrenciesFromArray,
} from "@/app/api/currency/currencies";
import { FaExchangeAlt, FaHandsHelping } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";

export default async function IncomeHistory() {
    const incomeData = await getIncomeDataByQuantity(10);
    const currencies = [
        ...new Set(
            incomeData.incomes.map(
                (income: { currency: any }) => income.currency
            )
        ),
    ];
    const conversionRates = await getConversionRatesByArray(currencies, "EUR");

    return (
        <div className="w-80">
            <div className="flex flex-row justify-between items-center">
                <div className="text-2xl select-none">History</div>
                <IncomeRefreshButton />
            </div>
            <div className="flex flex-col select-none">
                {incomeData.incomes.length === 0 && (
                    <div className="text-left text-sm py-4">
                        No income data available
                    </div>
                )}
                {incomeData.incomes.map((income, index) => (
                    <div
                        key={index}
                        className={`hover:bg-[#313131] transition duration-100 cursor-pointer p-2 gap-2 flex flex-row justify-between items-center gap-4 px-2 py-4 ${index !== incomeData.incomes.length - 1
                            ? "border-b-[0.1rem] border-b-[#313131]"
                            : ""
                            }`}
                    >
                        <div>
                            <div className="icon rounded-full p-3 bg-[#08931f]">
                                {income.category === "Job" && (
                                    <PiSuitcaseBold size={20} />
                                )}
                                {income.category === "Crypto" && (
                                    <MdCurrencyBitcoin size={20} />
                                )}
                                {income.category === "Reward" && (
                                    <PiMedal size={20} />
                                )}
                                {income.category === "Savings" && (
                                    <MdOutlineSavings size={20} />
                                )}
                                {income.category === "Cashback" && (
                                    <CgArrowsExchange size={20} />
                                )}
                                {income.category === "Investment" && (
                                    <BsGraphUpArrow size={20} />
                                )}
                                {income.category === "Scholarship" && (
                                    <MdOutlineSchool size={20} />
                                )}
                                {income.category === "Financial assistance" && (
                                    <FaHandsHelping size={20} />
                                )}
                                {income.category === "Expense reimbursement" && (
                                    <RiRefund2Line size={20} />
                                )}
                                {income.category === "Gift" && (
                                    <PiGift size={20} />
                                )}
                                {income.category === "Other" && (
                                    <IoEllipsisHorizontalCircleOutline
                                        size={20}
                                    />
                                )}

                            </div>
                        </div>
                        <div className="flex flex-row flex-grow justify-between">
                            <div>
                                <div className="source font-semibold">
                                    {income.source}
                                </div>
                                <div className="category text-sm font-normal">
                                    {income.category}
                                </div>
                            </div>
                            <div className="flex flex-col font-semibold items-end justify-center">
                                <div className="flex flex-row">
                                    <div>{"+"}</div>
                                    <div className="currency px-1">
                                        {income.currency}
                                    </div>
                                    <div className="amount">
                                        {income.amount}
                                    </div>
                                </div>
                                <div className="opacity-80 ">
                                    {income.currency !==
                                        GlobalConfig.currency.baseCurrency && (
                                            <div className="text-xs flex flex-row">
                                                <div className="pr-1">
                                                    {GlobalConfig.currency.baseCurrency}
                                                </div>
                                                <div>
                                                    {(
                                                        income.amount /
                                                        conversionRates[
                                                        income.currency
                                                        ]
                                                    ).toFixed(2)}
                                                </div>
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
