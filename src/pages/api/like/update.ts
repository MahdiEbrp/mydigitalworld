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

    const { isLike, topicId } = <{ isLike: boolean; topicId: string; }>req.body;

    if (typeof isLike === 'undefined' || typeof topicId === 'undefined') {
        return res.status(400).end();
    }

    const userId = session.user.id;

    try {
        const feedbacks = await prisma.feedback.findMany({
            where: { topicId },
        });

        let feedback = feedbacks.find(ab => ab.topicId === topicId && ab.userId === userId);

        const updatedValue = feedback ? feedback.isLike === isLike ? null : isLike : isLike;

        if (!feedback) {
            feedback = await prisma.feedback.create({
                data: {
                    isLike,
                    userId,
                    topicId,
                }
            });
        } else {
            feedback = await prisma.feedback.update({
                where: { id: feedback.id },
                data: { isLike: updatedValue },
            });
        }
        feedbacks.forEach(fb => {
            if (fb.id === feedback?.id) {
                fb.isLike = feedback.isLike;
            }
        });
        const updatedFeedbacks = [...feedbacks.filter(fb => fb.id !== feedback?.id || ''), feedback];

        const { likes, dislikes } = updatedFeedbacks.reduce((counts, fb) => {
            if (fb.isLike === true) counts.likes++;
            else if (fb.isLike === false) counts.dislikes++;
            return counts;
        }, { likes: 0, dislikes: 0 });

        const likedBySessionUser = updatedFeedbacks.some(fb => fb.userId === userId && fb.isLike === true);
        const dislikedBySessionUser = updatedFeedbacks.some(fb => fb.userId === userId && fb.isLike === false);

        return res.status(200).json({ likes, dislikes, likedBySessionUser, dislikedBySessionUser });

    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
