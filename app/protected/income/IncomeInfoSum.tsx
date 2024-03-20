import { getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";

export default async function IncomeInfoSum() {
    const today = new Date();
    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    ).toISOString(); 
    const incomeData = await getIncomeDataByDateRange(
        firstDay,
        today.toISOString()
    );
    const currencies = [
        ...new Set(incomeData.incomes.map((income) => income.currency)),
    ];
    const conversionRates = await getConversionRatesByArray(currencies, "EUR"); // to edit later

    return (
        <div className="p-5 bg-[#313131] max-w-80 min-w-80 rounded-2xl text-sm select-none">
            <div className="text-sm font-bold select-none">Summary</div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center gap-4 py-4">
                    <div className="font-semibold">This month</div>
                    <div className="flex flex-row">
                        {"+"}
                        <div className="">
                            {incomeData.incomes.reduce(
                                (acc, income) => acc + income.amount,
                                0
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
