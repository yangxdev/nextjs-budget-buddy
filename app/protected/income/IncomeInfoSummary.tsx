import { getConvertedIncomes, getIncomeDataByDateRange } from "@/app/api/database/get_incomes/incomes";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.incomeInfoSummary;

export default async function IncomeInfoSummary() {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() // ! notice: it starts from Sunday
  );
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  const convertedIncomesThisWeek = await getConvertedIncomes(firstDayOfWeek, today);

  const convertedIncomesThisMonth = await getConvertedIncomes(firstDayOfMonth, today);

  const convertedIncomesThisYear = await getConvertedIncomes(firstDayOfYear, today);

  function checkIfIncomesAreEmpty() {
    return convertedIncomesThisWeek.length === 0 && convertedIncomesThisMonth.length === 0 && convertedIncomesThisYear.length === 0;
  }

  return (
    <div className="p-5 bg-[#313131] max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
      <div className="text-sm font-bold select-none mb-2">{gc?.title}</div>
      {checkIfIncomesAreEmpty() ? (
        <div className="text-left text-sm">{gc?.noIncomeDataAvailable}</div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="font-normal">{gc?.thisYear}</div>
            <div className="flex flex-row font-semibold">
              {"+"}
              <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
              <div>{convertedIncomesThisYear.reduce((acc: number, income: number) => acc + income, 0).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="font-normal">{gc?.thisMonth}</div>
            <div className="flex flex-row font-semibold">
              {"+"}
              <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
              <div>{convertedIncomesThisMonth.reduce((acc: number, income: number) => acc + income, 0).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="font-normal">{gc?.thisWeek}</div>
            <div className="flex flex-row font-semibold">
              {"+"}
              <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
              <div>{convertedIncomesThisWeek.reduce((acc: number, income: number) => acc + income, 0).toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
