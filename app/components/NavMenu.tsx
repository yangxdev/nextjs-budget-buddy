"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import GlobalConfig from "@/app/app.config";
import Greetings from "./Greetings";
import BudgetBuddyLogo from "@/public/nextjs-budget-buddy-logo-white.jsx";
// https://www.logoai.com/logo/3487038

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.navMenu;

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col gap">
        <div className="text-2xl flex flex-row items-center mt-4 -ml-[0.25rem]">
          <BudgetBuddyLogo className="w-12 h-12 mr-[0.125rem]" />
          {/* Budget Buddy <br /> */}
          <div className="flex flex-col leading-none h-12 justify-between tracking-wider">
            <div className="text-[1.43rem] -mb-[0rem]">BUDGET </div>
            <div className="text-[1.67rem]">BUDDY</div>
          </div>
        </div>
        <div className="text-lg greeting mt-2 opacity-80">
          <Greetings />
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
      <div className="my-6 w-full text-lg">
        <NavLink to="/p/settings" icon={IoSettingsOutline}>
          {gc?.settings}
        </NavLink>
        <button className="transition rounded-lg duration-100 mx-6 w-fit dark:bg-lightGrayCustom2 dark:opacity-60 dark:hover:opacity-100 text-left" onClick={() => signOut()}>
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

export default function NavMenu() {
  return (
    <div className="dark:bg-darkGrayCustom flex flex-col justify-between h-screen min-w-sidebar select-none">
      <div>
        <div className="my-6 px-padding">
          <AuthButton />
        </div>
        <ul>
          <NavLink to="/" icon={MdOutlineSpaceDashboard}>
            {gc?.dashboard}
          </NavLink>
          <NavLink to="/p/payment" icon={MdOutlinePayments}>
            {gc?.payment}
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
