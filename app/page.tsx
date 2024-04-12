import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Balance from "./components/dashboard/Balance";

export default async function Home() {
    const session = await getServerSession();
    if (!session || !session.user ) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <div className="font-bold text-2xl mb-6 select-none">Dashboard</div>
            <Balance />
        </>
    );
}
