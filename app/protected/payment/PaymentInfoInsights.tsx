import {
    getCheapestPayment,
    getCheapestPaymentStore,
    getConvertedPaymentsFromData,
    getMostExpensiveCategory,
    getMostExpensiveCategorySum,
    getMostExpensivePayment,
    getMostExpensivePaymentStore,
    getMostFrequentPaymentCount,
    getMostFrequentPaymentStore,
    getPaymentDataAndConversionRates,
    getAveragePaymentAmount,
    getTotalPaymentsMade,
    getMostExpensiveMonth,
} from "@/app/api/database/get_payments/payments";
import GlobalConfig from "@/app/app.config";
import { format } from "date-fns";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage]?.payment?.paymentInfoInsights;

export default async function PaymentInfoInsights() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    const paymentRawData = await getPaymentDataAndConversionRates(firstDayOfYear, today);
    const paymentData = paymentRawData.paymentData;
    const conversionRates = paymentRawData.conversionRates;

    const convertedPaymentsThisYear = await getConvertedPaymentsFromData(paymentData, conversionRates);

    function checkIfPaymentsAreEmpty() {
        return convertedPaymentsThisYear?.length === 0;
    }

    return (
        <div className="p-5 bg-lightGrayCustom3 border-[1px] border-[#383b40] min-w-60 w-fit rounded-2xl text-sm select-none h-min">
            <div className="text-lg font-bold select-none mb-2">{gc?.title}</div>
            {checkIfPaymentsAreEmpty() ? (
                <div className="text-left text-sm">{gc?.noPaymentDataAvailable}</div>
            ) : (
                <div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-4">
                            {/* Most Expensive Payment */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostExpensivePayment}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                    <div>
                                        {await getMostExpensivePayment(paymentData)}
                                        {(await getMostExpensivePaymentStore(paymentData)) && (
                                            <span className="">
                                                {" " + gc?.at} {await getMostExpensivePaymentStore(paymentData)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Most Expensive Category */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostExpensiveCategory}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    {await getMostExpensiveCategory(paymentData)}
                                    {(await getMostExpensiveCategorySum(paymentData)) > 1 && (
                                        <>
                                            <div className="px-1">
                                                {"("}
                                                {GlobalConfig.currency.baseCurrency}
                                            </div>
                                            <div>
                                                {await getMostExpensiveCategorySum(paymentData)} {" " + gc?.spent}
                                                {")"}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Most expensive month */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostExpensiveMonth}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    {format(new Date(1970, parseInt(await getMostExpensiveMonth(paymentData)), 1), 'MMMM')}
                                </div>
                            </div>

                            {/* Most Frequent Payment */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.mostFrequentPayment}</div>
                                <div className="flex flex-row font-semibold text-base justify-start gap-1">
                                    {await getMostFrequentPaymentStore(paymentData)}
                                    {(await getMostFrequentPaymentCount(paymentData)) > 1 && (
                                        <span>
                                            {"("}
                                            {await getMostFrequentPaymentCount(paymentData)} {" " + gc?.times}
                                            {")"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Cheapest Payment */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.cheapestPayment}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                    <div>
                                        {await getCheapestPayment(paymentData)}
                                        {(await getCheapestPaymentStore(paymentData)) && (
                                            <span className="">
                                                {" " + gc?.at} {await getCheapestPaymentStore(paymentData)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Average Payment Amount */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.averagePaymentAmount}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div className="pr-1">{GlobalConfig.currency.baseCurrency}</div>
                                    <div>{await getAveragePaymentAmount(paymentData)}</div>
                                </div>
                            </div>

                            {/* Total Payments Made */}
                            <div className="flex flex-col">
                                <div className="font-normal justify-start">{gc?.totalPaymentsMade}</div>
                                <div className="flex flex-row font-semibold text-base justify-start">
                                    <div>
                                        {await getTotalPaymentsMade(paymentData)}
                                        {" " + (await getTotalPaymentsMade(paymentData) === 1 ? gc?.payment : gc?.payments)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// DONE: Most expensive month
// TODO: Payments amount per week/month chart below the insights