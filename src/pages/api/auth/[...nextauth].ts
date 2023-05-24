import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { Session } from 'next-auth';
import prismaClient from '@/lib/prismaClient';
import { JWT } from 'next-auth/jwt';
export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session(params: { session: Session; token: JWT; }) {
            const { session } = params;
            let user = await prismaClient.user.findFirst({
                where: {
                    email: session.user?.email
                }
            });
            if (!user) {

                user = await prismaClient.user.create({
                    data: {
                        email: session.user?.email,
                        image: session.user?.image,
                        name: session.user?.name,
                    }
                });
                if (!user)
                    Promise.reject(session);
            }
            return Promise.resolve({ ...session, user });
        },

    },
};
export default NextAuth(authOptions);