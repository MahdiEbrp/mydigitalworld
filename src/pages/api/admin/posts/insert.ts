import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';

const prisma = prismaClient;

type PostRequestBody = {
    description: string;
    fileName: string;
    isVisible:boolean;
    keywords: string;
    thumbnail: string;
    title: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    if (!session?.user?.email || session.user.email !== process.env.SUPERUSER_EMAIL) {
        return res.status(401).end();
    }

    const { fileName, thumbnail, title, keywords , description,isVisible } = req.body as PostRequestBody;

    const valuesArray = [fileName, thumbnail, title, keywords, description, isVisible];

    if (valuesArray.some(value => typeof value === undefined || value.toString().trim().length === 0)) {
        return res.status(400).end();
    }

    const userId = session.user.id;

    try {
        const createdTopic = await prisma.topic.create({
            data: {
                description: title.toUpperCase().substring(0, 255),
                userId,
            },
        });

        const createdPost = await prisma.posts.create({
            data: {
                fileName,
                title,
                keywords,
                description,
                isVisible,
                thumbnail,
                topicId: createdTopic.id,
            },
        });

        return res.status(200).json(createdPost);
    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
