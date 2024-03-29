"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import GlobalConfig from "@/app/app.config";
import Greetings from "./Greetings";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.navMenu;

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col gap">
        <div className="text-2xl font-semibold">
          Budget Buddy <br />
        </div>
        <div className="text-xl greeting">
          {/* Hi, {session?.user?.name}!  */}
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
      <div className="my-6">
        <NavLink to="/p/settings" icon={IoSettingsOutline}>
          {gc?.settings}
        </NavLink>
        <button className="transition duration-100 py-1 w-full hover:text-gray-300 hover:bg-[#424242] text-left px-padding" onClick={() => signOut()}>
          <div className="flex flex-row items-center gap-2">
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
    <div className="bg-[#313131] flex flex-col justify-between h-screen min-w-sidebar select-none">
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
          <NavLink to="/p/crypto" icon={MdOutlineSavings}>
            {gc?.crypto}
          </NavLink>
        </ul>
      </div>
      <div>
        <BottomButtons />
      </div>
    </div>
  );
}
