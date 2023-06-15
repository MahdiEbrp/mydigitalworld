import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from './auth/[...nextauth]';

const prisma = prismaClient;

export const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session =await getSession(req, res);

    if (req.method !== 'GET')
        return res.status(405).json({ message: 'ERR_INVALID_METHOD' });

    try {
        const galleries = await prisma.gallery.findMany();
        const galleryIds = galleries.map(gallery => gallery.topicId);

        const feedback = await prisma.feedback.groupBy({
            by: ['topicId', 'isLike', 'userId'],
            where: {
                topicId: { in: galleryIds }
            },
            _count: true
        });
        const galleryComments = await prisma.comment.findMany({
            where: {
                topicId: {in:galleryIds}
            }
        });

        const galleryWithFeedback = galleries.map( gallery => {
            const likes = feedback.filter(fb => fb.topicId === gallery.topicId && fb.isLike).reduce((acc, curr) => acc + curr._count, 0);
            const dislikes = feedback.filter(fb => fb.topicId === gallery.topicId && fb.isLike === false).reduce((acc, curr) => acc + curr._count, 0);
            const comments = galleryComments.filter(c => c.topicId === gallery.topicId);

            let likedBySessionUser = false;
            let dislikedBySessionUser = false;
            let commentedBySessionUser = false;

            if (session?.user.id) {
                const feedbackBySessionUser = feedback.filter(fb => fb.topicId === gallery.topicId && fb.userId === session.user.id);
                likedBySessionUser = feedbackBySessionUser.some(fb => fb.isLike);
                dislikedBySessionUser = feedbackBySessionUser.some(fb => fb.isLike === false);
                commentedBySessionUser = comments.some(comment => comment.userId === session.user.id);
            }

            return { ...gallery, likes, dislikes, likedBySessionUser, dislikedBySessionUser, comments: comments.length, commentedBySessionUser };
        });

        return res.status(200).json(galleryWithFeedback);

    }
    catch (error) {
        return res.status(500).json({ error: 'ERR_UNKNOWN' });
    }
};

export default Handler;
