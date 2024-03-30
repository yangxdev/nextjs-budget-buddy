import { getConvertedIncomes, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import { Doughnut } from "react-chartjs-2";
import IncomeDoughnut from "./charts/IncomeDoughnut";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.incomeInfoGraph;

export default async function IncomeInfoGraph() {
    // get all the incomes from first day of year to today
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const incomeData = await getConvertedIncomes(
        firstDayOfYear,
        today
    );
    const incomeData2 = await getIncomeDataByDateRange(
        firstDayOfYear.toISOString(),
        today.toISOString()
    );
    const categories = [
        ...new Set(incomeData2.incomes.map((income) => income.category)),
    ];
    const datasetsData = categories.map((category, index) => {
        return incomeData
            .filter((income, incomeIndex) => incomeData2.incomes[incomeIndex].category === category)
            .reduce((acc, income) => acc + income, 0)
            .toFixed(2);
    });

    return (
        <div className="p-5 bg-[#313131] max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
            <div className="font-bold pb-2">{gc?.title}</div>
            {incomeData2.incomes.length === 0 ? (
                <div className="text-left text-sm">
                    {gc?.noIncomeDataAvailable}
                </div>
            ) : (
                // TODO: add a period selector
                <IncomeDoughnut categories={categories} datasetsData={datasetsData} />
            )}
        </div>
    );
}
