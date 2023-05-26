import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (req.method !== 'GET')
        return res.status(405).json({ message: 'ERR_INVALID_METHOD' });

    try {
        const galleries = await prismaClient.gallery.findMany();
        const galleryIds = galleries.map(gallery => gallery.topicId);

        const feedback = await prismaClient.feedback.groupBy({
            by: ['topicId', 'isLike', 'userId'],
            where: {
                topicId: { in: galleryIds }
            },
            _count: true
        });
        const galleryWithFeedback = galleries.map(gallery => {
            const likes = feedback.filter(fb => fb.topicId === gallery.topicId && fb.isLike).reduce((acc, curr) => acc + curr._count, 0);
            const dislikes = feedback.filter(fb => fb.topicId === gallery.topicId && fb.isLike === false).reduce((acc, curr) => acc + curr._count, 0);

            let likedBySessionUser = false;
            let dislikedBySessionUser = false;
            if (session?.user.id) {
                const feedbackBySessionUser = feedback.filter(fb => fb.topicId === gallery.topicId && fb.userId === session.user.id);
                likedBySessionUser = feedbackBySessionUser.some(fb => fb.isLike);
                dislikedBySessionUser = feedbackBySessionUser.some(fb => fb.isLike === false);
            }

            return { ...gallery, likes, dislikes, likedBySessionUser, dislikedBySessionUser };
        });

        return res.status(200).json(galleryWithFeedback);

    }
    catch (error) {
        return res.status(500).json({ error: 'ERR_UNKNOWN' });
    }
};

export default Handler;
