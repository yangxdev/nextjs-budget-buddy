import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import { useState } from "react";
import AddIncome from "./AddIncome";
import IncomeInfoHistory from "./IncomeInfoHistory";
import prisma from "@/lib/prisma";
import IncomeInfoSummary from "./IncomeInfoSummary";
import IncomeInfoGraph from "./IncomeInfoGraph";
import AddIncomeWithFile from "./AddIncomeWithFile";

export default async function Income() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-3xl mb-6 select-none">Income</div>
            <div className="flex flex-row gap-8 justify-between h-full">
                <div className="flex flex-row gap-8">
                    <div className="flex flex-col gap-8 min-w-80">
                        <AddIncome />
                        <AddIncomeWithFile />
                    </div>
                    <div className="flex flex-col gap-8 min-w-80">
                        <IncomeInfoSummary />
                        <IncomeInfoGraph />
                    </div>
                </div>
                <IncomeInfoHistory />
            </div>
        </>
    );
}
