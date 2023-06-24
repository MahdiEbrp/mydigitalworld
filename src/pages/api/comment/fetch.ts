import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../../lib/prismaClient';
import { getSession } from '../auth/[...nextauth]';

const prisma = prismaClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession(req, res);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    const userId = session?.user.id || '';


    const { topicId } = <{ topicId: string; }>req.body;
    if (!topicId) {
        return res.status(400).end();
    }
    try {
        const comments = await prisma.comment.findMany({
            where: { topicId },
            include: { user: true }
        });
        const formattedComments = await Promise.all(comments.map(async (comment) => {
            const feedbacks = comment.feedbackId && await prisma.feedback.findMany({
                where: { id: comment.feedbackId, },
            }) || [];
            const likes = feedbacks.filter(fb => fb.isLike === true).length;
            const dislikes = feedbacks.filter(fb => fb.isLike === false).length;

            const likedBySessionUser = feedbacks.some(fb => fb.userId === userId && fb.isLike === true);
            const dislikedBySessionUser = feedbacks.some(fb => fb.userId === userId && fb.isLike === false);
            const commentedBySessionUser = comment.userId === userId;
            return {
                opinion: comment.comment,
                createdAt: comment.createdAt.toISOString(),
                id: comment.id,
                parentId: comment.parentId,
                topicId: comment.topicId,
                likes: likes,
                dislikes: dislikes,
                comments: 0,
                likedBySessionUser: likedBySessionUser,
                commentedBySessionUser: commentedBySessionUser,
                dislikedBySessionUser: dislikedBySessionUser,
                userName: comment.user?.name,
                image: comment.user?.image,
            };
        }));
        return res.status(200).json(formattedComments);

    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
