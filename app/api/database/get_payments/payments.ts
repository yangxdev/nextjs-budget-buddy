import GlobalConfig from "@/app/app.config";
import { getConversionRatesByArray } from "@/app/api/currency/currencies";
import { prisma } from "@/app/api/_base";

export async function getPaymentDataByQuantity(quantity: number) {
  const payments = await prisma.payment.findMany({
    take: quantity,
    orderBy: {
      date: "desc",
    },
  });

  return {
    payments,
  };
}

export async function getPaymentDataByDateRange(startDate: string, endDate: string) {
  const payments = await prisma.payment.findMany({
    where: {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });

  return {
    payments,
  };
}

export async function getPaymentDataAndConversionRates(startDate: Date, endDate: Date) {
  const paymentData = await getPaymentDataByDateRange(startDate.toISOString(), endDate.toISOString());
  const currencies = [...new Set(paymentData.payments.map((payment: { currency: any }) => payment.currency))];
  const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);

  return {
    paymentData,
    conversionRates,
  };
}

export async function getConvertedPaymentsByDateRange(startDate: Date, endDate: Date) {
  const paymentData = await getPaymentDataByDateRange(startDate.toISOString(), endDate.toISOString());
  const currencies = [...new Set(paymentData.payments.map((payment: { currency: any }) => payment.currency))];
  const conversionRates = await getConversionRatesByArray(currencies as string[], GlobalConfig.currency.baseCurrency);
  return paymentData.payments.map((payment: { amount: number; currency: string }) => {
    if (payment.currency === GlobalConfig.currency.baseCurrency) {
      return payment.amount;
    } else {
      return payment.amount / conversionRates[payment.currency];
    }
  });
}

export async function getConvertedPaymentsFromData(paymentData: any, conversionRates: any) {
  return paymentData?.payments?.map((payment: { amount: number; currency: string }) => {
    if (payment.currency === GlobalConfig.currency.baseCurrency) {
      return payment.amount;
    } else {
      return payment.amount / conversionRates[payment.currency];
    }
  });
}

export async function getMostExpensivePayment(paymentData: any) {
  const mostExpensivePayment = Math.max(...paymentData.payments.map((payment: { amount: number }) => payment.amount));
  return mostExpensivePayment;
}

export async function getMostExpensivePaymentStore(paymentData: any) {
  const mostExpensivePayment = Math.max(...paymentData.payments.map((payment: { amount: number }) => payment.amount));
  const mostExpensivePaymentIndex = paymentData.payments.findIndex((payment: { amount: number }) => payment.amount === mostExpensivePayment);
  const mostExpensivePaymentStore = paymentData.payments[mostExpensivePaymentIndex].source;
  return mostExpensivePaymentStore;
}

export async function getMostExpensiveCategory(paymentData: any) {
  const paymentCategories = paymentData?.payments?.map((payment: { category: string }) => payment.category);
  const paymentCategoriesCount = paymentCategories.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const mostExpensivePaymentCategory = Object.keys(paymentCategoriesCount).reduce((a, b) => (paymentCategoriesCount[a] > paymentCategoriesCount[b] ? a : b));

  return mostExpensivePaymentCategory;
}

export async function getMostExpensiveCategorySum(paymentData: any) {
  const paymentCategories = paymentData?.payments?.map((payment: { category: string }) => payment.category);
  const paymentCategoriesCount = paymentCategories.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const mostExpensivePaymentCategory = Object.keys(paymentCategoriesCount).reduce((a, b) => (paymentCategoriesCount[a] > paymentCategoriesCount[b] ? a : b));

  const mostExpensivePaymentCategorySum = paymentData?.payments
    ?.filter((payment: { category: string }) => payment.category === mostExpensivePaymentCategory)
    .reduce((acc: number, payment: { amount: number }) => acc + payment.amount, 0)
    .toFixed(2);

  return mostExpensivePaymentCategorySum;
}

export async function getMostFrequentPaymentStore(paymentData: any) {
  const paymentSources = paymentData?.payments?.map((payment: { source: string }) => payment.source);
  const paymentSourcesCount = paymentSources.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentPaymentSource = Object.keys(paymentSourcesCount).reduce((a, b) => (paymentSourcesCount[a] > paymentSourcesCount[b] ? a : b));
  return mostFrequentPaymentSource;
}

export async function getMostFrequentPaymentCount(paymentData: any) {
  const paymentSources = paymentData?.payments?.map((payment: { source: string }) => payment.source);
  const paymentSourcesCount = paymentSources.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentPaymentCount = Math.max(...Object.values(paymentSourcesCount).map((value: unknown) => Number(value)));
  return mostFrequentPaymentCount;
}

export async function getCheapestPayment(paymentData: any) {
  const cheapestPayment = Math.min(...paymentData.payments.map((payment: { amount: number }) => payment.amount));
  return cheapestPayment;
}

export async function getCheapestPaymentStore(paymentData: any) {
  const cheapestPayment = Math.min(...paymentData.payments.map((payment: { amount: number }) => payment.amount));
  const cheapestPaymentIndex = paymentData.payments.findIndex((payment: { amount: number }) => payment.amount === cheapestPayment);
  const cheapestPaymentStore = paymentData.payments[cheapestPaymentIndex].source;
  return cheapestPaymentStore;
}

export async function getAveragePaymentAmount(paymentData: any) {
  const averagePaymentAmount = (paymentData?.payments?.reduce((acc: number, payment: { amount: number }) => acc + payment.amount, 0) / paymentData?.payments?.length).toFixed(2);
  return averagePaymentAmount;
}

export async function getTotalPaymentsMade(paymentData: any) {
  return paymentData?.payments?.length;
}
