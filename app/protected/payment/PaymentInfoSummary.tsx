import { getConvertedPayments, getPaymentDataByDateRange } from "@/app/api/database/get_payments/payments";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.paymentInfoSummary;

export default async function PaymentInfoSummary() {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() // ! notice: it starts from Sunday
  );
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  const convertedPaymentsThisWeek = await getConvertedPayments(firstDayOfWeek, today);

  const convertedPaymentsThisMonth = await getConvertedPayments(firstDayOfMonth, today);

  const convertedPaymentsThisYear = await getConvertedPayments(firstDayOfYear, today);

  function checkIfPaymentsAreEmpty() {
    return convertedPaymentsThisWeek.length === 0 && convertedPaymentsThisMonth.length === 0 && convertedPaymentsThisYear.length === 0;
  }

  const sumThisYear = convertedPaymentsThisYear.reduce((acc: number, payment: number) => acc + payment, 0);
  const sumThisMonth = convertedPaymentsThisMonth.reduce((acc: number, payment: number) => acc + payment, 0);
  const sumThisWeek = convertedPaymentsThisWeek.reduce((acc: number, payment: number) => acc + payment, 0);

  return (
    <div className="p-5 bg-lightGrayCustom3 border-[1px] border-[#383b40] max-w-80 min-w-80 rounded-2xl text-sm select-none h-min">
      <div className="text-sm font-bold select-none mb-2">{gc?.title}</div>
      {checkIfPaymentsAreEmpty() ? (
        <div className="text-left text-sm">{gc?.noPaymentDataAvailable}</div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="font-normal">{gc?.thisYear}</div>
            <div className={`flex flex-row font-semibold ${sumThisYear > 0 ? "text-accentRed" : ""}`}>
              {"-"}
              <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
              <div>{sumThisYear.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="font-normal">{gc?.thisMonth}</div>
            <div className={`flex flex-row font-semibold ${sumThisMonth > 0 ? "text-accentRed" : ""}`}>
              {"-"}
              <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
              <div>{sumThisMonth.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="font-normal">{gc?.thisWeek}</div>
            <div className={`flex flex-row font-semibold ${sumThisWeek > 0 ? "text-accentRed" : ""}`}>
              {"-"}
              <div className="px-1">{GlobalConfig.currency.baseCurrency}</div>
              <div>{sumThisWeek.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
