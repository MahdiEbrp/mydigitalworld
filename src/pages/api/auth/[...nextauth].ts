import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { getServerSession, Session } from 'next-auth';
import prismaClient from '@/lib/prismaClient';
import { JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
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
            if (!session.user.email)
                return Promise.reject(session);
            const user = await prismaClient.user.upsert({
                where: { email: session.user?.email },
                update: {},
                create: {
                    email: session.user?.email,
                    image: session.user?.image,
                    name: session.user?.name,
                },
            });
            return Promise.resolve({ ...session, user });
        },
    },
};
export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
    return await getServerSession(req, res, authOptions);
};
export default NextAuth(authOptions);