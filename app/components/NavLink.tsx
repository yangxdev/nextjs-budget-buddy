import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ACTIVE_ROUTE =
    // "py-1 px-padding text-gray-300 bg-[#161616] font-medium";
    "pl-[1rem] text-white bg-newBlue-500 dark:text-textColor dark:bg-lightGrayCustom ";
const INACTIVE_ROUTE =
    // "transition duration-100 py-1 px-padding text-gray-500 hover:text-gray-300 hover:bg-[#424242] ";
    "pl-[1rem] text-black hover:bg-newBlue-200 hover:text-black dark:text-textColor dark:hover:bg-lightGrayCustom";

const NavLink = ({ to, icon, children }: { to: string; icon: React.ComponentType; children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <Link draggable="false" href={to}>
            <li className={`flex flex-row items-center duration-100 transition gap-2 py-3 mx-6 my-4 text-2xl font-thin rounded-lg ${pathname === to ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}>
                {React.createElement(icon)}
                <span>{children}</span>
            </li>
        </Link>
    );
};

export default NavLink;
