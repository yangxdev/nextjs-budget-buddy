import GlobalConfig from "@/app/app.config";

import { getBalanceByDateRange, getBalanceDataByDateRange } from "@/app/api/database/get_balance/balance";
import TrendPercentage from "./TrendPercentage";
import InfoChartLine from "@/app/InfoChartLineServer";

const defaultCurrency = GlobalConfig.currency.baseCurrency;

export default async function Balance() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), 0, 1);
    const currentBalance = await getBalanceByDateRange(startDate.toISOString(), endDate.toISOString());

    const balanceObject = await getBalanceDataByDateRange(startDate.toISOString(), endDate.toISOString());

    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate);
    const year = new Date().getFullYear();

    // array of objects
    const balanceData = Object.entries(balanceObject).map((
        [date, balance]: [string, unknown]
    ) => {
        return { date, balance };
    });

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl text-sm select-none w-[22rem] h-fit">
            <div className="flex flex-row justify-between select-none items-center">
                <div className="text-lg font-semibold">Current Balance</div>
                <div className="text-sm">
                    From {monthName} {year}
                </div>
            </div>
            <div className="flex flex-row gap-1.5 font-bold text-3xl py-4 justify-between">
                <div className="total-balance ">
                    {Number(currentBalance) < 0 ? "-" : ""} {defaultCurrency} {Number(currentBalance) < 0 ? Math.abs(Number(currentBalance)) : Number(currentBalance)}
                </div>
                <div className="percentage text-newBlue-500">
                    <TrendPercentage data={balanceData} skipConversion={true} useBalance={true} />
                </div>
            </div>
            <div className="mt-2">
                <InfoChartLine data={balanceObject} title="Balance" lineColor="20, 85, 251" />
            </div>
        </div>
    );
}
