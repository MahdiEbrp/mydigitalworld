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

    const { id, action } = req.body as { id: string; action: string; };

    if (typeof id === 'undefined' || typeof action === 'undefined') {
        return res.status(400).end();
    }

    const userId = session.user.id;

    try {
        const comment = await prisma.comment.findFirst({
            where: { userId, id },
            include: { user: true, feedback: true }
        });

        if (!comment) return res.status(404).end();

        if (action === 'delete') {
            const deleteItem = await prisma.comment.delete({
                where: { id: comment.id },
                include: { feedback: true }
            });

            if (deleteItem.feedback?.topicId) {
                await prisma.topic.delete({ where: { id: deleteItem.feedback.topicId } });
            }
            return res.status(200).end();
        }

        const isLike = action === 'like';
        let likes = 0;
        let dislikes = 0;
        let likedBySessionUser = false;
        let dislikedBySessionUser = false;
        const commentedBySessionUser = true;

        if (!comment.feedback) {
            const topic = await prisma.topic.create({ data: { userId,description:'COMMENT_TOPIC' } });
            const feedback = await prisma.feedback.create({
                data: {
                    topicId: topic.id,
                    userId,
                    isLike
                }
            });

            await prisma.comment.update({
                where: { id: comment.id },
                data: { feedbackId: feedback.id }
            });
            likes = isLike ? 1 : 0;
            dislikes = isLike ? 0 : 1;
            likedBySessionUser = isLike;
            dislikedBySessionUser = !isLike;

            return res.status(200).json({
                opinion: comment.comment,
                createdAt: comment.createdAt.toISOString(),
                id: comment.id,
                parentId: comment.parentId,
                topicId: comment.topicId,
                likes,
                dislikes,
                likedBySessionUser,
                commentedBySessionUser,
                dislikedBySessionUser,
                userName: comment.user?.name,
                image: comment.user?.image
            });
        } else {
            const updatedValue = comment.feedback.isLike === isLike ? null : isLike;

            await prisma.feedback.update({
                where: { id: comment.feedback.id },
                data: { isLike: updatedValue }
            });
            const feedbacks = await prisma.feedback.findMany({
                where: { topicId: comment.feedback.topicId },
            });
            likes = feedbacks.filter(fb => fb.isLike === true).length;
            dislikes = feedbacks.filter(fb => fb.isLike === false).length;

            likedBySessionUser = updatedValue === null ? false : updatedValue;
            dislikedBySessionUser = updatedValue === null ? false : !updatedValue;

            return res.status(200).json({
                opinion: comment.comment,
                createdAt: comment.createdAt.toISOString(),
                id: comment.id,
                parentId: comment.parentId,
                topicId: comment.topicId,
                likes,
                dislikes,
                likedBySessionUser,
                commentedBySessionUser,
                dislikedBySessionUser,
                userName: comment.user?.name,
                image: comment.user?.image
            });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
