import { getConvertedExpensesByDateRange, getExpenseDataByDateRange, getExpenseDataByQuantity } from "./api/database/get_expenses/expenses";
import { getConvertedIncomesByDateRange, getIncomeDataByDateRange, getIncomeDataByQuantity } from "./api/database/get_incomes/incomes";
import InfoChartVerticalBarClient from "./InfoChartVerticalBarClient";
import { getConversionRatesByArray } from "./api/currency/currencies";
import GlobalConfig from "./app.config";

export default async function InfoChartVerticalBar() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const convertedExpenseYearly = await getConvertedExpensesByDateRange(firstDayOfYear, today);
    // const convertedIncomeYearly = await getConvertedIncomesByDateRange(firstDayOfYear, today);

    const expenseDataYearly = await getExpenseDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    const incomeDataYearly = await getIncomeDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    const currencies = [...new Set(expenseDataYearly.expenses.map((expense: { currency: any }) => expense.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);

    const expenseDataMappedByMonth = expenseDataYearly.expenses.reduce((acc: any, expense: any) => {
        const month = months[new Date(expense.date).getMonth()];
        const convertedAmount = expense.currency === GlobalConfig.currency.baseCurrency ? expense.amount : (expense.amount / conversionRates[expense.currency]);
        const convertedAmountRounded = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
        acc[month] = (acc[month] || 0) + convertedAmountRounded;
        return acc;
    }, {});

    const incomeDataMappedByMonth = incomeDataYearly.incomes.reduce((acc: any, income: any) => {
        const month = months[new Date(income.date).getMonth()];
        const convertedAmount = income.currency === GlobalConfig.currency.baseCurrency ? income.amount : (income.amount / conversionRates[income.currency]);
        const convertedAmountRounded = Math.round((convertedAmount + Number.EPSILON) * 100) / 100;
        acc[month] = (acc[month] || 0) + convertedAmountRounded;
        return acc;
    }, {});

    let lastMonth = -1;
    let lastExpenseMonth = -1;
    let lastIncomeMonth = -1;
    let lastExpenseData = (await getExpenseDataByQuantity(1)) || { expenses: [] };
    let lastIncomeData = (await getIncomeDataByQuantity(1)) || { incomes: [] };
    if (lastExpenseData.expenses.length > 0) {
        lastExpenseMonth = new Date(lastExpenseData.expenses[0].date).getMonth();
    }
    if (lastIncomeData.incomes.length > 0) {
        lastIncomeMonth = new Date(lastIncomeData.incomes[0].date).getMonth();
    }
    lastMonth = lastExpenseMonth > lastIncomeMonth ? lastExpenseMonth : lastIncomeMonth;

    const labels = months.slice(0, lastMonth + 1);
    const datasets = [
        {
            label: "Expenses",
            data: expenseDataMappedByMonth,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        },
        {
            label: "Income",
            data: incomeDataMappedByMonth,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
    ];

    return (
        <div className="p-5 bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl text-sm select-none h-fit">
            <div className="mb-2 justify-between flex flex-row">
                <div className="font-bold text-lg">Income and expenses</div>
            </div>
            <InfoChartVerticalBarClient labels={labels} datasets={datasets} />
        </div>
    );
}

// BUG: when there are data changes, the chart doesn't update until the page is refreshed
