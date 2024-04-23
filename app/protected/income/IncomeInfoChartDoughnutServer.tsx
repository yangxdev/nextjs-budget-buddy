import { getConvertedIncomesByDateRange, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import GlobalConfig from "@/app/app.config";
import IncomeInfoChartDoughnutClient from "./IncomeInfoChartDoughnutClient";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.income?.incomeInfoChart;

/**
 * Income information graph component
 * Displays income information over the last week, month and year
 */
export default async function IncomeInfoChartDoughnutServer(): Promise<JSX.Element> {
    // get first day of the current year, month and week
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    // get all the already converted incomes (from first day of year to today)
    const convertedIncomeYearly = await getConvertedIncomesByDateRange(firstDayOfYear, today);
    // get all the non-converted incomes (from first day of year to today)
    const nonConvertedIncomeYearly = await getIncomeDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    // get all the unique categories from the income data
    const categoriesYearly = [...new Set(nonConvertedIncomeYearly.incomes.map((income: { category: any }) => income.category))];
    // create an array of the total amount of each category, rounded to 2 decimal places
    const datasetsDataYearly = categoriesYearly.map((category, _index) => {
        return convertedIncomeYearly
            .filter((_income: any, incomeIndex: number) => nonConvertedIncomeYearly.incomes[incomeIndex].category === category)
            .reduce((acc: number, income: number) => acc + income, 0)
            .toFixed(1);
    });

    const convertedIncomeMonthly = await getConvertedIncomesByDateRange(firstDayOfMonth, today);
    const nonConvertedIncomeMonthly = await getIncomeDataByDateRange(firstDayOfMonth.toISOString(), today.toISOString());
    const categoriesMonthly = [...new Set(nonConvertedIncomeMonthly.incomes.map((income: { category: any }) => income.category))];
    const datasetsDataMonthly = categoriesMonthly.map((category, _index) => {
        return convertedIncomeMonthly
            .filter((_income: any, incomeIndex: number) => nonConvertedIncomeMonthly.incomes[incomeIndex].category === category)
            .reduce((acc: number, income: number) => acc + income, 0)
            .toFixed(1);
    });

    const convertedIncomeWeekly = await getConvertedIncomesByDateRange(firstDayOfWeek, today);
    const nonConvertedIncomeWeekly = await getIncomeDataByDateRange(firstDayOfWeek.toISOString(), today.toISOString());
    const categoriesWeekly = [...new Set(nonConvertedIncomeWeekly.incomes.map((income: { category: any }) => income.category))];
    const datasetsDataWeekly = categoriesWeekly.map((category, _index) => {
        return convertedIncomeWeekly
            .filter((_income: any, incomeIndex: number) => nonConvertedIncomeWeekly.incomes[incomeIndex].category === category)
            .reduce((acc: number, income: number) => acc + income, 0)
            .toFixed(1);
    });

    const convertedIncomeThreeYears = await getConvertedIncomesByDateRange(new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()), today);
    const nonConvertedIncomeThreeYears = await getIncomeDataByDateRange(new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()).toISOString(), today.toISOString());
    const categoriesThreeYears = [...new Set(nonConvertedIncomeThreeYears.incomes.map((income: { category: any }) => income.category))];
    const datasetsDataThreeYears = categoriesThreeYears.map((category, _index) => {
        return convertedIncomeThreeYears
            .filter((_income: any, incomeIndex: number) => nonConvertedIncomeThreeYears.incomes[incomeIndex].category === category)
            .reduce((acc: number, income: number) => acc + income, 0)
            .toFixed(1);
    });

    const convertedIncomeAllTime = await getConvertedIncomesByDateRange(new Date(0), today);
    const nonConvertedIncomeAllTime = await getIncomeDataByDateRange(new Date(0).toISOString(), today.toISOString());
    const categoriesAllTime = [...new Set(nonConvertedIncomeAllTime.incomes.map((income: { category: any }) => income.category))];
    const datasetsDataAllTime = categoriesAllTime.map((category, _index) => {
        return convertedIncomeAllTime
            .filter((_income: any, incomeIndex: number) => nonConvertedIncomeAllTime.incomes[incomeIndex].category === category)
            .reduce((acc: number, income: number) => acc + income, 0)
            .toFixed(1);
    });

    return (
        <div className="p-5 bg-white border-[1px] border-lightBorder max-w-80 min-w-80 rounded-2xl text-sm select-none h-min max-h-[35rem]">
            <div className="mb-2 justify-between flex flex-row">
                <div className="font-semibold text-lg">{gc?.title}</div>
            </div>
            <IncomeInfoChartDoughnutClient datasets={[datasetsDataWeekly, datasetsDataMonthly, datasetsDataYearly, datasetsDataThreeYears, datasetsDataAllTime]} categories={[categoriesWeekly, categoriesMonthly, categoriesYearly, categoriesThreeYears, categoriesAllTime]} />
        </div>
    );
}

// DONE: align with income section once development is done for income section
