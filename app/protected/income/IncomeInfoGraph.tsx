import { getConvertedIncomes, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import GlobalConfig from "@/app/app.config";
import IncomeInfoGraphMain from "./IncomeInfoGraphMain";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.incomeInfoGraph;

/**
 * Income information graph component
 * Displays income information over the last week, month and year
 */
export default async function IncomeInfoGraph(): Promise<JSX.Element> {
  // get first day of the current year, month and week
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

  // get all the already converted incomes (from first day of year to today)
  const convertedIncomeYearly = await getConvertedIncomes(firstDayOfYear, today);
  // get all the non-converted incomes (from first day of year to today)
  const nonConvertedIncomeYearly = await getIncomeDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
  // get all the unique categories from the income data
  const categoriesYearly = [...new Set(nonConvertedIncomeYearly.incomes.map((income: { category: any }) => income.category))];
  // create an array of the total amount of each category, rounded to 2 decimal places
  const datasetsDataYearly = categoriesYearly.map((category, _index) => {
    return convertedIncomeYearly
      .filter((_income: any, incomeIndex: number) => nonConvertedIncomeYearly.incomes[incomeIndex].category === category)
      .reduce((acc, income) => acc + income, 0)
      .toFixed(2);
  });

  const convertedIncomeMonthly = await getConvertedIncomes(firstDayOfMonth, today);
  const nonConvertedIncomeMonthly = await getIncomeDataByDateRange(firstDayOfMonth.toISOString(), today.toISOString());
  const categoriesMonthly = [...new Set(nonConvertedIncomeMonthly.incomes.map((income) => income.category))];
  const datasetsDataMonthly = categoriesMonthly.map((category, _index) => {
    return convertedIncomeMonthly
      .filter((_income, incomeIndex) => nonConvertedIncomeMonthly.incomes[incomeIndex].category === category)
      .reduce((acc, income) => acc + income, 0)
      .toFixed(2);
  });

  const convertedIncomeWeekly = await getConvertedIncomes(firstDayOfWeek, today);
  const nonConvertedIncomeWeekly = await getIncomeDataByDateRange(firstDayOfWeek.toISOString(), today.toISOString());
  const categoriesWeekly = [...new Set(nonConvertedIncomeWeekly.incomes.map((income) => income.category))];
  const datasetsDataWeekly = categoriesWeekly.map((category, _index) => {
    return convertedIncomeWeekly
      .filter((_income, incomeIndex) => nonConvertedIncomeWeekly.incomes[incomeIndex].category === category)
      .reduce((acc, income) => acc + income, 0)
      .toFixed(2);
  });

  return (
    <div className="p-5 bg-[#313131] max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
      <div className="mb-2 justify-between flex flex-row">
        <div className="font-bold">{gc?.title}</div>
      </div>
      <IncomeInfoGraphMain datasets={[datasetsDataWeekly, datasetsDataMonthly, datasetsDataYearly]} categories={[categoriesWeekly, categoriesMonthly, categoriesYearly]} />
    </div>
  );
}
