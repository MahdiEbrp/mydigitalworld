import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';

const prisma = prismaClient;

export const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req, res);

    if (req.method !== 'GET')
        return res.status(405).json({ message: 'ERR_INVALID_METHOD' });

    if (!session?.user?.email || session.user.email !== process.env.SUPERUSER_EMAIL) {
        return res.status(401).end();
    }

    try {
        const posts = await prisma.posts.findMany();
        return res.status(200).json(posts);

    }
    catch (error) {
        return res.status(500).json({ error: 'ERR_UNKNOWN' });
    }
};

export default Handler;
