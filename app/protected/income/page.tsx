import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import AddIncome from "./AddIncome";
import IncomeInfoHistory from "./IncomeInfoHistory";
import IncomeInfoSummary from "./IncomeInfoSummary";
import IncomeInfoGraph from "./IncomeInfoChartDoughnutServer";
import AddIncomeWithFile from "./AddIncomeWithFile";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.income;

export default async function Income() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-3xl mb-6 select-none">{gc?.title}</div>
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
