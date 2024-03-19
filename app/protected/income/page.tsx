import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import { useState } from "react";
import AddIncome from "./AddIncome";
import IncomeList from "./IncomeList";
import prisma from "@/lib/prisma";

export default async function Income() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    console.log(session);

    return (
        <>
            <div className="font-bold text-2xl pb-6 select-none">Income</div>
            <AddIncome />
            <IncomeList />
        </>
    );
}
