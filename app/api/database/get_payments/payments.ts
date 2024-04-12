import { PrismaClient } from "@prisma/client";
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

export async function getConvertedPayments(startDate: Date, endDate: Date) {
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
