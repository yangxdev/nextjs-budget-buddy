import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

export default async function Debt() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return <>
        <div className="">
            <div className="flex flex-row items-center gap-2 px-[1rem] py-2">
                <div className="add-crypto">
                    
                </div>
            </div>
        </div>
    </>;
}
