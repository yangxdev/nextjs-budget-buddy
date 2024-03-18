"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex flex-col gap">
                <div className="text-xl">
                    Budget Buddy <br />
                </div>
                <div className="">
                    Hi, <strong>{session?.user?.name}</strong>! <br />
                </div>
            </div>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

function BottomButtons() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="my-6">
                <NavLink to="/p/settings" icon={IoSettingsOutline }>
                        Settings
                </NavLink>
                <button
                    className="transition duration-100 py-1 w-full hover:text-gray-300 hover:bg-[#424242] rounded-full text-left px-6"
                    onClick={() => signOut()}
                >
                    <div className="flex flex-row items-center gap-2">
                        <RiLogoutBoxLine />
                        <div>Sign out</div>
                    </div>
                </button>
            </div>
        );
    }
}

import { GoHome } from "react-icons/go";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { MdMoneyOff } from "react-icons/md";
import { MdOutlineSavings } from "react-icons/md";

export default function NavMenu() {
    const pathname = usePathname();
    return (
        <div className="bg-[#313131] flex flex-col justify-between rounded-r-xl h-screen max-w-72 select-none">
            <div className="">
                <div className="my-6 px-6">
                    <AuthButton />
                </div>
                <ul>
                    <NavLink to="/" icon={MdOutlineSpaceDashboard}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/p/payment" icon={MdOutlinePayments}>
                        Payment
                    </NavLink>
                    <NavLink to="/p/income" icon={GiReceiveMoney}>
                        Income
                    </NavLink>
                    <NavLink to="/p/debt" icon={MdMoneyOff}>
                        Debt
                    </NavLink>
                    <NavLink to="/p/savings" icon={MdOutlineSavings}>
                        Savings
                    </NavLink>
                </ul>
            </div>
            <div>
                <BottomButtons />
            </div>
        </div>
    );
}
