import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';

const prisma = prismaClient;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    if (!session?.user?.email || session.user.email !== process.env.SUPERUSER_EMAIL) {
        return res.status(401).end();
    }

    const { id } = <{ id: string; }> req.body ;
    if (!id || id.length===0) {
        return res.status(400).end();
    }

    try {

        const post= await prisma.gallery.delete({
            where: {
                id,
            },
        });
        await prisma.topic.delete({
            where: {
                id: post.topicId,
            },
        });
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
