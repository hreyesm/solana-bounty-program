import NextAuth, { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    callbacks: {
        jwt: ({ account, profile, token }) => {
            if (profile) {
                token.login = profile.login;
            }

            if (account) {
                token.accessToken = account.access_token;
            }

            return token;
        },
        session: ({ session, token }) => {
            session.accessToken = token.accessToken;
            session.login = token.login;

            return session;
        },
    },
    providers: [
        GithubProvider({
            authorization: {
                params: { scope: 'repo' },
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.SECRET,
};

export default NextAuth(authOptions);
