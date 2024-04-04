import NextAuth from "next-auth/next";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@/app/utils/authOptions";

// export const authOptions = {
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID ?? "",
//             clientSecret: process.env.GITHUB_SECRET ?? "",
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID ?? "",
//             clientSecret: process.env.GOOGLE_SECRET ?? "",
//         })
//     ],
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };