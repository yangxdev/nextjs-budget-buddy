import GlobalConfig from "@/app/app.config";
import { getPaymentDataByQuantity } from "@/app/api/database/get_payments/payments";
import PaymentRefreshButton from "../../components/HistoryRefreshButton";
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
import { parse, format, isValid } from "date-fns";
import { enUS, it } from "date-fns/locale";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage]?.payment?.paymentInfoHistory;

export default async function PaymentInfoHistory() {
    const paymentData = await getPaymentDataByQuantity(15);
    const currencies = [...new Set(paymentData.payments.map((payment: { currency: any }) => payment.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], "EUR");

    let locale = defaultLanguage === "it" ? it : enUS;
    let dateFormat = defaultLanguage === "it" ? "do MMMM yyyy" : "MMMM do yyyy";
    let dateFormatInput = defaultLanguage === "it" ? "dd/MM/yyyy" : "MM/dd/yyyy";

    const groupedPaymentsByDay: { [key: string]: any[] } = paymentData.payments.reduce((groups: { [key: string]: any[] }, payment: any) => {
        const date = format(new Date(payment.date), dateFormatInput);

        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(payment);
        return groups;
    }, {});

    return (
        <div className="flex flex-col mb-2 h-screen">
            <div className="flex flex-row justify-between items-center pb-2">
                <div className="text-2xl font-semibold select-none">{gc?.title}</div>
                <PaymentRefreshButton />
            </div>
            <div className="w-80 overflow-y-scroll mb-6 scrollbar-hide h-full relative" id="PaymentInfoHistory">
                <div className="flex flex-col select-none ">
                    {paymentData.payments.length === 0 && <div className="text-left text-sm py-4">{gc?.noPaymentDataAvailable}</div>}

                    {Object.entries(groupedPaymentsByDay).map(([date, payments]) => (
                        <div key={date}>
                            <div className="date-divider pt-2 border-t-2 border-[#aaa] font-semibold text-base">{date && isValid(parse(date, dateFormatInput, new Date())) ? format(parse(date, dateFormatInput, new Date()), dateFormat, { locale }) : "Invalid date"}</div>{" "}
                            {payments.map((payment: { source: any; category: any; currency: any; amount: any; date: any; createdAt: any }, index: number) => (
                                <div key={index} className={`rounded-2xl hover:bg-[#313131] transition duration-100 cursor-pointer p-2 flex flex-row justify-between items-center gap-4 px-2 py-4 ${index !== paymentData.payments.length - 1 ? "border-b-[0.1rem] border-b-[#313131]" : ""}`}>
                                    <div className="icon rounded-full p-3 bg-accentRed">
                                        {payment.category === "Job" && <PiSuitcaseBold size={20} />}
                                        {payment.category === "Crypto" && <MdCurrencyBitcoin size={20} />}
                                        {payment.category === "Reward" && <PiMedal size={20} />}
                                        {payment.category === "Savings" && <MdOutlineSavings size={20} />}
                                        {payment.category === "Cashback" && <CgArrowsExchange size={20} />}
                                        {payment.category === "Investment" && <BsGraphUpArrow size={20} />}
                                        {payment.category === "Scholarship" && <MdOutlineSchool size={20} />}
                                        {payment.category === "Financial assistance" && <FaHandsHelping size={20} />}
                                        {payment.category === "Expense reimbursement" && <RiRefund2Line size={20} />}
                                        {payment.category === "Gift" && <PiGift size={20} />}
                                        {payment.category === "Other" && <IoEllipsisHorizontalCircleOutline size={20} />}
                                        {["Job", "Crypto", "Reward", "Savings", "Cashback", "Investment", "Scholarship", "Financial assistance", "Expense reimbursement", "Gift", "Other"].indexOf(payment.category) === -1 && <IoEllipsisHorizontalCircleOutline size={20} />}
                                    </div>
                                    <div className="flex flex-row flex-grow justify-between">
                                        <div>
                                            <div className="source font-semibold">{payment.source}</div>
                                            <div className="category text-sm font-normal">{payment.category}</div>
                                            <div className="date text-xs opacity-80">{new Date(payment.createdAt).toLocaleTimeString()}</div>
                                        </div>
                                        <div className="flex flex-col font-semibold items-end justify-center">
                                            <div className="flex flex-row">
                                                <div>{"-"}</div>
                                                <div className="currency px-1">{payment.currency}</div>
                                                <div className="amount">{payment.amount}</div>
                                            </div>
                                            <div className="opacity-80 ">
                                                {payment.currency !== GlobalConfig.currency.baseCurrency && (
                                                    <div className="text-xs flex flex-row">
                                                        <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                                        <div>{(payment.amount / conversionRates[payment.currency]).toFixed(2)}</div>
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

// TODO: Add a loading spinner
// TODO: Load more when scrolling to the bottom
