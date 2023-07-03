import prismaClient from '@/lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../auth/[...nextauth]';

const prisma = prismaClient;

type GalleryRequestBody = {
    id: string;
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

    if (!session?.user?.email || session.user.email !== process.env.SUPERUSER_EMAIL) {
        return res.status(401).end();
    }

    const { id, title, location, src, altTag, description } = req.body as GalleryRequestBody;

    const valuesArray = [id, title, location, src, altTag, description];

    if (valuesArray.some(value => !value || value.trim().length === 0)) {
        return res.status(400).end();
    }

    try {
        const createdGallery = await prisma.gallery.update({
            where: { id },
            data: {
                title, location, description, src, altTag
            },
        });

        return res.status(200).json(createdGallery);
    } catch (error) {
        return res.status(500).json({ error: 'Unknown error' });
    }
}
