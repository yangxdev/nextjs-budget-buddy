import GlobalConfig from "@/app/app.config";
import { getExpenseDataByQuantity } from "@/app/api/database/get_expenses/expenses";
import RefreshButton from "../../components/HistoryRefreshButton";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import { parse, format, isValid } from "date-fns";
import { enUS, it } from "date-fns/locale";

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
import { FaBolt, FaBusSimple, FaCartShopping, FaCookieBite, FaDumbbell, FaGamepad, FaGasPump, FaMoneyBillWave, FaPhone, FaPiggyBank, FaShirt } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.expenseInfoHistory;

export default async function ExpenseInfoHistory() {
    const expenseData = await getExpenseDataByQuantity(15);
    const currencies = [...new Set(expenseData.expenses.map((expense: { currency: any }) => expense.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], "EUR");

    let locale = defaultLanguage === "it" ? it : enUS;
    let dateFormat = defaultLanguage === "it" ? "do MMMM yyyy" : "MMMM do yyyy";
    let dateFormatInput = defaultLanguage === "it" ? "dd/MM/yyyy" : "MM/dd/yyyy";

    const groupedExpensesByDay: { [key: string]: any[] } = expenseData.expenses.reduce((groups: { [key: string]: any[] }, expense: any) => {
        const date = format(new Date(expense.date), dateFormatInput);

        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(expense);
        return groups;
    }, {});

    const expenseCategories = GlobalConfig.expenses.expenseCategories;

    return (
        <div className="flex flex-col mb-2 h-screen">
            <div className="flex flex-row justify-between items-center pb-2">
                <div className="text-2xl font-semibold select-none">{gc?.title}</div>
                <RefreshButton targetPageId="ExpenseInfoHistory" />
            </div>
            <div className="w-80 overflow-y-scroll mb-6 scrollbar-hide h-full relative" id="ExpenseInfoHistory">
                <div className="flex flex-col select-none ">
                    {expenseData.expenses.length === 0 && <div className="text-left text-sm py-4">{gc?.noExpenseDataAvailable}</div>}

                    {Object.entries(groupedExpensesByDay).map(([date, expenses]) => (
                        <div key={date}>
                            <div className="date-divider py-2 border-t-2 border-lightBorder font-semibold text-base">{date && isValid(parse(date, dateFormatInput, new Date())) ? format(parse(date, dateFormatInput, new Date()), dateFormat, { locale }) : "Invalid date"}</div>{" "}
                            {expenses.map((expense: { source: any; category: any; currency: any; amount: any; date: any; createdAt: any }, index: number) => {
                                let category = expense.category;
                                return (<div
                                    key={index}
                                    className={`rounded-xl hover:bg-newBlue-500 hover:text-white transition duration-100 cursor-pointer p-2 flex flex-row justify-between items-center gap-4 px-2 py-4 ${index !== expenseData.expenses.length - 1 ? "border-b-[1px] border-b-lightBorder" : ""}`}
                                >
                                    <div className="icon rounded-full p-3 bg-newBlue-500 text-white border-2 border-whiteDarker">
                                        {category === "Groceries" && <MdOutlineLocalGroceryStore size={17} />}
                                        {category === "Car maintenance" && <FaCarSide size={20} />}
                                        {category === "Car payment" && <FaCarSide size={20} />}
                                        {category === "Car insurance" && <FaCarSide size={20} />}
                                        {category === "Clothing" && <FaShirt size={20} />}
                                        {category === "Condo fees" && <MdApartment size={20} />}
                                        {category === "Debt" && <GiPayMoney size={20} />}
                                        {category === "Electronics" && <MdComputer size={20} />}
                                        {category === "Entertainment" && <FaGamepad size={20} />}
                                        {category === "Gas" && <FaGasPump size={20} />}
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
                                    <div className="flex flex-row flex-grow justify-between">
                                        <div>
                                            <div className="source font-semibold">{expense.source}</div>
                                            <div className="category text-sm font-normal">{expense.category}</div>
                                            <div className="date text-xs opacity-80">{new Date(expense.createdAt).toLocaleTimeString()}</div>
                                        </div>
                                        <div className="flex flex-col font-semibold items-end justify-center">
                                            <div className="flex flex-row">
                                                <div>{"-"}</div>
                                                <div className="currency px-1">{expense.currency}</div>
                                                <div className="amount">{expense.amount}</div>
                                            </div>
                                            <div className="opacity-80 ">
                                                {expense.currency !== GlobalConfig.currency.baseCurrency && (
                                                    <div className="text-xs flex flex-row">
                                                        <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                                        <div>{(expense.amount / conversionRates[expense.currency]).toFixed(2)}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                            )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// DONE: Add a loading spinner -> Skeleton
// TODO: Load more when scrolling to the bottom
