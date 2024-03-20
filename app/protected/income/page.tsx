import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import { useState } from "react";
import AddIncome from "./AddIncome";
import IncomeHistory from "./IncomeHistory";
import prisma from "@/lib/prisma";
import IncomeInfoSum from "./IncomeInfoSum";

export default async function Income() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-2xl pb-6 select-none">Income</div>
            <div className="flex flex-row gap-8 justify-between h-full">
                <div className="flex flex-row gap-8">
                    <AddIncome />
                    <IncomeInfoSum />
                </div>
                <IncomeHistory />
            </div>
        </>
    );
}
