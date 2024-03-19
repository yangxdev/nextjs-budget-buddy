import { getIncomeData } from "@/app/api/database/get_incomes/incomes";
import { PiSuitcaseBold } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiGift } from "react-icons/pi";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";

export default async function IncomeList() {
    const incomeData = await getIncomeData(5); // get only the last 5 incomes
    return (
        <div className="w-80">
            <div className="text-lg">History</div>
            <div className="flex flex-col">
                {incomeData.incomes.map((income, index) => (
                    <div className={`flex flex-row justify-between items-center gap-4 px-2 py-4 ${index !== incomeData.incomes.length - 1 ? 'border-b-[0.1rem] border-b-[#313131]' : ''}`}>
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
                                    <IoEllipsisHorizontalCircleOutline size={22}/>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row flex-grow justify-between">
                            <div className="">
                                <div className="source font-semibold">
                                    {income.source}
                                </div>
                                <div className="category">{income.category}</div>
                            </div>
                            <div className="flex flex-row font-semibold">
                                {"+"}
                                <div className="currency">{income.currency}</div>
                                <div className="amount">{income.amount}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
