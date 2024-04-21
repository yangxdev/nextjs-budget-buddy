import InfoChartLine from "@/app/InfoChartLineServer";
import { getConvertedPaymentsByDateRange, getPaymentDataByDateRange } from "@/app/api/database/get_payments/payments";
import GlobalConfig, { payment } from "@/app/app.config";
import TrendPercentage from "./TrendPercentage";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function TotalPayment() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), 0, 1);

    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate);
    const year = new Date().getFullYear();

    const convertedPayments = await getConvertedPaymentsByDateRange(startDate, endDate);
    const totalPayment = convertedPayments.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    const paymentDataByDateRangeRaw = await getPaymentDataByDateRange(startDate.toISOString(), endDate.toISOString());
    const paymentDataByDateRange = paymentDataByDateRangeRaw.payments;

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-[#eaecf0] rounded-2xl text-sm select-none w-[22rem] h-fit">
            <div className="flex flex-row justify-between select-none items-center">
                <div className="font-semibold text-lg">Total Expenses</div>
                <div className="text-sm">
                    From {monthName} {year}
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4 justify-between">
                <div className="total-balance">
                    {Number(totalPayment) < 0 ? "-" : ""} {defaultCurrency} {Number(totalPayment) < 0 ? Math.abs(Number(totalPayment)) : Number(totalPayment)}
                </div>
                <div className="percentage text-newRed-500">
                    <TrendPercentage data={paymentDataByDateRange} />
                </div>
            </div>
            <div className="mt-2">
                <InfoChartLine data={paymentDataByDateRange} title="Expenses" lineColor="241, 85, 74" />
            </div>
        </div>
    );
}

// TODO: change "payment" to "expenses", everywhere in the codebase
