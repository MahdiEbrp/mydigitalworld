import FetchError from '@/components/display/FetchError';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import ImageGallery from '@/components/ImageGallery';
import { SignInModalContext } from '@/context/SignInContext';
import useCachedAxios from '@/lib/cachedAxios';
import { Gallery } from '@/type/gallery';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext } from 'react';

const Gallery: NextPage = () => {
    const { data, error, isLoading } = useCachedAxios<Gallery[]>('GALLERY_DATA', '/api/gallery');
    const { setModalVisibility } = useContext(SignInModalContext);

    const { data: session } = useSession();

    const handleLikeButton = (id: string) => {
        if (!session)
            setModalVisibility(true);
    };

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>
                {isLoading ?
                    <Loader />
                    :
                    <>
                        {data ? <ImageGallery images={data} onLikeClick={handleLikeButton} /> : error ? <FetchError /> : <NothingToSee />}
                    </>
                }
            </div>
        </>
    );
};
export default Gallery;
