import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Income() {
    const session = await getServerSession();
    if (!session || !session.user ) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            Income page
        </>
    )
}