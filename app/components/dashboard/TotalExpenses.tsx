import InfoChartLine from "@/app/InfoChartLineServer";
import { getConvertedPaymentsByDateRange, getPaymentDataByDateRange } from "@/app/api/database/get_payments/payments";
import GlobalConfig, { payment } from "@/app/app.config";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function TotalPayment() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(firstDayOfMonth);
    const year = new Date().getFullYear();

    const convertedPaymentsThisMonth = await getConvertedPaymentsByDateRange(firstDayOfMonth, today);
    const totalPaymentThisMonth = convertedPaymentsThisMonth.reduce((a: number, b: number) => a + b, 0).toFixed(2);

    const paymentDataByDateRangeRaw = await getPaymentDataByDateRange(firstDayOfMonth.toISOString(), today.toISOString());
    const paymentDataByDateRange = paymentDataByDateRangeRaw.payments;

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-[#eaecf0] rounded-2xl text-sm select-none w-[18rem] h-[18rem] h-fit">
            <div className="flex flex-col justify-between select-none">
                <div className="font-semibold text-lg">Total Payment</div>
            </div>
                <div className="text-sm text-gray-500">{monthName}{" "}{year}</div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4">
                <div className="total-balance ">
                    {Number(totalPaymentThisMonth) < 0 ? "-" : ""} {defaultCurrency}{" "}
                    {Number(totalPaymentThisMonth) < 0 ? Math.abs(Number(totalPaymentThisMonth)) : Number(totalPaymentThisMonth)}
                </div>
            </div>
            <div className="mt-2">
                <InfoChartLine
                    data={paymentDataByDateRange}
                    title="Expenses"
                />
            </div>
        </div>
    );
}

// TODO: change "payment" to "expenses", everywhere in the codebase