import { getConvertedPaymentsByDateRange, getPaymentDataByQuantity } from "./api/database/get_payments/payments";
import { getConvertedIncomesByDateRange, getIncomeDataByQuantity } from "./api/database/get_incomes/incomes";
import InfoChartVerticalBarClient from "./InfoChartVerticalBarClient";

export default async function InfoChartVerticalBar() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    // this chart shows both payments and income values in a vertical bar chart
    const convertedPaymentYearly = await getConvertedPaymentsByDateRange(firstDayOfYear, today);
    const convertedIncomeYearly = await getConvertedIncomesByDateRange(firstDayOfYear, today);

    const lastPaymentData = await getPaymentDataByQuantity(1);
    const lastIncomeData = await getIncomeDataByQuantity(1);
    const lastPaymentMonth = new Date(lastPaymentData.payments[0].date).getMonth();
    const lastIncomeMonth = new Date(lastIncomeData.incomes[0].date).getMonth();
    const lastMonth = lastPaymentMonth > lastIncomeMonth ? lastPaymentMonth : lastIncomeMonth;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const labels = months.slice(0, lastMonth + 1);
    const datasets = [
        {
            label: "Payments",
            data: convertedPaymentYearly,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        },
        {
            label: "Income",
            data: convertedIncomeYearly,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
    ]

    return (
        <div>
            <div className="w-full">
                <InfoChartVerticalBarClient labels={labels} datasets={datasets} />
            </div>
        </div>
    );
}
