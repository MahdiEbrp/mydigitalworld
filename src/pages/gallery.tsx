import FetchError from '@/components/display/FetchError';
import Loader from '@/components/display/Loader';
import NothingToSee from '@/components/display/NothingToSee';
import Sender from '@/components/display/Sender';
import ImageGallery from '@/components/ImageGallery';
import { SignInModalContext } from '@/context/SignInContext';
import { useToast } from '@/context/ToastContext';
import useCachedAxios from '@/lib/cachedAxios';
import { Gallery } from '@/type/gallery';
import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useState } from 'react';

const Gallery: NextPage = () => {
    const { data: galleryData, error: galleryError, isLoading: isGalleryLoading } = useCachedAxios<Gallery[]>('GALLERY_DATA', '/api/gallery');
    const { setModalVisibility } = useContext(SignInModalContext);
    const [isPosting, setIsPosting] = useState(false);
    const { data: session } = useSession();
    const toast = useToast();

    const handleLikeButton = async (id: string) => {
        if (!session)
            setModalVisibility(true);
        try {
            setIsPosting(true);
            await axios.post('/api/like/update', { id, action: 'like' });
        } catch (error) {
            if (error instanceof AxiosError)
                toast.showToast(error.message, 'error', 1000);
        }
        finally {
            setIsPosting(false);
        }
    };

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <div className='flex justify-center items-center min-h-screen m-2'>
                {isGalleryLoading || isPosting ?
                    isPosting ? <Sender /> : <Loader />
                    :
                    <>
                        {galleryData ? <ImageGallery images={galleryData} onLikeClick={handleLikeButton} /> : galleryError ? <FetchError /> : <NothingToSee />}
                    </>
                }
            </div>
        </>
    );
};
export default Gallery;
