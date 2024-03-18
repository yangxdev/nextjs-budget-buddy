import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";

import SessionProvider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";
import { getServers } from "dns";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Budget Buddy",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <main className="flex flex-row">
                        <NavMenu />
                        <div className="bg-[#161616] flex-grow py-6 px-padding">
                            {children}
                            <Toaster 
                                position="top-right"
                                reverseOrder={false}
                            />
                        </div>
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
