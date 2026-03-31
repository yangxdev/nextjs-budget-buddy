import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Balance from "./components/dashboard/Balance";
import GlobalConfig from "@/app/app.config";
import TotalIncome from "./components/dashboard/TotalIncome";
import Greetings from "./components/Greetings";
import TotalExpenses from "./components/dashboard/TotalExpenses";
import MoneyFlow from "./components/dashboard/MoneyFlow";
import Transactions from "./components/dashboard/Transactions";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.dashboard;

export default async function Home() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-4xl mb-2 select-none">{gc?.title}</div>
            <div className="text-lg greeting my-2 opacity-80" suppressHydrationWarning>
                    <Greetings />
                </div>
            <div className="flex flex-row gap-8 justify-between h-auto mt-6">
                <div className="flex flex-col gap-8 justify-between mb-[190px] h-full">
                    <div className="flex flex-row gap-8 h-auto">
                        <Suspense fallback={<DashboardCardSkeleton />}>
                            <Balance />
                        </Suspense>
                        <Suspense fallback={<DashboardCardSkeleton />}>
                            <TotalIncome />
                        </Suspense>
                        <Suspense fallback={<DashboardCardSkeleton />}>
                            <TotalExpenses />
                        </Suspense>
                    </div>
                    <div className="flex flex-row gap-8 h-auto">
                        <Suspense fallback={<DashboardCardSkeleton wide />}>
                            <MoneyFlow />
                        </Suspense>
                        <Suspense fallback={<DashboardCardSkeleton />}>
                            <Transactions />
                        </Suspense>
                    </div>
                </div>
                <div className="flex flex-row gap-8 h-full">
                </div>
            </div>
        </>
    );
}

function DashboardCardSkeleton({ wide }: { wide?: boolean }) {
    return (
        <div className={`p-6 bg-white dark:bg-lightGrayCustom3 border-[1px] border-lightBorder rounded-2xl animate-pulse ${wide ? "w-[43rem] h-[25rem]" : "w-[22rem] h-[18rem]"}`} />
    );
}
