import InfoChartFlowServer from "@/app/InfoChartFlowServer";
import { getExpenseDataAndConversionRates, getExpenseDataByDateRange } from "@/app/api/database/get_expenses/expenses";
import { getIncomeDataAndConversionRates, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";

export default async function MoneyFlow() {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), 0, 1);

    const expenseRawData = await getExpenseDataAndConversionRates(startDate, endDate);
    const incomeRawData = await getIncomeDataAndConversionRates(startDate, endDate);

    return (
        <div className="p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl text-sm select-none w-[40rem] h-fit">
            <div className="flex flex-row justify-between select-none items-center">
                <div className="font-semibold text-lg">Money Flow</div>
            </div>
            <div className="mt-2">
                <InfoChartFlowServer incomeData={incomeRawData} expenseData={expenseRawData} title="Money Flow" lineColor="20, 85, 251" />
            </div>
        </div>

    );
}