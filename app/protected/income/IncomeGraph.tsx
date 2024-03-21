import { getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import { Doughnut } from "react-chartjs-2";
import IncomeDoughnut from "./charts/IncomeDoughnut";

export default async function IncomeGraph() {
    // get all the incomes from first day of year to today
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const incomeData = await getIncomeDataByDateRange(
        firstDayOfYear.toISOString(),
        today.toISOString()
    );
    const categories = [
        ...new Set(incomeData.incomes.map((income) => income.category)),
    ];
    const datasetsData = categories.map((category) => {
        return incomeData.incomes
            .filter((income) => income.category === category)
            .reduce((acc, income) => acc + income.amount, 0);
    });

    return (
        <div className="p-5 bg-[#313131] max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
            {/* <Doughnut data={data} /> */}
            <IncomeDoughnut categories={categories} datasetsData={datasetsData}/>
        </div>
    );
}
