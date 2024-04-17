import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Balance from "./components/dashboard/Balance";
import InfoChartVerticalBarServer from "./InfoChartVerticalBarServer";
import PaymentInfoHistory from "./protected/payment/PaymentInfoHistory";
import GlobalConfig from "@/app/app.config";

const gc = GlobalConfig.i18n.translations[GlobalConfig.i18n.defaultLanguage || "en"]?.dashboard;

export default async function Home() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-3xl mb-2 select-none">{gc?.title}</div>
            <div className="select-none mb-6">{gc?.subtitle}</div>
            <div className="flex flex-row gap-8 justify-between h-fit">
                <div className="flex flex-col gap-8 justify-between mb-[190px]">
                    <div className="flex flex-row gap-8 h-fit">
                        <Balance />
                        <InfoChartVerticalBarServer />
                    </div>
                    <div className="flex flex-row gap-8 h-fit">
                        {/* <Balance /> */}
                    </div>
                </div>
                <div className="flex flex-row gap-8 h-fit">
                    <PaymentInfoHistory />
                </div>
            </div>
        </>
    );
}
