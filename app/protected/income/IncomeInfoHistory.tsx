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
import { getConversionRatesByArray, getCurrenciesFromArray } from "@/app/api/currency/currencies";
import { FaExchangeAlt, FaHandsHelping } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { parse, format } from "date-fns";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.incomeInfoHistory;

export default async function IncomeInfoHistory() {
  const incomeData = await getIncomeDataByQuantity(15);
  const currencies = [...new Set(incomeData.incomes.map((income: { currency: any }) => income.currency))];
  const conversionRates = await getConversionRatesByArray(currencies as string[], "EUR");

  const groupedIncomesByDay: { [key: string]: any[] } = incomeData.incomes.reduce((groups: { [key: string]: any[] }, income) => {
    const date = new Date(income.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(income);
    return groups;
  }, {});

  return (
    <div className="flex flex-col mb-2">
      <div className="flex flex-row justify-between items-center pb-2">
        <div className="text-2xl font-semibold select-none">{gc?.title}</div>
        <IncomeRefreshButton />
      </div>
      <div className="w-80 overflow-y-scroll mb-6 scrollbar-hide">
        <div className="flex flex-col select-none ">
          {incomeData.incomes.length === 0 && <div className="text-left text-sm py-4">{gc?.noIncomeDataAvailable}</div>}

          {Object.entries(groupedIncomesByDay).map(([date, incomes]) => (
            <div key={date}>
              <div className="date-divider pt-2 border-t-2 border-[#aaa] font-semibold text-base">{format(parse(date, "dd/MM/yyyy", new Date()), "MMMM do yyyy")}</div>
              {incomes.map((income: { source: any; category: any; currency: any; amount: any; date: any; createdAt: any }, index: number) => (
                <div key={index} className={`hover:bg-[#313131] transition duration-100 cursor-pointer p-2 flex flex-row justify-between items-center gap-4 px-2 py-4 ${index !== incomeData.incomes.length - 1 ? "border-b-[0.1rem] border-b-[#313131]" : ""}`}>
                  <div className="icon rounded-full p-3 bg-accentGreenDarker">
                    {income.category === "Job" && <PiSuitcaseBold size={20} />}
                    {income.category === "Crypto" && <MdCurrencyBitcoin size={20} />}
                    {income.category === "Reward" && <PiMedal size={20} />}
                    {income.category === "Savings" && <MdOutlineSavings size={20} />}
                    {income.category === "Cashback" && <CgArrowsExchange size={20} />}
                    {income.category === "Investment" && <BsGraphUpArrow size={20} />}
                    {income.category === "Scholarship" && <MdOutlineSchool size={20} />}
                    {income.category === "Financial assistance" && <FaHandsHelping size={20} />}
                    {income.category === "Expense reimbursement" && <RiRefund2Line size={20} />}
                    {income.category === "Gift" && <PiGift size={20} />}
                    {income.category === "Other" && <IoEllipsisHorizontalCircleOutline size={20} />}
                  </div>
                  <div className="flex flex-row flex-grow justify-between">
                    <div>
                      <div className="source font-semibold">{income.source}</div>
                      <div className="category text-sm font-normal">{income.category}</div>
                      <div className="date text-xs opacity-80">{new Date(income.createdAt).toLocaleTimeString()}</div>
                    </div>
                    <div className="flex flex-col font-semibold items-end justify-center">
                      <div className="flex flex-row">
                        <div>{"+"}</div>
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
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
