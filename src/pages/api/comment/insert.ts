import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../lib/prismaClient';
import { getSession } from '../auth/[...nextauth]';

const prisma = prismaClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    if (!session?.user?.id) {
        return res.status(401).end();
    }

    const { opinion, topicId, parentId } = <{ opinion: string; topicId: string; parentId?: string; }>req.body;

    if (typeof opinion === 'undefined' || typeof topicId === 'undefined') {
        return res.status(400).end();
    }

    if (opinion.trim() === '')
        return res.status(400).end();


    const userId = session.user.id;

    try {

        const comment = await prisma.comment.create({
            data: {
                topicId: topicId,
                comment: opinion,
                userId: userId,
                parentId: parentId,
            },
            include: {
                user: true
            }
        });

        const formattedComment = {
            opinion: comment.comment,
            createdAt: comment.createdAt.toISOString(),
            id: comment.id,
            parentId: comment.parentId,
            topicId: comment.topicId,
            likes: 0,
            dislikes: 0,
            likedBySessionUser: false,
            commentedBySessionUser: true,
            dislikedBySessionUser: false,
            userName: comment.user?.name,
            image: comment.user?.image,
        };


        return res.status(200).json(formattedComment);

    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
