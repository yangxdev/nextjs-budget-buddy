import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Balance from "./components/dashboard/Balance";
import InfoChartVerticalBarServer from "./InfoChartVerticalBarServer";
import ExpenseInfoHistory from "./protected/expenses/ExpenseInfoHistory";
import GlobalConfig from "@/app/app.config";
import IncomeInfoHistory from "./protected/income/IncomeInfoHistory";
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
                        <Balance />
                        <TotalIncome />
                        <TotalExpenses />
                        {/* <InfoChartVerticalBarServer /> */}
                    </div>
                    <div className="flex flex-row gap-8 h-auto">
                        <MoneyFlow />
                        <Transactions />
                    </div>
                </div>
                <div className="flex flex-row gap-8 h-full">
                </div>
            </div>
        </>
    );
}
