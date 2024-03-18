import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ACTIVE_ROUTE =
    "py-1 px-padding text-gray-300 bg-[#161616] font-medium";
const INACTIVE_ROUTE =
    "transition duration-100 py-1 px-padding text-gray-500 hover:text-gray-300 hover:bg-[#424242] ";

const NavLink = ({ to, icon, children }: {to: string, icon: React.ComponentType, children: React.ReactNode}) => {
    const pathname = usePathname();
    return (
        <Link draggable="false" href={to}>
            <li className={`flex flex-row items-center gap-2 ${pathname === to ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}>
                {React.createElement(icon)}
                <span>{children}</span>
            </li>
        </Link>
    );
};

export default NavLink;
