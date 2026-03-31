import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import AddExpense from "./AddExpense";
import ExpenseInfoHistory from "./ExpenseInfoHistory";
import ExpenseInfoSummary from "./ExpenseInfoSummary";
import ExpenseInfoChartDoughnutServer from "./ExpenseInfoChartDoughnutServer";
import AddExpenseWithFile from "./AddExpenseWithFile";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses;

export default async function Expense() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div id="ExpensePage">
            <div id="ExpensePageContent">
                <div className="font-bold text-3xl pb-6 select-none">{gc?.title}</div>
                <div className="flex flex-row gap-8 justify-between h-full">
                    <div className="flex flex-row gap-8">
                        <div className="flex flex-col gap-8 min-w-80">
                            <AddExpense />
                            <AddExpenseWithFile />
                        </div>
                        <div className="flex flex-col gap-8">
                            <Suspense fallback={<div className="animate-pulse bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl h-40" />}>
                                <ExpenseInfoSummary />
                            </Suspense>
                            <Suspense fallback={<div className="animate-pulse bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl h-80" />}>
                                <ExpenseInfoChartDoughnutServer />
                            </Suspense>
                        </div>
                        <div className="flex flex-col gap-8">
                        </div>
                    </div>
                    <Suspense fallback={<div className="animate-pulse bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl w-80 h-full" />}>
                        <ExpenseInfoHistory />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
