"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { GoHome } from "react-icons/go";

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
function SignOutButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <button
                    className="transition duration-100 my-6 py-1 w-full hover:text-gray-300 hover:bg-[#424242] rounded-full text-left px-6"
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </div>
        );
    }
}
export default function NavMenu() {
    const pathname = usePathname();
    return (
        <div className="bg-[#313131] flex flex-col justify-between rounded-r-xl h-screen max-w-72 select-none">
            <div className="">
                <div className="my-6 px-6">
                    <AuthButton />
                </div>
                <ul>
                    <NavLink to="/" icon={GoHome}>
                        Home
                    </NavLink>
                    <NavLink to="/protected" icon={GoHome}>
                        Protected
                    </NavLink>
                </ul>
            </div>
            <div>
                <SignOutButton />
            </div>
        </div>
    );
}
