import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';

const prisma = prismaClient;

type GalleryRequestBody = {
    title: string;
    location: string;
    src: string;
    altTag: string;
    description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    if (!session?.user?.email) {
        return res.status(401).end();
    }

    const userEmail = session.user.email || '';

    if (userEmail !== process.env.SUPERUSER_EMAIL) {
        return res.status(403).end();
    }

    const { title, location, src, altTag, description } = req.body as GalleryRequestBody;

    const valuesArray = [title, location, src, altTag, description];

    if (valuesArray.some(value => !value || value.trim().length === 0)) {
        return res.status(400).end();
    }

    const userId = session.user.id;

    try {
        const createdTopic = await prisma.topic.create({
            data: {
                description: title.toUpperCase().substring(0, 255),
                userId: userId,
            },
        });

        const createdGallery = await prisma.gallery.create({
            data: {
                topicId: createdTopic.id,
                title: title,
                location: location,
                description: description,
                src: src,
                altTag: altTag,
            },
        });

        return res.status(200).json(createdGallery);
    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
