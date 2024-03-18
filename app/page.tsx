import Image from "next/image";
import { getServerSession } from "next-auth";
import Balance from "./components/dashboard/Balance";

export default async function Home() {
    const session = await getServerSession();

    return (
        <>
            <div className="font-bold text-2xl pb-6 select-none">Dashboard</div>
            <Balance />
        </>
    );
}
