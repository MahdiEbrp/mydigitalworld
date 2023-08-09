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
        const comments = await prisma.comment.findMany({
            include: {
                user: { select: { name: true, image: true } },
                topic: true,
            },
        });
        const topicsMap = new Map();

        const formattedComments = comments.map((comment) => {
            if (!topicsMap.has(comment.topicId)) {
                topicsMap.set(comment.topicId, comment.topic);
            }
            return {
                opinion: comment.comment,
                createdAt: comment.createdAt.toISOString(),
                id: comment.id,
                parentId: comment.parentId,
                topicId: comment.topicId,
                likes: 0,
                dislikes: 0,
                comments: 0,
                likedBySessionUser: false,
                commentedBySessionUser: false,
                dislikedBySessionUser: false,
                userName: comment.user?.name,
                image: comment.user?.image,
            };
        });
        const topics = Array.from(topicsMap.values());
        return res.status(200).json({ topics, comments: formattedComments });

    }
    catch (error) {
        return res.status(500).json({ error });
    }
};

export default Handler;
