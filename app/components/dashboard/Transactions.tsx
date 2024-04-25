import { getExpenseDataByQuantity } from "@/app/api/database/get_expenses/expenses";
import { getIncomeDataByQuantity } from "@/app/api/database/get_incomes/incomes";
import React from "react";

import { PiSuitcaseBold } from "react-icons/pi";
import { AiOutlineStock } from "react-icons/ai";
import { PiGift } from "react-icons/pi";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { MdApartment, MdComputer, MdCurrencyBitcoin, MdCurrencyExchange, MdOutlineRestaurant, MdOutlineSavings, MdOutlineSchool, MdOutlineSportsSoccer } from "react-icons/md";
import { PiMedal } from "react-icons/pi";
import { CgArrowsExchange } from "react-icons/cg";
import { FaBriefcase, FaBriefcaseMedical, FaCarSide, FaCoffee, FaExchangeAlt, FaHandsHelping, FaHome, FaPlane, FaWalking } from "react-icons/fa";
import { RiMentalHealthFill, RiRefund2Line } from "react-icons/ri";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

import GlobalConfig from "@/app/app.config";
import { FaBolt, FaBusSimple, FaCartShopping, FaCookieBite, FaDumbbell, FaGamepad, FaGasPump, FaMoneyBillWave, FaPhone, FaPiggyBank, FaShirt } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

