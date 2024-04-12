import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import { useState } from "react";
import AddPayment from "./AddPayment";
import PaymentInfoHistory from "./PaymentInfoHistory";
import prisma from "@/lib/prisma";
import PaymentInfoSummary from "./PaymentInfoSummary";
import PaymentInfoGraph from "./PaymentInfoGraph";
import AddPaymentWithFile from "./AddPaymentWithFile";
import PaymentInfoInsights from "./PaymentInfoInsights";

export default async function Payment() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-3xl pb-6 select-none">Payment</div>
            <div className="flex flex-row gap-8 justify-between h-full">
                <div className="flex flex-row gap-8">
                    <div className="flex flex-col gap-8 min-w-80">
                        <AddPayment />
                        <AddPaymentWithFile />
                    </div>
                    <div className="flex flex-col gap-8">
                        <PaymentInfoSummary />
                        <PaymentInfoGraph />
                    </div>
                    <div className="flex flex-col gap-8">
                        <PaymentInfoInsights />
                    </div>
                </div>
                <PaymentInfoHistory />
            </div>
        </>
    );
}
