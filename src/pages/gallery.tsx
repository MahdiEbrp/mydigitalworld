import ImageGallery, { ImageDataProps } from '@/components/ImageGallery';
import { NextPage } from 'next';
import Head from 'next/head';

const sampleImages: ImageDataProps[] = [
    {
        title: 'Beautiful Scenery',
        id: 'hg',
        location: 'Mountain View, CA',
        src: '/images/books.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat vel est quis interdum.',
        likes: 23,
        dislikes: 5,
        comments: 10
    },
    {
        title: 'Cute Animals',
        id: 'ad',
        location: 'San Francisco, CA',
        src: '/images/books.jpg',
        description: 'Nulla rhoncus ante eu nunc tincidunt suscipit. Morbi ullamcorper euismod purus et dignissim.',
        likes: 34,
        dislikes: 7,
        comments: 18
    },
    {
        title: 'City Life',
        id: 'd0',
        location: 'New York City, NY',
        src: '/images/books.jpg',
        description: 'Praesent ut convallis urna. Sed eget ligula rutrum, porttitor turpis non, sagittis velit.',
        likes: 45,
        dislikes: 12,
        comments: 24
    }
];

const gallery: NextPage = () => {

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>
                <ImageGallery images={sampleImages} />
            </div>
        </>
    );
};
export default gallery;