export default async function Transactions() {
    const lastFiveIncomes = await getIncomeDataByQuantity(5);
    const lastFiveExpenses = await getExpenseDataByQuantity(5);

    const lastFiveTransactions = [...lastFiveIncomes.incomes, ...lastFiveExpenses.expenses]
        .sort((a: { date: any }, b: { date: any }) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return (
        <div>
            <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl text-sm select-none w-[25rem] h-[25rem]">
                <div className="flex flex-row justify-between select-none items-center">
                    <div className="text-lg font-semibold">Recent Transactions</div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col gap-2">
                        {lastFiveTransactions.map(async (transaction: any, index: number) => {
                            const category = transaction.category;
                            const incomeCategories = GlobalConfig.income.incomeCategories;
                            const expenseCategories = GlobalConfig.expenses.expenseCategories;

                            return (
                                <React.Fragment key={index}>
                                    {(transaction.type === "income" &&
                                        <div className="flex flex-row justify-between min-h-[3rem] items-center">
                                            <div className="rounded-full bg-newBlue-500 w-10 h-10 text-white flex items-center justify-center">
                                                {category === "Job" && <PiSuitcaseBold size={20} />}
                                                {category === "Gift" && <PiGift size={20} />}
                                                {category === "Crypto" && <MdCurrencyBitcoin size={20} />}
                                                {category === "Reward" && <PiMedal size={20} />}
                                                {category === "Savings" && <MdOutlineSavings size={20} />}
                                                {category === "Cashback" && <CgArrowsExchange size={20} />}
                                                {category === "Investment" && <AiOutlineStock size={20} />}
                                                {category === "Scholarship" && <MdOutlineSchool size={20} />}
                                                {category === "Financial assistance" && <FaHandsHelping size={17} />}
                                                {category === "Expense reimbursement" && <FaExchangeAlt size={20} />}
                                                {category === "Exchange" && <MdCurrencyExchange size={20} />}
                                                {category === "Refund" && <RiRefund2Line size={20} />}
                                                {category === "Donation" && <FaHandsHelping size={20} />}
                                                {category === "Education" && <MdOutlineSchool size={20} />}
                                                {category === "Other" && <IoEllipsisHorizontalCircleOutline size={20} />}
                                                {!incomeCategories.includes(category) && <IoEllipsisHorizontalCircleOutline size={20} />}
                                            </div>
                                            <div className="flex flex-col mr-auto ml-4">
                                                <div className="text-sm font-semibold">{transaction.source}</div>
                                                <div className="text-sm">
                                                    {transaction.category}
                                                </div>
                                            </div>
                                            <div className="text-sm text-newGreen-500 font-semibold">{"+ "}{transaction.currency}{" "}{(transaction.amount).toFixed(2)}</div>
                                        </div>) ||
                                        (transaction.type === "expense" &&
                                            <div className="flex flex-row justify-between min-h-[3rem] items-center">
                                                <div className="rounded-full bg-newBlue-500 w-10 h-10 text-white flex items-center justify-center">
                                                    {category === "Groceries" && <MdOutlineLocalGroceryStore size={17} />}
                                                    {category === "Car maintenance" && <FaCarSide size={20} />}
                                                    {category === "Car payment" && <FaCarSide size={20} />}
                                                    {category === "Car insurance" && <FaCarSide size={20} />}
                                                    {category === "Clothing" && <FaShirt size={20} />}
                                                    {category === "Condo fees" && <MdApartment size={20} />}
                                                    {category === "Debt" && <GiPayMoney size={20} />}
                                                    {category === "Electronics" && <MdComputer size={20} />}
                                                    {category === "Entertainment" && <FaGamepad size={20} />}
                                                    {category === "Gas" && <FaGasPump size={15} />}
                                                    {category === "Gifts" && <PiGift size={20} />}
                                                    {category === "Going out" && <FaWalking size={20} />}
                                                    {category === "Gym" && <FaDumbbell size={20} />}
                                                    {category === "Home maintenance" && <MdApartment size={20} />}
                                                    {category === "Insurance" && <GiPayMoney size={20} />}
                                                    {category === "Medical" && <FaBriefcaseMedical size={20} />}
                                                    {category === "Mortgage" && <MdApartment size={20} />}
                                                    {category === "Other" && <IoEllipsisHorizontalCircleOutline size={20} />}
                                                    {category === "Public transportation" && <FaBusSimple size={20} />}
                                                    {category === "Rent" && <FaHome size={20} />}
                                                    {category === "Restaurant" && <MdOutlineRestaurant size={20} />}
                                                    {category === "Phone bills" && <FaPhone size={20} />}
                                                    {category === "Travel" && <FaPlane size={20} />}
                                                    {category === "Utilities" && <FaBolt size={20} />}
                                                    {category === "Work" && <FaBriefcase size={20} />}
                                                    {category === "Lunch/Dinner outside" && <MdOutlineRestaurant size={20} />}
                                                    {category === "Personal care" && <RiMentalHealthFill size={20} />}
                                                    {category === "Sport" && <MdOutlineSportsSoccer size={20} />}
                                                    {category === "Café" && <FaCoffee size={20} />}
                                                    {category === "Snacks" && <FaCookieBite size={20} />}
                                                    {category === "Car rent" && <FaCarSide size={20} />}
                                                    {category === "Fees" && <FaMoneyBillWave size={20} />}
                                                    {category === "Savings" && <MdOutlineSavings size={20} />}
                                                    {category === "Amazon" && <FaCartShopping size={20} />}
                                                    {category === "Pension" && <FaPiggyBank size={20} />}
                                                    {category === "Cash" && <FaMoneyBillWave size={20} />}
                                                    {category === "Home Bills" && <FaHome size={20} />}
                                                    {category === "ETF" && <AiOutlineStock size={20} />}
                                                    {!expenseCategories.includes(category) && <IoEllipsisHorizontalCircleOutline size={20} />}
                                                </div>
                                                <div className="flex flex-col mr-auto ml-4">
                                                    <div className="text-sm font-semibold">{transaction.source}</div>
                                                    <div className="text-sm">
                                                        {transaction.category}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-newRed-500 font-semibold">{"- "}{transaction.currency}{" "}{(transaction.amount).toFixed(2)}</div>
                                            </div>
                                        )}
                                    {index < lastFiveTransactions.length - 1 && <hr />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

// TODO: create a function/component that manages the icons for categories