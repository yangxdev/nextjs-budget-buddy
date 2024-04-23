"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import GlobalConfig from "@/app/app.config";
import Greetings from "./Greetings";
import BudgetBuddyLogoDark from "@/public/nextjs-budget-buddy-logo-white.jsx";
import BudgetBuddyLogo from "@/public/nextjs-budget-buddy-logo-black.jsx";
// https://www.logoai.com/logo/3487038

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.navMenu;

function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex flex-col gap ml-2">
                <div className="text-2xl text-black flex flex-row items-center mt-4 -ml-[0.25rem]">
                    <BudgetBuddyLogo className="w-12 h-12 mr-[0.125rem]" />
                    {/* Budget Buddy <br /> */}
                    <div className="flex flex-col leading-none h-12 justify-between tracking-wider">
                        <div className="text-[1.39rem]">BUDGET</div>
                        <div className="text-[1.72rem] -mb-[0.15rem]">BUDDY</div>
                    </div>
                </div>
                {/* <div className="text-lg greeting mt-2 opacity-80">
                    <Greetings />
                </div> */}
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
            <div className="my-6 w-full text-lg">
                <NavLink to="/p/settings" icon={IoSettingsOutline}>
                    {gc?.settings}
                </NavLink>
                <button className="transition rounded-lg duration-100 mx-6 w-fit text-black text-2xl hover:bg-newBlue-200 dark:bg-lightGrayCustom2 dark:opacity-60 dark:hover:opacity-100 text-left" onClick={() => signOut()}>
                    <div className="flex flex-row items-center gap-2 px-[1rem] py-2">
                        <RiLogoutBoxLine />
                        <div>{gc?.signOut}</div>
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
import { GoHomeFill } from "react-icons/go";

export default function NavMenu() {
    return (
        <div className="bg-white dark:bg-darkGrayCustom flex flex-col justify-between h-screen min-w-sidebar w-sidebar select-none border-r-[1px] border-lightBorder">
            <div>
                <div className="mt-6 mb-12 px-padding">
                    <AuthButton />
                </div>
                <ul>
                    <NavLink to="/" icon={GoHomeFill}>
                        {gc?.dashboard}
                    </NavLink>
                    <NavLink to="/p/expenses" icon={MdOutlinePayments}>
                        {gc?.expenses}
                    </NavLink>
                    <NavLink to="/p/income" icon={GiReceiveMoney}>
                        {gc?.income}
                    </NavLink>
                    <NavLink to="/p/debt" icon={MdMoneyOff}>
                        {gc?.debt}
                    </NavLink>
                    <NavLink to="/p/savings" icon={MdOutlineSavings}>
                        {gc?.savings}
                    </NavLink>
                    {/* <NavLink to="/p/crypto" icon={MdOutlineSavings}>
            {gc?.crypto}
          </NavLink> */}
                </ul>
            </div>
            <div>
                <BottomButtons />
            </div>
        </div>
    );
}
