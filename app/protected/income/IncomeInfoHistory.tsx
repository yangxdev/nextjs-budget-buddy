import GlobalConfig from "@/app/app.config";
import { getIncomeDataByQuantity } from "@/app/api/database/get_incomes/incomes";
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
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.income?.incomeInfoHistory;

export default async function IncomeInfoHistory() {
    const incomeData = await getIncomeDataByQuantity(15);
    const currencies = [...new Set(incomeData.incomes.map((income: { currency: any }) => income.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], "EUR");

    let locale = defaultLanguage === "it" ? it : enUS;
    let dateFormat = defaultLanguage === "it" ? "do MMMM yyyy" : "MMMM do yyyy";
    let dateFormatInput = defaultLanguage === "it" ? "dd/MM/yyyy" : "MM/dd/yyyy";

    const groupedIncomesByDay: { [key: string]: any[] } = incomeData.incomes.reduce((groups: { [key: string]: any[] }, income: any) => {
        const date = format(new Date(income.date), dateFormatInput);

        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(income);
        return groups;
    }, {});

    const incomeCategories = GlobalConfig.income.incomeCategories;

    return (
        <div className="flex flex-col mb-2 h-screen">
            <div className="flex flex-row justify-between items-center pb-2">
                <div className="text-2xl font-semibold select-none">{gc?.title}</div>
                <RefreshButton targetPageId="IncomeInfoHistory" />
            </div>
            <div className="w-80 overflow-y-scroll mb-6 scrollbar-hide h-full relative" id="IncomeInfoHistory">
                <div className="flex flex-col select-none ">
                    {incomeData.incomes.length === 0 && <div className="text-left text-sm py-4">{gc?.noIncomeDataAvailable}</div>}

                    {Object.entries(groupedIncomesByDay).map(([date, incomes]) => (
                        <div key={date}>
                            <div className="date-divider py-2 border-t-2 border-lightBorder font-semibold text-base">{date && isValid(parse(date, dateFormatInput, new Date())) ? format(parse(date, dateFormatInput, new Date()), dateFormat, { locale }) : "Invalid date"}</div>{" "}
                            {incomes.map((income: { source: any; category: any; currency: any; amount: any; date: any; createdAt: any }, index: number) => {
                                let category = income.category;
                                return (<div
                                    key={index}
                                    className={`rounded-xl hover:bg-newBlue-500 hover:text-white transition duration-100 cursor-pointer p-2 flex flex-row justify-between items-center gap-4 px-2 py-4 ${index !== incomeData.incomes.length - 1 ? "border-b-[1px] border-b-lightBorder" : ""}`}
                                >
                                    <div className="icon rounded-full p-3 bg-newBlue-500 text-white border-2 border-whiteDarker">
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
                                    <div className="flex flex-row flex-grow justify-between">
                                        <div>
                                            <div className="source font-semibold">{income.source}</div>
                                            <div className="category text-sm font-normal">{income.category}</div>
                                            <div className="date text-xs opacity-80">{new Date(income.createdAt).toLocaleTimeString()}</div>
                                        </div>
                                        <div className="flex flex-col font-semibold items-end justify-center">
                                            <div className="flex flex-row">
                                                <div>{"-"}</div>
                                                <div className="currency px-1">{income.currency}</div>
                                                <div className="amount">{income.amount}</div>
                                            </div>
                                            <div className="opacity-80 ">
                                                {income.currency !== GlobalConfig.currency.baseCurrency && (
                                                    <div className="text-xs flex flex-row">
                                                        <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                                        <div>{(income.amount / conversionRates[income.currency]).toFixed(2)}</div>
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
