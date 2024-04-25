// Money flow chart, currently used in the Dashboard

import InfoChartFlowClient from "./InfoChartFlowClient";
import { getConvertedExpensesFromDataWithStructure } from "./api/database/get_expenses/expenses";
import { getConvertedIncomesFromDataWithStructure } from "./api/database/get_incomes/incomes";

export default async function InfoChartFlowServer(props: { incomeData: any; expenseData: any; title: string; lineColor: string }) {
    const expenseData = props.expenseData.expenseData;
    const expenseConversionRates = props.expenseData.conversionRates;
    const incomeData = props.incomeData.incomeData;
    const incomeConversionRates = props.incomeData.conversionRates;

    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const convertedExpenseData = await getConvertedExpensesFromDataWithStructure(expenseData, expenseConversionRates);
    let orderedExpenseDataByDate = Array.isArray(convertedExpenseData) ? convertedExpenseData.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
    if (orderedExpenseDataByDate.length === 0) {
        orderedExpenseDataByDate = Object.entries(convertedExpenseData).map(([date, amount]) => {
            return { date: date, amount: amount };
        });
    }

    const convertedIncomeData = await getConvertedIncomesFromDataWithStructure(incomeData, incomeConversionRates);
    let orderedIncomeDataByDate = Array.isArray(convertedIncomeData) ? convertedIncomeData.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
    if (orderedIncomeDataByDate.length === 0) {
        orderedIncomeDataByDate = Object.entries(convertedIncomeData).map(([date, amount]) => {
            return { date: date, amount: amount };
        });
    }

    const mappedIncomeData = orderedIncomeDataByDate.reduce((acc: any, curr: any) => {
        const date = new Date(curr.date);
        const month = date.getMonth();
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += parseFloat(curr.amount.toFixed(2));
        return acc;
    }, []);

    const mappedExpenseData = orderedExpenseDataByDate.reduce((acc: any, curr: any) => {
        const date = new Date(curr.date);
        const month = date.getMonth();
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += parseFloat(curr.amount.toFixed(2));
        return acc;
    }, []);

    const chartLabel = props.title;

    return (
        <div>
            <InfoChartFlowClient labels={labels} incomeData={mappedIncomeData} expenseData={mappedExpenseData} title={chartLabel} />
        </div>
    );
}
