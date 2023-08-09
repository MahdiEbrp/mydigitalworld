import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';
import { gallery } from '../../../../data/gallery.json';

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

        for (const post of gallery) {
            const { title, location, src, altTag, description } = post;
            const createdTopic = await prisma.topic.create({
                data: {
                    description: title.toUpperCase().substring(0, 255),
                    userId,
                },
            });

            await prisma.gallery.create({
                data: {
                    topicId: createdTopic.id, title, location, description, src, altTag,
                },
            });
        }

        const galleries = await prisma.gallery.findMany();
        return res.status(200).json(galleries);

    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
