import { getConvertedPaymentsByDateRange, getPaymentDataByDateRange, getPaymentDataByQuantity } from "./api/database/get_payments/payments";
import { getConvertedIncomesByDateRange, getIncomeDataByDateRange, getIncomeDataByQuantity } from "./api/database/get_incomes/incomes";
import InfoChartVerticalBarClient from "./InfoChartVerticalBarClient";
import { getConversionRatesByArray } from "./api/currency/currencies";
import GlobalConfig from "./app.config";

export default async function InfoChartVerticalBar() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const convertedPaymentYearly = await getConvertedPaymentsByDateRange(firstDayOfYear, today);
    // const convertedIncomeYearly = await getConvertedIncomesByDateRange(firstDayOfYear, today);

    const paymentDataYearly = await getPaymentDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    const incomeDataYearly = await getIncomeDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    const currencies = [...new Set(paymentDataYearly.payments.map((payment: { currency: any }) => payment.currency))];
    const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);

    const paymentDataMappedByMonth = paymentDataYearly.payments.reduce((acc: any, payment: any) => {
        const month = months[new Date(payment.date).getMonth()];
        const convertedAmount = payment.currency === GlobalConfig.currency.baseCurrency ? payment.amount : (payment.amount / conversionRates[payment.currency]);
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
    let lastPaymentMonth = -1;
    let lastIncomeMonth = -1;
    let lastPaymentData = (await getPaymentDataByQuantity(1)) || { payments: [] };
    let lastIncomeData = (await getIncomeDataByQuantity(1)) || { incomes: [] };
    if (lastPaymentData.payments.length > 0) {
        lastPaymentMonth = new Date(lastPaymentData.payments[0].date).getMonth();
    }
    if (lastIncomeData.incomes.length > 0) {
        lastIncomeMonth = new Date(lastIncomeData.incomes[0].date).getMonth();
    }
    lastMonth = lastPaymentMonth > lastIncomeMonth ? lastPaymentMonth : lastIncomeMonth;

    const labels = months.slice(0, lastMonth + 1);
    const datasets = [
        {
            label: "Payments",
            data: paymentDataMappedByMonth,
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
        <div className="p-5 bg-lightGrayCustom3 border-[1px] border-[#383b40] rounded-2xl text-sm select-none h-fit">
            <div className="mb-2 justify-between flex flex-row">
                <div className="font-bold text-lg">Income and expenses</div>
            </div>
            <InfoChartVerticalBarClient labels={labels} datasets={datasets} />
        </div>
    );
}

// BUG: when there are data changes, the chart doesn't update until the page is refreshed
