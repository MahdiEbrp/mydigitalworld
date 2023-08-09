import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';
import { posts } from '../../../../data/posts.json';

const prisma = prismaClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession(req, res);

        if (req.method !== 'GET') {
            return res.status(405).end();
        }

        if (!session?.user?.email || session.user.email !== process.env.SUPERUSER_EMAIL) {
            return res.status(401).end();
        }

        const userId = session.user.id;

        for (const post of posts) {
            const { title, fileName,keywords,description,isVisible,thumbnail } = post;
            const createdTopic = await prisma.topic.create({
                data: {
                    description: title.toUpperCase().substring(0, 255),
                    userId,
                },
            });

            await prisma.posts.create({
                data: {
                    topicId: createdTopic.id, title, fileName,keywords,description,isVisible,thumbnail,
                },
            });
        }

        const postList = await prisma.posts.findMany();
        return res.status(200).json(postList);

    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
