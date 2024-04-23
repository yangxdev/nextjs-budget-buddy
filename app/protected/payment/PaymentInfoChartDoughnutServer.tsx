import { getConvertedPaymentsByDateRange, getPaymentDataByDateRange } from "@/app/api/database/get_payments/payments";
import GlobalConfig from "@/app/app.config";
import PaymentInfoChartDoughnutClient from "./PaymentInfoChartDoughnutClient";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.payment?.paymentInfoChart;

/**
 * Payment information graph component
 * Displays payment information over the last week, month and year
 */
export default async function PaymentInfoChartDoughnutServer(): Promise<JSX.Element> {
    // get first day of the current year, month and week
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    // get all the already converted payments (from first day of year to today)
    const convertedPaymentYearly = await getConvertedPaymentsByDateRange(firstDayOfYear, today);
    // get all the non-converted payments (from first day of year to today)
    const nonConvertedPaymentYearly = await getPaymentDataByDateRange(firstDayOfYear.toISOString(), today.toISOString());
    // get all the unique categories from the payment data
    const categoriesYearly = [...new Set(nonConvertedPaymentYearly.payments.map((payment: { category: any }) => payment.category))];
    // create an array of the total amount of each category, rounded to 2 decimal places
    const datasetsDataYearly = categoriesYearly.map((category, _index) => {
        return convertedPaymentYearly
            .filter((_payment: any, paymentIndex: number) => nonConvertedPaymentYearly.payments[paymentIndex].category === category)
            .reduce((acc: number, payment: number) => acc + payment, 0)
            .toFixed(2);
    });

    const convertedPaymentMonthly = await getConvertedPaymentsByDateRange(firstDayOfMonth, today);
    const nonConvertedPaymentMonthly = await getPaymentDataByDateRange(firstDayOfMonth.toISOString(), today.toISOString());
    const categoriesMonthly = [...new Set(nonConvertedPaymentMonthly.payments.map((payment: { category: any }) => payment.category))];
    const datasetsDataMonthly = categoriesMonthly.map((category, _index) => {
        return convertedPaymentMonthly
            .filter((_payment: any, paymentIndex: number) => nonConvertedPaymentMonthly.payments[paymentIndex].category === category)
            .reduce((acc: number, payment: number) => acc + payment, 0)
            .toFixed(2);
    });

    const convertedPaymentWeekly = await getConvertedPaymentsByDateRange(firstDayOfWeek, today);
    const nonConvertedPaymentWeekly = await getPaymentDataByDateRange(firstDayOfWeek.toISOString(), today.toISOString());
    const categoriesWeekly = [...new Set(nonConvertedPaymentWeekly.payments.map((payment: { category: any }) => payment.category))];
    const datasetsDataWeekly = categoriesWeekly.map((category, _index) => {
        return convertedPaymentWeekly
            .filter((_payment: any, paymentIndex: number) => nonConvertedPaymentWeekly.payments[paymentIndex].category === category)
            .reduce((acc: number, payment: number) => acc + payment, 0)
            .toFixed(2);
    });

    const convertedPaymentThreeYears = await getConvertedPaymentsByDateRange(new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()), today);
    const nonConvertedPaymentThreeYears = await getPaymentDataByDateRange(new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()).toISOString(), today.toISOString());
    const categoriesThreeYears = [...new Set(nonConvertedPaymentThreeYears.payments.map((payment: { category: any }) => payment.category))];
    const datasetsDataThreeYears = categoriesThreeYears.map((category, _index) => {
        return convertedPaymentThreeYears
            .filter((_payment: any, paymentIndex: number) => nonConvertedPaymentThreeYears.payments[paymentIndex].category === category)
            .reduce((acc: number, payment: number) => acc + payment, 0)
            .toFixed(2);
    });

    const convertedPaymentAllTime = await getConvertedPaymentsByDateRange(new Date(0), today);
    const nonConvertedPaymentAllTime = await getPaymentDataByDateRange(new Date(0).toISOString(), today.toISOString());
    const categoriesAllTime = [...new Set(nonConvertedPaymentAllTime.payments.map((payment: { category: any }) => payment.category))];
    const datasetsDataAllTime = categoriesAllTime.map((category, _index) => {
        return convertedPaymentAllTime
            .filter((_payment: any, paymentIndex: number) => nonConvertedPaymentAllTime.payments[paymentIndex].category === category)
            .reduce((acc: number, payment: number) => acc + payment, 0)
            .toFixed(2);
    });

    return (
        <div className="p-5 bg-white border-[1px] border-lightBorder max-w-80 min-w-80 rounded-2xl text-sm select-none h-min max-h-[35rem]">
            <div className="mb-2 justify-between flex flex-row">
                <div className="font-semibold text-lg">{gc?.title}</div>
            </div>
            <PaymentInfoChartDoughnutClient datasets={[datasetsDataWeekly, datasetsDataMonthly, datasetsDataYearly, datasetsDataThreeYears, datasetsDataAllTime]} categories={[categoriesWeekly, categoriesMonthly, categoriesYearly, categoriesThreeYears, categoriesAllTime]} />
        </div>
    );
}

// TODO: align with income section once development is done for payment section
