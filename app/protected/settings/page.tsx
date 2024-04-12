import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import GlobalConfig from "@/app/app.config";

export default async function Settings() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-2xl mb-6 select-none">Settings</div>
            <div className="p-5 bg-[#313131] max-w-80 rounded-2xl text-normal select-none h-min">
                <div className="font-bold pb-2">Currency</div>
                <div className="pb-2 flex flex-row justify-between">
                    <div className="">Base currency: </div>
                    <select className="bg-[#434343] rounded-md p-1 cursor-pointer hover:bg-[#565656] transition duration-100 dark:[color-scheme:dark] focus:outline-none">
                        {GlobalConfig.currency.currencies.map((currency, index) => (
                            <option key={index} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="pb-2 flex flex-row justify-between">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, culpa libero rem quae numquam dolor laboriosam doloribus enim error dolores qui molestias ullam nostrum saepe, praesentium blanditiis aliquid corporis! Cumque?
                </div>
            </div>
        </>
    )
}