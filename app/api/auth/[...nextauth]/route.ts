import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        })
    ],
};

export const handler = NextAuth({
    ...authOptions,
    callbacks: {
        async signIn(params) {
            const { user, account, profile } = params;
            return true;
        }
    }
});

export { handler as GET, handler as POST };